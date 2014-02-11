/**
 User: alfonso
 Data: 10/02/14 , 18:33
 */


TouchEvents=new function(){


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);

        jugador.addEventListener("pressmove",TouchEvents.mueve);
        jugador.addEventListener("pressup",TouchEvents.suelta);
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


    this.mueve=function(e){


        zoom=(e.stageX -jugador.x)/1000;
        console.log("mueve", e.stageX-jugador.x,"zoom",zoom);
        // fons
        fons.scaleX=2*minimoZoom+zoom *1.3;
        fons.scaleY=2*minimoZoom+zoom *1.3;
        // jugador
        jugador.scaleX=minimoZoom+zoom /1.3;
        jugador.scaleY=minimoZoom+zoom /1.3;
        // polis
        for(var i=0;i<refuerzos.length;i++){
            refuerzos[i].scaleX=minimoZoom+zoom /1.3;
            refuerzos[i].scaleY=minimoZoom+zoom /1.3;
        }
        for(var i=0;i<maderos.length;i++){
            maderos[i].scaleX=minimoZoom+zoom /1.3;
            maderos[i].scaleY=minimoZoom+zoom /1.3;
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
    this.playStop=function(){/// boton pause
        jugando=!jugando;
        console.log("GamePlay.jugando=",jugando);
        clearInterval(timerPonPoli);
        clearTimeout(timerID);

        if(jugando){
            timerPonPoli=setInterval(Assets.ponPoli,refuerzosTime);
            timerID=setTimeout(AudioPunk.scheduler, lookahead);
        }
    };

};