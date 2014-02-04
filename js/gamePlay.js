/**
 User: alfonso
 Data: 29/01/14 , 11:22
 */


var anima;
var animaPoli;
var jugador;
var zoom;
var maxPolis=5;
var energia=200;
var taping;
var timerPonPoli,timerMuerte,timerDescansa;
var refuerzosTime=5000;
var jugando=false;

var GamePlay=new function(){

    this.init=function(){
        screen01.removeEventListener("click");
        stage.removeAllChildren();
        createjs.Ticker.addEventListener("tick",Pulso.handlerTick);
        zoom=Math.random()/4;

        Assets.posaFons();
        Assets.ponJugador();
        Assets.ponHUB();
        Assets.ponSangre();

        GamePlay.playStop();
        anima.gotoAndPlay("quieto");

        AudioPunk.playStop();
    };


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);

        if(!taping){
            Riff.corriendo();
            anima.gotoAndPlay("correns");
            taping=true;
            timerDescansa=setTimeout(GamePlay.torna,300);
        }
        //GamePlay.zoomea();

    };
    this.torna=function(){/// fin zoomea y tap caja
        taping=false;
        clearTimeout(timerDescansa);
    };


    this.downPoli=function(e){///////////////////////////////////////////// down poli
        e.target.gotoAndStop(1);
        if(maderos.length>0){
            maderos.length--;
        }

        createjs.Tween.removeTweens(e.target.parent);
        e.target.parent.removeAllEventListeners();
        e.target.parent.mouseEnabled=false;
        e.target.parent.scaleX= e.target.parent.scaleY=1;
        createjs.Tween.get(e.target,{override:true}).to({scaleX:.8,scaleY:.8,alpha:0,rotation:-50,x: e.target.x+100,y: e.target.y-100},350,createjs.Ease.circInOut).call(function(){GamePlay.poliFuera(e.target)});

        AudioPunk.tocaCrash();
        console.log("zas!")

    };
    this.poliFuera=function(quePoli){

        stage.removeChild(quePoli.parent);

    };

    this.mamporrear=function(mader){
        console.log("MAMPORRO!");
        maderos.push(mader);
    };

    this.beatDraw=function(t){/// siendo golpeado

        if(maderos.length>0 && jugando){
            AudioPunk.tocaTom(t);
            anima.gotoAndPlay("golpeado");
            createjs.Tween.get(jugador).to({x: amp/9},350,createjs.Ease.circInOut).call(GamePlay.backFromHit);
            stage.addChild(sangre);
            var sang=setTimeout(GamePlay.sangra,80);
            energia-=10;
            if(energia<=0){GamePlay.muerte();return;}
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
        GamePlay.zoomea(2);

    };

    this.playStop=function(){
        jugando=!jugando;
        console.log("GamePlay.jugando=",jugando);
        if(jugando){
            timerPonPoli=setInterval(Assets.ponPoli,refuerzosTime);
        }else{
            clearInterval(timerPonPoli);
           // AudioPunk.playStop();
        }
    };

    this.zoomea=function(cuantoZoom){
        if(cuantoZoom==undefined){
            zoom=Math.random()/4;
        }else{
            timerMuerte=setTimeout(GamePlay.pantallaFin,2000);
            zoom=cuantoZoom;
        }
        // fons
        createjs.Tween.get(fons,{override:false}).to({scaleX:sc+zoom,scaleY:sc+zoom},1800,createjs.Ease.circInOut);
        // jugador
        createjs.Tween.get(jugador,{override:false}).to({scaleX:sc/2+zoom,scaleY:sc/2+zoom,x:amp/4,y:alt/1.3+zoom*200},1800,createjs.Ease.circInOut);
        // polis
        for(var i=0;i<maderos.length;i++){
            createjs.Tween.get(maderos[i],{override:false}).to({scaleX:sc/2+zoom,scaleY:sc/2+zoom,y:alt/1.3+zoom*200},1800,createjs.Ease.circInOut);
        }

    };

    this.pantallaFin=function(){



    };


};