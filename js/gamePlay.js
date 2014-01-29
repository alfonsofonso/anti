/**
 User: alfonso
 Data: 29/01/14 , 11:22
 */


var anima;
var jugador;


var taping;

var GamePlay=new function(){

    this.init=function(){
        screen01.removeEventListener("click");
        stage.removeAllChildren();
        createjs.Ticker.addEventListener("tick",Pulso.handlerTick);

        Assets.posaFons();
        Assets.ponJugador();
        Assets.ponHUB();

        AudioPunk.play();
    };


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);
        TocaRiff.corriendo();

        if(!taping){
            anima.gotoAndPlay("correns");
            taping=true;
        }else{
            //taping=false;//////////////////////// comentable
        }


        var quant=Math.random()/4;

        createjs.Tween.get(fons).to({scaleX:sc+quant,scaleY:sc+quant},500,createjs.Ease.circInOut).call(GamePlay.torna);

        createjs.Tween.get(jugador).to({scaleX:sc/2+quant,scaleY:sc/2+quant,x:amp/4,y:alt/1.3+quant*200},500,createjs.Ease.circInOut);

        //console.log(quant," quant + scY: "+sc);
    };
    this.torna=function(){/// fin traveling fons i jugador
        taping=false;
    };

};