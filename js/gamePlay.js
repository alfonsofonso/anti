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
var timerPonPoli,timerMuerte,mouseEnabledTimer;
var minimoZoom=.3;
var jugando=false;
var scPlayer;

var GamePlay=new function(){

    this.init=function(){

        console.log("init gameplay");
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
        Assets.ponCasa(casas[3],2950);

        Assets.ponCasa(casas[0],3400);
        Assets.ponCasa(casas[1],3800);
        Assets.ponCasa(casas[2],4300);
        Assets.ponCasa(casas[3],4700);

        fons.snapToPixel = true;
        //fons.cache(0,-100,2560,1920);//max: 2000x1500

        stage.removeChild(jugador);
        stage.addChild(jugador);
        jugador.mouseEnabled=false;

        Assets.ponHUB();
        Assets.ponSangre();

                //start
        TouchEvents.pausePlay();
        anima.gotoAndPlay("quieto");

        GamePlay.zoomea();
        mouseEnabledTimer=setTimeout(GamePlay.activaMouse,1200);
        console.log("disblo mouse",jugador.mouseEnabled);
        toques=0;
        metros.text="0 m.";
    };
    this.activaMouse=function(){
        console.log("enable mouse");
        clearTimeout(mouseEnabledTimer);
        mouseEnabledTimer=0;

        jugador.mouseEnabled=true;
    };


    this.downPoli=function(e){///////////////////////////////////////////// empuja poli //////////////////////////////////
        e.children[0].gotoAndStop(1);

        if(maderos.indexOf(e)!=-1){
            maderos.splice(maderos.indexOf(e),1);
        }
        if(refuerzos.indexOf(e)!=-1){
            refuerzos.splice(refuerzos.indexOf(e),1);
        }
        createjs.Tween.removeTweens(e);

        createjs.Tween.get(e,{override:true}).to({alpha:0,x:amp},350,createjs.Ease.circInOut).call(function(){GamePlay.poliFuera(e)});

        ////////// acelerar pasma /// hasta 100 ó 200ms si es > y no >=

        clearInterval(timerPonPoli);
        timerPonPoli=0;
        if(refuerzosTime>200){refuerzosTime-=100;}
        timerPonPoli =setInterval(Assets.ponPoli,refuerzosTime);


        AudioPunk.tocaCrash();
        console.log("zas!");
        e.children[0].gotoAndStop("quieto");
    };
    this.poliFuera=function(quePoli){

        stage.removeChild(quePoli.parent);

    };




    this.beatDraw=function(t){/// siendo golpeado

        if(maderos.length>0 && jugando ){
            if(taping){
                GamePlay.downPoli(maderos[0]);
            }else{
                AudioPunk.tocaTom(t);
                anima.gotoAndPlay("golpeado");
                createjs.Tween.get(jugador).to({x: amp/9},350,createjs.Ease.circInOut).call(GamePlay.backFromHit);
                stage.addChild(sangre);
                var sang=setTimeout(GamePlay.sangra,80);
               // energia-=40;
                //if(energia<=0){
                GamePlay.muerte();
            //}

             //   energy.graphics.clear();
             //   energy.graphics.beginFill("#ff0000").drawRect(0,0, energia, 30);
            }
        }
    };
    this.backFromHit=function(){
        createjs.Tween.get(jugador,{override:true}).to({x:amp/4},350,createjs.Ease.circInOut);
    };
    this.sangra=function(){
        sangre.rotation=Math.random()*360;
        stage.removeChild(sangre);
    };

    this.spray=function(){
        Assets.ponMuro();
        clearInterval(timerPonPoli);
        timerPonPoli=0;
        createjs.Ticker.removeEventListener("tick",Pulso.handlerTick);
        createjs.Ticker.addEventListener("tick",Pulso.handlerTick2);
        createjs.Tween.get(jugador,{override:true}).to({x:0},350,createjs.Ease.circInOut);
        jugador.mouseEnabled=false;
    };


    this.zoomea=function(cuantoZoom){
        console.log("zoomea",cuantoZoom, "or",sc,"or 0.3");
        zoom=cuantoZoom||.1;
        scPlayer=sc;///13;
        taping=false;////// !

               // fons
        createjs.Tween.get(paisaje,{override:true}).to({scaleX:minimoZoom+zoom *sc ,scaleY:minimoZoom+zoom *sc,y:alt/2 },1200,createjs.Ease.circInOut);
         // casas
        createjs.Tween.get(fons,{override:true}).to({scaleX:minimoZoom+zoom *sc ,scaleY:minimoZoom+zoom *sc,y:alt/2 },1200,createjs.Ease.circInOut);

        // jugador
        createjs.Tween.get(jugador,{override:true}).to({scaleX:minimoZoom + zoom *scPlayer,scaleY:minimoZoom+zoom*scPlayer, x:amp/4, y:alt/1.5},1200,createjs.Ease.circInOut);
        // polis
        for(var i=0;i<maderos.length;i++){
            createjs.Tween.get(maderos[i],{override:true}).to({scaleX:minimoZoom+zoom*scPlayer,scaleY:minimoZoom+zoom*scPlayer, y:alt/1.5},1200,createjs.Ease.circInOut);
        }
        for(var j=0;j<refuerzos.length;j++){
            createjs.Tween.get(refuerzos[j],{override:true}).to({scaleX:minimoZoom+zoom*scPlayer,scaleY:minimoZoom+zoom*scPlayer, y:alt/1.5},1200,createjs.Ease.circInOut);
        }

    };


    this.muerte=function(){
        jugador.mouseEnabled=false;
        stage.mouseEnabled=false;
        energy.graphics.clear();
        clearInterval(timerPonPoli);
        timerPonPoli=-1;


        anima.gotoAndStop("golpeado");

        AudioPunk.initializeVars();

        Riff.toqueMortal();

        GamePlay.zoomea(55);
        maderos=[];
        jugando=false;
        timerMuerte=setTimeout(GamePlay.pantallaFin,1800);


    };

    this.pantallaFin=function(){// en la trena

        Riff.funebre();
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
        refuerzosTime=1000;
        maderos=[];
        refuerzos=[];

    };

};