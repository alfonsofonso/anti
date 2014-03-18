/**
 User: alfonso
 Data: 29/01/14 , 11:22
 */


var anima;
var animaPoli;
var jugador;

var maxPolis;
var energia;
var refuerzosTime;
var protegido=true;
var timerPonPoli,timerMuerte,mouseEnabledTimer;
var minimoZoom=.3;

var maderos,refuerzos;


var GamePlay=new function(){

    this.init=function(){

        console.log("init gameplay");
        stage.removeAllEventListeners("click");

        stage.removeAllChildren();

        GamePlay.initVars();

                // poner assets
        Assets.ponFons();
        Assets.ponUrbe();

        Assets.ponCasa(casas[0],1);
        Assets.ponCasa(casas[1],400);
        Assets.ponCasa(casas[2],900);
        Assets.ponCasa(casas[3],1250);

        Assets.ponCasa(casas[0],1700);
        Assets.ponCasa(casas[1],2100);
        Assets.ponCasa(casas[2],2600);
        Assets.ponCasa(casas[3],2950);

        Assets.ponCasa(casas[0],3400);
        Assets.ponCasa(casas[1],3800);
        Assets.ponCasa(casas[2],4300);
        Assets.ponCasa(casas[3],4700);

        fons.snapToPixel = true;
        //fons.cache(0,-100,2560,1920);//max: 2000x1500

        stage.removeChild(jugador);
        stage.addChild(jugador);
        if( blancote == null || blancote == undefined ) {
            blancote=new createjs.Shape();
            blancote.graphics.beginFill("#ff0000").drawRect(0,0, amp, alt);

        }
        stage.addChild(blancote);
        blancote.visible=false;
        //anima.play("quieto");
        Assets.ponHUB();
        Assets.ponPlay();


                //start
        TouchEvents.pausePlay();
        anima.gotoAndPlay("quieto");


        if(funciones.indexOf(Pulso.tomaEnergia)==-1){
            funciones.push(Pulso.tomaEnergia);
        }

        mouseEnabledTimer=setTimeout(GamePlay.activaMouse,1200);
        energyCont.visible=true;
        TweenMax.to(jugador,1,{x:amp/3,y:alt/1.5,ease:Power3.easeOut,scaleX:minimoZoom+zoom*sc,scaleY:minimoZoom+zoom*sc});
    };
    this.activaMouse=function(){

        if(funciones.indexOf(Pulso.jugando)==-1){
            funciones.push(Pulso.jugando);
        }

        Riff.luchando();
        clearTimeout(mouseEnabledTimer);
        mouseEnabledTimer=0;
        if(!stage.hasEventListener("stagemousedown")){
            stage.addEventListener("stagemousedown",TouchEvents.downJugador);
        }


        setTimeout(Assets.creaPoli,2000);
        anima.gotoAndPlay("correns")

    };


    this.muerte=function(){

        stage.removeEventListener("stagemousedown",TouchEvents.downJugador);
        TweenMax.killAll();
        stage.regX=jugador.x+40;
        stage.regY=jugador.y+40;
        stage.x=jugador.x+40;
        stage.y=jugador.y+40;
        TweenMax.to(stage,1,{scaleX:5,scaleY:5,rotation:180,ease:Power3.easeIn});
       // TweenMax.killTweensOf(jugador);
        clearInterval(timerPonPoli);

        anima.gotoAndStop("golpeado");

        AudioPunk.initializeVars();

        Riff.toqueMortal();
        energyCont.visible=false;


        taping=false;
        timerMuerte=setTimeout(GamePlay.pantallaFin,1800);
        funciones.splice(funciones.indexOf(Pulso.jugando),1);
        if(amp>500){
            Ads.publica();
        }
    };

    this.pantallaFin=function(){// en la trena

        Riff.funebre();
        stage.removeAllChildren();
        stage.scaleX=stage.scaleY=1;
        stage.alpha=1;
        stage.rotation=0;
        stage.addChild(playCont);

        Utils.apuntaPunt(toques);
        Assets.ponGameOver();
       // console.log(localDades.getItem("miRecord"));
        console.log("FIN");


    };

    this.topGames=function(){// volver a jugar
        console.log("topGames");
        stage.removeAllChildren();

        GamePlay.init();
    };

    this.initVars=function(){
        zoom=.2;

        maxPolis=15;
        energia=160;
        refuerzosTime=600;
        velPoli=20;
        toques=0;
        maderos=[];
        refuerzos=[];

    };

};