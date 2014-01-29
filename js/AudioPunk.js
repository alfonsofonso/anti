/**
 User: alfonso
 Data: 27/01/14 , 15:07
 */
var audioContext = null;    // los altavoces

var melodiaGuit,melodiaBajo,melodiaBate;
var guitarra,bajo,bateria;
var currentGuit,currentBajo,currentBate;

AudioPunk= new function(){

    var gainNode=null;          // la etapa de potencia

    var isPlaying = false;      // Are we currently playing?
    var startTime;              // The start time of the entire sequence.
    var semicorchea;        // What note is currently last scheduled?
    var tempo;           //    tempo
    var lookahead;         // How frequently to call scheduling function (in milliseconds)
        // 25 milisegundos cada llamada se escriben 100 milisegundos
    var scheduleAheadTime;// 100 milisegundos;  // How far ahead to schedule sonidos (sec)
        // This is calculated from lookahead, and overlaps with next interval (in case the timer is late)
    var nextNoteTime;     // when the next note is due.
    var noteResolution;     // 0 == 16th, 1 == 8th, 2 == quarter note
    var timerID;            // setInterval identifier.
    var notesInQueue;      // the notes that have been put into the web sonidos, and may or may not have played yet. {note, time}
    var portamento;
    var basenote;
    var noteLength;        // length of "beep" (in seconds)
    var secondsPerBeat;
    var tiemposCompas;
    var duracionTiempo;
    var compas;

    this.init=function(){

        // start Engine
        window.AudioContext=window.AudioContext||window.webkitAudioContext;
        audioContext =  new AudioContext();
        AudioPunk.initializeVars();

        // loadSounds
        LoaderAudio.cargaSonidos();
    };


    this.escribeNota=function(time) { //this.scheduleNote=function( beatNumber, time ) {
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
        }
    };


    this.tocaGuitarra=function(time){// escribe nota de guitarra
        if(melodiaGuit[semicorchea].duracion==0){return}

        var duracion= melodiaGuit[semicorchea].duracion * duracionTiempo;

        guitarra = audioContext.createBufferSource(); // creates a sound source
        guitarra.connect(gainNode);       // conecta a ampli

        guitarra.buffer=sonidos[melodiaGuit[semicorchea].nota];

       // guitarra.buffer = melodia[semicorchea].buffer; // tañe nota
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

        // guitarra.buffer = melodia[semicorchea].buffer; // tañe nota
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

    this.todoCargado=function(){///// AudioPunk preparado

        Loader.reload();

       // var b=document.getElementById('container');
        //b.addEventListener("click",AudioPunk.play);

    };

    this.play=function() {//////////////////////////////////   play/stop
        console.log("play");
        isPlaying = !isPlaying;/// switch button

        if (isPlaying) { // si toca sonar, comienza
            semicorchea = 0;
            nextNoteTime = audioContext.currentTime;

            gainNode= audioContext.createGainNode();////    crea etapa de potencia
            gainNode.connect(audioContext.destination);//// conectar a altavoces

            AudioPunk.scheduler();    //                 empieza a seguir el ritmo! snap your fingers!
        } else  {
            window.clearTimeout( timerID );
        }
    };

    this.riff1=function(){

        /*melodiaGuit=[{nota:"aG",duracion:2},{nota:"aG",duracion:0},{nota:"aG",duracion:1},{nota:"aG",duracion:2},
            {nota:"aG",duracion:0},{nota:"aG",duracion:1},{nota:"aG",duracion:1},{nota:"aG",duracion:1},
            {nota:"fG",duracion:2},{nota:"fG",duracion:0},{nota:"fG",duracion:1},{nota:"gG",duracion:2},
            {nota:"gG",duracion:0},{nota:"gG",duracion:1},{nota:"gG",duracion:1},{nota:"gG",duracion:1}];*/
        currentGuit="riff1";

        melodiaBate=[{nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
            {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
            {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
            {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1}];
    };


    /////////////////////////////////////////////////////////   AUDIO UTILS ////////////////////////////////
    this.frequencyFromNoteNumber=function( nota ) {
        //console.log(nota);
        return basenote *110* Math.pow(2,nota/12);//////////1.059463    pow(2, note- nota base?)/ 12notas de la escala);

    };

    this.cambiaTempo=function(event){
        tempo = event.target.value*30;
        secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT tempo value to calculate beat length.
        duracionTiempo=(1/tiemposCompas)*secondsPerBeat;
        //basenote=event.target.value;
        console.log("tempo:",tempo);

    };

    this.initializeVars=function(){

        lookahead = 25;
        scheduleAheadTime = 0.1;
        tiemposCompas=4;
        tempo = 100.0;
        nextNoteTime = 0.0;
        timerID = 0;
        portamento=0.1;
        basenote=1;
        noteLength = 1;

        currentGuit="none";

        melodiaGuit=[{nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},
                     {nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},
                     {nota:"fG",duracion:0},{nota:"fG",duracion:0},{nota:"fG",duracion:0},{nota:"gG",duracion:0},
                     {nota:"gG",duracion:0},{nota:"gG",duracion:0},{nota:"gG",duracion:0},{nota:"gG",duracion:0}];
        melodiaBajo=[{nota:"aB",duracion:2},{nota:"aB",duracion:0},{nota:"aB",duracion:1},{nota:"aB",duracion:2},
                     {nota:"aB",duracion:0},{nota:"aB",duracion:1},{nota:"aB",duracion:1},{nota:"aB",duracion:1},
                     {nota:"fB",duracion:2},{nota:"fB",duracion:0},{nota:"fB",duracion:1},{nota:"gB",duracion:2},
                     {nota:"gB",duracion:0},{nota:"gB",duracion:1},{nota:"gB",duracion:1},{nota:"gB",duracion:1}];
        melodiaBate=[{nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0},
                     {nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0},
                     {nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0},
                     {nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0}];

        notesInQueue = [];
        compas=0;
        secondsPerBeat= 60.0 / tempo;
        duracionTiempo=(1/tiemposCompas)*secondsPerBeat;

    };

    this.scheduler=function() {//    reloj   timeout
        // while there are notes that will need to play before the next interval,
        // schedule them and advance the pointer.


        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {// si toca escribe en el buffer

            //console.log("nextNonteTime",nextNoteTime,"time + sheduleAhead",audioContext.currentTime + scheduleAheadTime);
            AudioPunk.escribeNota( nextNoteTime);
            AudioPunk.nextNote();
        }
        timerID = window.setTimeout( AudioPunk.scheduler, lookahead );
    };


};