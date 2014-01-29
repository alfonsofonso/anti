
var fons;
var fonsCity, fonsCity2, fonsCity3;
var botPause;

var Assets=new function(){


    this.posaFons=function(){

        if( fons == null || fonsCity == undefined ) {
            fons=new createjs.Container();
        }
        fons.regX=1440;
        fons.regY=512;
        fons.y=alt/2;
        stage.addChild(fons);
        fons.mouseEnabled=false;

        if( fonsCity == null || fonsCity == undefined ) {
            fonsCity=new createjs.Bitmap(imatges["fonsCity"]);
        }
        if( fonsCity2 == null || fonsCity2 == undefined ) {
            fonsCity2=new createjs.Bitmap(imatges["fonsCity"]);
        }
        if( fonsCity3 == null || fonsCity3 == undefined ) {
            fonsCity3=new createjs.Bitmap(imatges["fonsCity"]);
        }

        //////              x    y   centered ratio parent
        Utils.pon(fonsCity, 0,   0, false,  1,  fons);
        Utils.pon(fonsCity2,2880,0, false,  1,  fons);
        Utils.pon(fonsCity3,5760,0, false,  1,  fons);



    };

    this.ponJugador=function(){



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

    this.ponHUB=function(){

        if( botPause == null || botPause == undefined ) {
            botPause=new createjs.Bitmap(imatges["botPause"]);
            botPause.addEventListener("click",AudioPunk.play);
        }
        Utils.pon(botPause,20,20,false,.5);

    };




};