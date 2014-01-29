/**
 User: alfonso
 Data: 29/01/14 , 11:22
 */


var GamePlay=new function(){

    this.init=function(){
        screen01.removeEventListener("click");
        stage.removeAllChildren();
        createjs.Ticker.addEventListener("tick",Pulso.handlerTick);
        Fons.posaFons();
        GamePlay.ponJugador();
    };


    this.ponJugador=function(){

        AudioPunk.play();

        if( corriendo == null || corriendo == undefined ) {// container Jugador
            corriendo=new createjs.Container();
        }
        corriendo.x=amp/4;
        corriendo.y=alt;
        stage.addChild(corriendo);

        var array_imatges = new createjs.SpriteSheet({ // SpriteSheet
            "animations":
            {
                "correns":{
                    frames: [0,1,2,3],
                    next:"quieto",
                    speed: .4
                },
                "saltant":{
                    frames:[0]
                }
            },
            "images": [imatges['corriendoSprite']],
            "frames":
            {
                "height": 512,
                "width":512,
                "regX": 256,
                "regY":256,
                "count": 4
            }
        });

        anima = new createjs.Sprite(array_imatges);
        corriendo.addChild(anima);
        corriendo.y=alt-corriendo.getTransformedBounds().height/2;
        corriendo.addEventListener("mousedown",GamePlay.downJugador);

    };


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);
        AudioPunk.riff1();
        createjs.Tween.removeAllTweens();
        anima.gotoAndPlay("correns");
        correns=true;

        var quant=Math.random()/4;

        createjs.Tween.get(fons).to({scaleX:sc+quant,scaleY:sc+quant},500,createjs.Ease.circInOut).call(GamePlay.torna);
        createjs.Tween.get(corriendo).to({scaleX:sc+quant,scaleY:sc+quant,x:amp/4,y:alt/1.3+quant*200},500,createjs.Ease.circInOut);

        console.log(quant," quant + scY: "+sc);
    };
    this.torna=function(){/// call
        correns=false;
    };

};