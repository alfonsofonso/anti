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
var taping;
var timerPonPoli,timerMuerte,timerDescansa;
var minimoZoom=.7;
var jugando=false;
var scPlayer;

var GamePlay=new function(){

    this.init=function(){

        screen01.removeEventListener("click");
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
        //Assets.ponCasa(casas[3],2950);

        console.time("prova");
        fons.snapToPixel = true;
        fons.cache(0,-100,3000,800);

        console.timeEnd("prova");
        stage.removeChild(jugador);
        stage.addChild(jugador);
        jugador.mouseEnabled=true;

        Assets.ponHUB();
        Assets.ponSangre();

                //start
        TouchEvents.muteUnmute();
        anima.gotoAndPlay("quieto");



        GamePlay.zoomea();

    };



    this.beatDraw=function(t){/// siendo golpeado

        if(maderos.length>0 && jugando){
            AudioPunk.tocaTom(t);
            anima.gotoAndPlay("golpeado");
            createjs.Tween.get(jugador).to({x: amp/9},350,createjs.Ease.circInOut).call(GamePlay.backFromHit);
            stage.addChild(sangre);
            var sang=setTimeout(GamePlay.sangra,80);
            energia-=10;
            if(energia<=0){GamePlay.muerte()}

            energy.graphics.clear();
            energy.graphics.beginFill("#ff0000").drawRect(0,0, energia, 30);
        }
    };
    this.backFromHit=function(){
        createjs.Tween.get(jugador,{override:true}).to({x:amp/4},350,createjs.Ease.circInOut);
    };
    this.sangra=function(){
        sangre.rotation=Math.random()*360;
        stage.removeChild(sangre);
    };



    this.muerte=function(){

        energy.graphics.clear();
        clearInterval(timerPonPoli);
        timerPonPoli=0;
        anima.gotoAndStop("golpeado");

        GamePlay.zoomea(22);
        jugando=false;
        timerMuerte=setTimeout(GamePlay.pantallaFin,2000);

    };



    this.zoomea=function(cuantoZoom){
        console.log("zoomea",cuantoZoom, "or",sc,"or 0.3");
        zoom=cuantoZoom||.1;
        scPlayer=sc/13;

               // fons
        createjs.Tween.get(paisaje,{override:true}).to({scaleX:minimoZoom+zoom *sc ,scaleY:minimoZoom+zoom *sc,y:alt/2 },1200,createjs.Ease.circInOut);
         // casas
        createjs.Tween.get(fons,{override:true}).to({scaleX:minimoZoom+zoom *sc ,scaleY:minimoZoom+zoom *sc,y:alt/2 },1200,createjs.Ease.circInOut);
        // jugador
        createjs.Tween.get(jugador,{override:true}).to({scaleX:minimoZoom+zoom*scPlayer,scaleY:minimoZoom+zoom*scPlayer, x:amp/4, y:alt/1.5},1200,createjs.Ease.circInOut);
        // polis
        for(var i=0;i<maderos.length;i++){
            createjs.Tween.get(maderos[i],{override:true}).to({scaleX:minimoZoom+zoom*scPlayer,scaleY:minimoZoom+zoom*scPlayer, y:alt/1.42},1200,createjs.Ease.circInOut);
        }
        for(var j=0;j<refuerzos.length;j++){
            createjs.Tween.get(refuerzos[j],{override:true}).to({scaleX:minimoZoom+zoom*scPlayer,scaleY:minimoZoom+zoom*scPlayer, y:alt/1.4},1200,createjs.Ease.circInOut);
        }

    };

    this.pantallaFin=function(){// en la trena

        stage.removeAllChildren();
        stage.addChild(sangre);
        Assets.ponGameOver();
        console.log("FIN");

    };
    this.topGames=function(){// volver a jugar
        console.log("topGames");
        stage.removeAllChildren();
        GamePlay.init();
    };

    this.initVars=function(){
        zoom=.2;
        maxPolis=5;
        energia=200;
        refuerzosTime=5000;
        maderos=[];
        refuerzos=[];

    };

};