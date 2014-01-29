/**
 User: alfonso
 Data: 29/01/14 , 11:22
 */

var corriendo1,corriendo2,corriendo3,corriendo4;
var anima;
var jugador;

var taping;

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

        if( jugador == null || jugador == undefined ) {// container Jugador
            jugador=new createjs.Container();
        }
        jugador.x=amp/4;
        jugador.y=alt;
        stage.addChild(jugador);

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
        jugador.addChild(anima);
        jugador.y=alt-jugador.getTransformedBounds().height/2;
        jugador.addEventListener("mousedown",GamePlay.downJugador);

    };


    this.downJugador=function(e){//////////////////////////////////    M O U S E D O W N
        // $("#consola").text("amp "+amp+" alt "+alt);
        TocaRiff.corriendo();

        if(!taping){
            anima.gotoAndPlay("correns");
            taping=true;
        }else{
            taping=false;//////////////////////// comentable
        }


        var quant=Math.random()/4;

        createjs.Tween.get(fons).to({scaleX:sc+quant,scaleY:sc+quant},500,createjs.Ease.circInOut).call(GamePlay.torna);
        createjs.Tween.get(jugador).to({scaleX:sc+quant,scaleY:sc+quant,x:amp/4,y:alt/1.3+quant*200},500,createjs.Ease.circInOut);

        //console.log(quant," quant + scY: "+sc);
    };
    this.torna=function(){/// fin traveling fons i jugador
        taping=false;
    };

};