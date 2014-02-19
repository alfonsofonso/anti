/**
 User: alfonso
 Data: 27/01/14 , 15:07
 */
var audioContext = null;    // los altavoces

var melodiaGuit,melodiaBajo,melodiaBate;
var guitarra,bajo,bateria;
var gainNode;          // la etapa de potencia
var conguita;
var timerID;            // setInterval identifier.
var lookahead;         // How frequently to call scheduling function (in milliseconds)


AudioPunk= new function(){

    var startTime;              // The start time of the entire sequence.
    var semicorchea;        // What note is currently last scheduled?
    var tempo;           //    tempo

        // 25 milisegundos cada llamada se escriben 100 milisegundos
    var scheduleAheadTime;// 100 milisegundos;  // How far ahead to schedule sonidos (sec)
        // This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
    var nextNoteTime;     // when the next note is due.
    var noteResolution;     // 0 == 16th, 1 == 8th, 2 == quarter note

    var notesInQueue;      // the notes that have been put into the web sonidos, and may or may not have played yet. {note, time}
    var portamento;
    var basenote;
    var noteLength;        // length of "beep" (in seconds)
    var secondsPerBeat;
    var tiemposCompas;
    var duracionTiempo;
    var compas;

    this.isPlaying=true;

    this.init=function(){
        console.log("AudioPunk.init");
        // start Engine
        window.AudioContext=window.AudioContext||window.webkitAudioContext;
        audioContext =  new AudioContext();
        AudioPunk.initializeVars();

        // loadSounds
        LoaderAudio.cargaSonidos();
        semicorchea = 0;
        nextNoteTime = audioContext.currentTime;

    };


    this.escribeNota=function(time) { //escribe en el buffer
        //console.log("semicorchea: ",semicorchea);
        notesInQueue.push( { note: semicorchea, time: time } );//push, even if we're not playing for de Draw.js methods

        AudioPunk.tocaGuitarra(time);
        AudioPunk.tocaBajo(time);
        AudioPunk.tocaBateria(time);

    };
    this.nextNote=function() {

        // Advance current note and time by a 16th note...
        nextNoteTime += duracionTiempo;    // Add beat length to last beat time

        semicorchea++;    // Advance the beat number, wrap to zero

        if (semicorchea == 16) {
            compas++;
            semicorchea = 0;
            if(compas%4==0&&jugando){
                console.log("compas=",compas,"scheduleAheadTime",scheduleAheadTime);
                conguita=!conguita;
                conguita?Riff.luchando():Riff.mutea("guitarra");
            }
        }
    };

    this.tocaGuitarra=function(time){// escribe nota de guitarra
        if(melodiaGuit[semicorchea].duracion==0){return}

        var duracion= melodiaGuit[semicorchea].duracion * duracionTiempo;
        guitarra = audioContext.createBufferSource(); // creates a sound source
        guitarra.connect(gainNode);       // conecta a ampli
        guitarra.buffer=sonidos[melodiaGuit[semicorchea].nota];
        ///////////////////////////////////////      A Q U I  S U E N A en time   /////////////////////////////////////
        guitarra.start(time);
        guitarra.stop(time + duracion);// play the source ( in seconds!!! )
        /////////////////////////////////////////////////////////////////////////////////////////////////////
    };

    this.tocaBajo=function(time){// escribe nota de bajo
        if(melodiaBajo[semicorchea].duracion==0){return}

        var duracion= melodiaBajo[semicorchea].duracion * duracionTiempo;
        bajo = audioContext.createBufferSource(); // creates a sound source
        bajo.connect(gainNode);       // conecta a ampli
        bajo.buffer=sonidos[melodiaBajo[semicorchea].nota];
    ///////////////////////////////////////      A Q U I  S U E N A en time   /////////////////////////////////////
        bajo.start(time);
        bajo.stop(time + duracion);// play the source ( in seconds!!! )
        /////////////////////////////////////////////////////////////////////////////////////////////////////
    };

    this.tocaBateria=function(time){// escribe nota de bateria
        if(melodiaBate[semicorchea].duracion==0){return}

        var duracion= melodiaBate[semicorchea].duracion * duracionTiempo;

        bateria = audioContext.createBufferSource(); // creates a sound source
        bateria.connect(gainNode);       // conecta a ampli

        bateria.buffer=sonidos[melodiaBate[semicorchea].nota];

        // guitarra.buffer = melodia[semicorchea].buffer; // tañe nota
        ///////////////////////////////////////      A Q U I  S U E N A en time   /////////////////////////////////////
        bateria.start(time);
        bateria.stop(time + duracion);// play the source ( in seconds!!! )
        /////////////////////////////////////////////////////////////////////////////////////////////////////
    };

    this.tocaTom=function(){
        var tom = audioContext.createBufferSource();
        tom.connect(gainNode);
        tom.buffer=sonidos["tom"];
        tom.start(nextNoteTime);
    };
    this.tocaCrash=function(){// toca una vez el crash
        var crash = audioContext.createBufferSource();
        crash.connect(gainNode);
        crash.buffer=sonidos["crs"];
        crash.start(nextNoteTime);
    };


    this.muteUnmute=function() {//////////////////////////////////   play/stop

        AudioPunk.isPlaying=!AudioPunk.isPlaying;
        console.log("AudioPunk.pausePlay=",AudioPunk.isPlaying);



        if(AudioPunk.isPlaying){gainNode.gain.value=1;}else{gainNode.gain.value=0}
    };


    /////////////////////////////////////////////////////////   AUDIO UTILS ////////////////////////////////

    this.scheduler=function() {//    reloj   timeout

        // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {// si toca escribe en el buffer
            console.log("schedulo util");
            GamePlay.beatDraw(nextNoteTime);//// dibuja

            AudioPunk.escribeNota(nextNoteTime);/// pon nota

            AudioPunk.nextNote();

            if(taping){
                Riff.corriendo();
            }else if(jugando){
                Riff.mutea("bateria");
            }else{


            }

        }

        //window.clearTimeout( timerID );
        //timerID=0;
        timerID = window.setTimeout( AudioPunk.scheduler, lookahead );

    };

    this.frequencyFromNoteNumber=function( nota ) {
        //console.log(nota);
        return basenote *110* Math.pow(2,nota/12);//////////1.059463    pow(2, note- nota base?)/ 12notas de la escala);
    };

    this.cambiaTempo=function(event){
        tempo = event.target.value*30;
        secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT tempo value to calculate beat length.
        duracionTiempo=(1/tiemposCompas)*secondsPerBeat;
        console.log("tempo:",tempo);
    };

    this.initializeVars=function(){

        lookahead = 25;
        semicorchea=0;
        compas=0;
       // startTime=0;
        scheduleAheadTime = 0.1;
        tiemposCompas=4;
        tempo = 100.0;
        nextNoteTime = audioContext.currentTime;
        timerID = 0;
        portamento=0.1;
        basenote=1;
        noteLength = 1;

        gainNode= audioContext.createGainNode();////    crea etapa de potencia
        gainNode.connect(audioContext.destination);//// conectar a altavoces
        Riff.initialRiff();// escribe musica inicio

        notesInQueue = [];
        compas=0;
        secondsPerBeat= 60.0 / tempo;
        duracionTiempo=(1/tiemposCompas)*secondsPerBeat;
    };


};