/**
 User: alfonso
 Data: 10/02/14 , 18:33
 */


TouchEvents=new function(){


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);
        //console.log("native", e.nativeEvent)
        //jugador.addEventListener("pressmove",TouchEvents.mueve);
        //jugador.addEventListener("pressup",TouchEvents.suelta);
        // usar
        //window.addEventListener("touchdown",TouchEvents.tocoPantalla);
        if(!taping){
            Riff.corriendo();
            anima.gotoAndPlay("correns");
            taping=true;
            timerDescansa=setTimeout(TouchEvents.torna,300);
        }
        //GamePlay.zoomea();

    };
    this.torna=function(){/// fin zoomea y tap caja
        taping=false;
        clearTimeout(timerDescansa);
    };

    this.tocoPantalla=function(e){/// evento touch nativo

        console.log("touchEvent, toco pantalla",e);

    };

    this.mueve=function(e){


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



    this.downPoli=function(e){///////////////////////////////////////////// down poli //////////////////////////////////
        e.target.gotoAndStop(1);

        if(maderos.indexOf(e.target.parent)!=-1){
            maderos.splice(maderos.indexOf(e.target.parent),1);
        }
        if(refuerzos.indexOf(e.target.parent)!=-1){
            refuerzos.splice(refuerzos.indexOf(e.target.parent),1);
        }


        createjs.Tween.removeTweens(e.target.parent);
        e.target.parent.removeAllEventListeners();
        e.target.parent.mouseEnabled=false;

        createjs.Tween.get(e.target.parent,{override:true}).to({alpha:0},350,createjs.Ease.circInOut).call(function(){TouchEvents.poliFuera(e.target)});

    ////////// acelerar pasma

        clearInterval(timerPonPoli);
        timerPonPoli=0;
        if(refuerzosTime>=300){refuerzosTime-=100;}
        timerPonPoli=setInterval(Assets.ponPoli,refuerzosTime);

        AudioPunk.tocaCrash();
        console.log("zas!");
        e.target.gotoAndStop("quieto");

    };
    this.poliFuera=function(quePoli){

        stage.removeChild(quePoli.parent);

    };


    ////////////////////////////////////////////////////  HUB   ////////////////////////////////////////////
    this.muteUnmute=function(){/// boton pause-play game
        jugando=!jugando;
        console.log("GamePlay.jugando=",jugando);

        clearInterval(timerPonPoli);
        timerPonPoli=0;
        clearTimeout(timerID);


        if(jugando){
            timerPonPoli=setInterval(Assets.ponPoli,refuerzosTime);
            timerID=setTimeout(AudioPunk.scheduler, lookahead);
        }
    };

};