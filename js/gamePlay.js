/**
 User: alfonso
 Data: 29/01/14 , 11:22
 */


var anima;
var animaPoli;
var jugador;
var zoom;
var maxPolis;
var energia;
var refuerzosTime;
var protegido=true;
var timerPonPoli,timerMuerte,mouseEnabledTimer;
var minimoZoom=.4;
var jugando=false;
var scPlayer;
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
        Assets.ponSangre();


                //start
        TouchEvents.pausePlay();
        anima.gotoAndPlay("quieto");
        GamePlay.zoomea();
        //createjs.Tween.get(energyCont).to({scaleX:10},1200);
        mouseEnabledTimer=setTimeout(GamePlay.activaMouse,1200);
        energyCont.visible=true;

    };
    this.activaMouse=function(){
        jugando=true;

        Riff.luchando();
        clearTimeout(mouseEnabledTimer);
        mouseEnabledTimer=0;
        if(!stage.hasEventListener("stagemousedown")){
            stage.addEventListener("stagemousedown",TouchEvents.downJugador);
        }
        energy.graphics.beginFill("#00ff00").drawRect(0,0, energia, 100);


        Assets.creaPoli();
    };

    this.zoomea=function(cuantoZoom){
        console.log("zoomea",cuantoZoom, "or",sc,"or 0.3");
        zoom=cuantoZoom||.1;
       ///13;
       // taping=false;////// !

               // fons
        createjs.Tween.get(paisaje,{override:true}).to({scaleX:minimoZoom+zoom *sc ,scaleY:minimoZoom+zoom *sc,y:alt/2 },1200,createjs.Ease.circInOut);
         // casas
        createjs.Tween.get(fons,{override:true}).to({scaleX:minimoZoom+zoom *sc ,scaleY:minimoZoom+zoom *sc,y:alt/2 },1200,createjs.Ease.circInOut);

        // jugador
        createjs.Tween.get(jugador,{override:true}).to({scaleX:minimoZoom + zoom*sc, scaleY:minimoZoom + zoom*sc, x:amp/4, y:alt/1.5},1200,createjs.Ease.circInOut);

        for(var m=0;m<refuerzos.length;m++){
            createjs.Tween.get(refuerzos[m],{override:true}).to({scaleX:minimoZoom + zoom*sc, scaleY:minimoZoom + zoom*sc, y:alt/1.5},1200,createjs.Ease.circInOut);
        }

    };


    this.muerte=function(){

        stage.removeEventListener("stagemousedown",TouchEvents.downJugador);

        clearInterval(timerPonPoli);

        anima.gotoAndStop("golpeado");

        AudioPunk.initializeVars();

        Riff.toqueMortal();

        GamePlay.zoomea(4);

        energyCont.visible=false;

        jugando=false;
        taping=false;
        timerMuerte=setTimeout(GamePlay.pantallaFin,1800);


    };

    this.pantallaFin=function(){// en la trena

        Riff.funebre();
        stage.removeAllChildren();

        stage.addChild(sangre);

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