/**
 User: alfonso
 Data: 29/01/14 , 11:22
 */


var anima;
var animaPoli;
var jugador;
var zoom;
var maxPolis=5;
var recibiendo;

var taping;

var GamePlay=new function(){

    this.init=function(){
        screen01.removeEventListener("click");
        stage.removeAllChildren();
        createjs.Ticker.addEventListener("tick",Pulso.handlerTick);

        Assets.posaFons();
        Assets.ponJugador();
        Assets.ponHUB();
        setInterval(Assets.ponPoli,5000);
        AudioPunk.play();
    };


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);
        Riff.corriendo();

        if(!taping){
            anima.gotoAndPlay("correns");
            taping=true;
        }else{
            //taping=false;//////////////////////// comentable
        }

        zoom=Math.random()/4;

        createjs.Tween.get(fons,{override:false}).to({scaleX:sc+zoom,scaleY:sc+zoom},350,createjs.Ease.circInOut).call(GamePlay.torna);

        createjs.Tween.get(jugador,{override:false}).to({scaleX:sc/2+zoom,scaleY:sc/2+zoom,x:amp/4,y:alt/1.3+zoom*200},350,createjs.Ease.circInOut);

        for(var i=0;i<maderos.length;i++){
            createjs.Tween.get(maderos[i],{override:false}).to({scaleX:sc/2+zoom,scaleY:sc/2+zoom,y:alt/1.3+zoom*200},350,createjs.Ease.circInOut);
        }

        console.log(" zoom" ,zoom, "scY: ",sc);
    };
    this.torna=function(){/// fin traveling fons i jugador
        taping=false;
    };


    this.downPoli=function(e){
        e.target.gotoAndStop(1);
        maderos.splice(e.target);
        createjs.Tween.removeTweens(e.target);
        e.target.removeAllEventListeners();
        e.target.mouseEnabled=false;
        createjs.Tween.get(e.target).to({scaleX:.8,scaleY:.8,alpha:0,rotation:-50,x: e.target.x+100,y: e.target.y-100},350,createjs.Ease.circInOut).call(function(){GamePlay.poliFuera(e.target)});
        console.log(e.target);
        AudioPunk.tocaCrash();

    };
    this.poliFuera=function(quePoli){
        stage.removeChild(quePoli.parent);
        recibiendo=false;
    };

    this.mamporrear=function(mader){

        if(maderos.indexOf(mader)!=-1){
           recibiendo=true;
        }else{
           recibiendo=false;
        }


    };

    this.beatDraw=function(t){
        if(recibiendo){
            AudioPunk.tocaTom(t);
            anima.gotoAndPlay("golpeado");
            createjs.Tween.get(jugador).to({x: amp/9},350,createjs.Ease.circInOut).call(GamePlay.backFromHit);
        }
    };
    this.backFromHit=function(){

        createjs.Tween.get(jugador,{override:true}).to({x:amp/4},350,createjs.Ease.circInOut);
    }

};