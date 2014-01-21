/**
alfonsofonso
*/


var stage;
var corriendo1,corriendo2,corriendo3,corriendo4;
var anima;
var corriendo;
var correns;

var instr1_1,instr2,instr3,instr4;

Menu=new  function() {



    this.initMenu = function ()///  B A C K    B U T T O N
     {
         createjs.Ticker.addEventListener("tick",Pulso.handlerTick);
         Fons.posaFons();
         Menu.posaBotons();

    };



    this.posaBotons=function(){

        Audio.playAudio("audio/pueaghRules.mp3");

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
                    next:"saltant",
                    speed: .4
                },
                "saltant":{
                    frames:[1]
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
        corriendo.addEventListener("mousedown",Menu.downHandler);

    };


    this.downHandler=function(){
       // $("#consola").text("amp "+amp+" alt "+alt);
        createjs.Tween.removeAllTweens();
        anima.gotoAndPlay("correns");
        correns=true;

        var quant=Math.random()/4;

        //createjs.Tween.get(fons).to({scaleX:sc+quant,scaleY:sc+quant},500,createjs.Ease.circInOut).call(Menu.torna);

        createjs.Tween.get(fons).to({scaleX:sc+quant,scaleY:sc+quant},500,createjs.Ease.circInOut).call(Menu.torna);
        createjs.Tween.get(corriendo).to({scaleX:sc+quant,scaleY:sc+quant,y:alt/1.3+quant*200},500,createjs.Ease.circInOut);

        console.log(quant," quant + scY: "+sc);
    };
    this.torna=function(){/// call
        correns=false;
    };




    this.handlerFora = function()
    {
        history.back();
    };

};