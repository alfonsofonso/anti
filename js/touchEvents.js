/**
 User: alfonso
 Data: 10/02/14 , 18:33
 */
var toques=0;
var taping;
var personPP=1;
var fonsPP=1.4;
var zoomTime=0.2;

TouchEvents=new function(){

    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        console.log("down jugador",fons.regX);
        TweenMax.to(fons,.1,{regX:"+=50"});
        stage.update();
        //Assets.muestraSangre();
        TweenMax.killTweensOf(jugador);


        TweenMax.to(jugador,zoomTime,{x:amp/2,y:alt/1.5,scaleX:personPP,scaleY:personPP,onComplete:TouchEvents.torna});

        TweenMax.to(fons,zoomTime,{scaleX:fonsPP,scaleY:fonsPP, yoyo:true,repeat:1});

        TweenMax.to(refuerzos,zoomTime,{scaleX:personPP,y:alt/1.5,scaleY:personPP,yoyo:true,repeat:1});
        TweenMax.to(maderos,zoomTime,{scaleX:personPP,y:alt/1.5,scaleY:personPP,yoyo:true,repeat:1});
        if(!taping){
            anima.gotoAndPlay("correns");
        }
        taping=true;
        if(energia<energyCont.getBounds().width){
            energia+=20;
        }
        energy.width++;

        toques++;
        metros.text=toques;
    };

    this.torna=function(){/// fin zoomea y tap caja

        TweenMax.to(fons,zoomTime,{scaleX:1,scaleY:1});
        TweenMax.to(jugador,zoomTime,{x:amp/4,y:alt/1.5,scaleX:.6,scaleY:.6});
        TweenMax.to(refuerzos,zoomTime,{scaleX:minimoZoom+zoom*sc,y:alt/1.5,scaleY:minimoZoom+zoom*sc});
        TweenMax.to(maderos,zoomTime,{scaleX:minimoZoom+zoom*sc,y:alt/1.5,scaleY:minimoZoom+zoom*sc});
        taping=false;
        //anima.gotoAndPlay("quieto");
    };

    this.tocoPantalla=function(e){/// evento touch nativo--- posible uso

        console.log("touchEvent, toco pantalla",e);

    };

    this.downPoli=function(cual){///////////////////////////////////////////// empuja poli //////////////////////////////////
        //animaPoli.gotoAndStop("quieto");
        Assets.muestraSangre();
        //stage.removeChild(jugador);
       // stage.addChild(jugador);

        TweenMax.to(cual,.85,{x:amp+100,y:(Math.random()*alt*2)-alt/2,rotation:Math.random()*360-180,ease:Power4.easeOut,onComplete:function(){TouchEvents.poliFuera(cual)}});

        maderos.splice(maderos.indexOf(cual),1);
        refuerzos.splice(refuerzos.indexOf(cual),1);

        ////////// acelerar pasma /// hasta 100 ó 200ms si es > y no >=

        clearInterval(timerPonPoli);
       // timerPonPoli=0;

        if(refuerzosTime>200){
            refuerzosTime-=100;
        }else{
            refuerzosTime--;
        }
        //velPoli++;
        timerPonPoli =setInterval(Assets.creaPoli,refuerzosTime);

        AudioPunk.tocaCrash();
        console.log("zas!");

    };
    this.poliFuera=function(cual){
       stage.removeChild(cual);
        cual=null;

        //animaPoli.gotoAndPlay("correns");
    };





    ////////////////////////////////////////////////////  HUB   ////////////////////////////////////////////
    this.pausePlay=function(){



        clearTimeout(timerPonPoli);
        timerPonPoli=0;

        clearTimeout(timerID);
        AudioPunk.initializeVars();

        timerID=setTimeout(AudioPunk.scheduler, lookahead);// !

    };

};