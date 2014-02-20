/**
 User: alfonso
 Data: 10/02/14 , 18:33
 */
var toques=0;

TouchEvents=new function(){


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);
        //console.log("native", e.nativeEvent)
        //jugador.addEventListener("pressmove",TouchEvents.mueve);
        //jugador.addEventListener("pressup",TouchEvents.suelta);
        // usar
        //window.addEventListener("touchdown",TouchEvents.tocoPantalla);

        if(!taping){
            toques++;
            Riff.corriendo();
            anima.gotoAndPlay("correns");
            taping=true;
           // timerDescansa=setTimeout(TouchEvents.torna,300);
            createjs.Tween.get(jugador,{override:true}).to({x:amp/3},200,createjs.Ease.circOut).call(TouchEvents.torna);

        }
        if(toques==1){
            timerPonPoli=setInterval(Assets.ponPoli,refuerzosTime);
        }

    };
    this.torna=function(){/// fin zoomea y tap caja
        createjs.Tween.get(jugador,{override:true}).to({x:amp/4},300,createjs.Ease.circIn).call(TouchEvents.torna2);
        // clearTimeout(timerDescansa);
    };
    this.torna2=function(){/// fin zoomea y tap caja
        taping=false;
    };

    this.tocoPantalla=function(e){/// evento touch nativo

        console.log("touchEvent, toco pantalla",e);

    };

    this.mueve=function(e){// mouseMove

        zoom=(e.rawX -jugador.x)/1000;
        console.log("mueve", e.stageX-jugador.x,"zoom",zoom);
        // fons
        fons.scaleX=2*minimoZoom+zoom *1.3;
        fons.scaleY=2*minimoZoom+zoom *1.3;
        // jugador
        jugador.scaleX=minimoZoom+zoom*sc;
        jugador.scaleY=minimoZoom+zoom*sc;
        // polis
        for(var i=0;i<refuerzos.length;i++){
            refuerzos[i].scaleX=minimoZoom+zoom*sc;
            refuerzos[i].scaleY=minimoZoom+zoom*sc ;
        }
        for(var j=0;j<maderos.length;j++){
            maderos[j].scaleX=minimoZoom+zoom*sc;
            maderos[j].scaleY=minimoZoom+zoom*sc;
        }

    };

    this.suelta=function(e){
        console.log("suelta");
        jugador.removeEventListener("pressmove",TouchEvents.mueve);
        jugador.removeEventListener("pressup",TouchEvents.suelta);

    };






    ////////////////////////////////////////////////////  HUB   ////////////////////////////////////////////
    this.pausePlay=function(){/// boton pause-play game
        jugando=!jugando;
        console.log("GamePlay.jugando=",jugando);

        clearInterval(timerPonPoli);
        timerPonPoli=0;

        clearTimeout(timerID);
        AudioPunk.initializeVars();

        if(jugando){

            timerID=setTimeout(AudioPunk.scheduler, lookahead);
        }
    };

};