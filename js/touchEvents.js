/**
 User: alfonso
 Data: 10/02/14 , 18:33
 */
var toques=0;
var taping;


TouchEvents=new function(){

    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        console.log("down jugador");
        fons.x-=20;
        //Assets.muestraSangre();

        if(!taping){
            anima.gotoAndPlay("correns");
            createjs.Tween.get(jugador,{override:true}).to({x:amp/4},300,createjs.Ease.circOut).call(TouchEvents.torna);
        }
        taping=true;
        if(energia<400){
            energia+=20;
        }
        energy.width++;

        toques++;
        metros.text=toques;
    };
    this.torna=function(){/// fin zoomea y tap caja
        createjs.Tween.get(jugador,{override:true}).to({x:amp/4},100,createjs.Ease.circOut).call(TouchEvents.torna2);
    // clearTimeout(timerDescansa);
    };
    this.torna2=function(){/// fin zoomea y tap caja
        taping=false;
        anima.gotoAndPlay("quieto");
    };

    this.tocoPantalla=function(e){/// evento touch nativo--- posible uso

        console.log("touchEvent, toco pantalla",e);

    };

    this.downPoli=function(cual){///////////////////////////////////////////// empuja poli //////////////////////////////////
        //animaPoli.gotoAndStop("quieto");
        Assets.muestraSangre();

        createjs.Tween.removeTweens(cual);

        createjs.Tween.get(cual,{override:true}).to({x:amp,y:(Math.random()*alt*2)-alt/2,rotation:Math.random()*360-180},850,createjs.Ease.quadOut).call(function(){TouchEvents.poliFuera(cual)});

        maderos.splice(maderos.indexOf(cual),1);
        refuerzos.splice(refuerzos.indexOf(cual),1);

        ////////// acelerar pasma /// hasta 100 ó 200ms si es > y no >=

        clearInterval(timerPonPoli);
       // timerPonPoli=0;

        if(refuerzosTime>200){
            refuerzosTime-=50;
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


        console.log("GamePlay.jugando=",jugando);

        clearTimeout(timerPonPoli);
        timerPonPoli=0;

        clearTimeout(timerID);
        AudioPunk.initializeVars();

        timerID=setTimeout(AudioPunk.scheduler, lookahead);// !

    };

};