/**
 User: alfonso
 Data: 28/01/14 , 16:59
 */

var sonidos={};
var sonidos_arr=["sonidos/faGuitarraLargo.mp3",
    "sonidos/solGuitarraLargo.mp3",
    "sonidos/laGuitarraLargo.mp3",
    "sonidos/faBajoLargo.mp3",
    "sonidos/solBajoLargo.mp3",
    "sonidos/laBajoLargo.mp3",
    "sonidos/charles.mp3",
    "sonidos/bombo.mp3",
    "sonidos/caja.mp3"];



var LoaderAudio = new function(){

    var todosLosSonidos=9;
    var sonidosCargados=0;
    var raiz="sonidos/";

    this.cargaSonidos=function(){

        LoaderAudio.loadSound(sonidos_arr[0]);

    };

    this.loadSound=function(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {
            audioContext.decodeAudioData(request.response, function(buffer) {LoaderAudio.cargado(buffer,url) }, AudioPunk.onError)
        };
        request.send();
    };
    this.onError=function(event){
        console.log("error de audio:",event);
    };


    this.cargado=function(buffer,url){
        console.log("cargado",buffer,"url",url);


        switch(url)
        {
            case raiz+"faGuitarraLargo.mp3": sonidos['fG'] = buffer;
                break
            case raiz+"solGuitarraLargo.mp3": sonidos['gG'] = buffer;
                break
            case raiz+"laGuitarraLargo.mp3": sonidos['aG'] = buffer;
                break
            case raiz+"faBajoLargo.mp3": sonidos['fB'] = buffer;
                break
            case raiz+"solBajoLargo.mp3": sonidos['gB'] = buffer;
                break
            case raiz+"laBajoLargo.mp3": sonidos['aB'] = buffer;
                break
            case raiz+"charles.mp3": sonidos['chs'] = buffer;
                break
            case raiz+"bombo.mp3": sonidos['bom'] = buffer;
                break
            case raiz+"caja.mp3": sonidos['caj'] = buffer;
                break
        }

        sonidosCargados++;
        if(sonidosCargados>=todosLosSonidos){                               ////// todoo cargado
            Loader.reload();
        }else{
            LoaderAudio.loadSound(sonidos_arr[sonidosCargados])
        }
    };


};