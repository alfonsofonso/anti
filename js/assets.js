
var fons;
var fonsCity, fonsCity2, fonsCity3;
var botPause;
var maderos=[];

var Assets=new function(){


    this.posaFons=function(){

        if( fons == null || fonsCity == undefined ) {
            fons=new createjs.Container();
        }
        fons.regX=720;
        fons.regY=256;
        fons.y=alt/2;
        fons.scaleX=fons.scaleY=sc;
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
        Utils.pon(fonsCity2,1440,0, false,  1,  fons);
        Utils.pon(fonsCity3,2880,0, false,  1,  fons);

        fons.cache(0,0,4320,512);


    };

    this.ponJugador=function(){

        if( jugador == null || jugador == undefined ) {// container Jugador
            jugador=new createjs.Container();
        }
        jugador.x=-200;
        stage.addChild(jugador);

        var array_imatges = new createjs.SpriteSheet({ // SpriteSheet jugador
            "animations":
            {
                "correns":{
                    frames: [0,1,4,5],
                    next:"quieto",
                    speed: .4
                },
                "quieto":{
                    frames:[2,6],
                    speed:.1
                },
                "golpeado":{
                    frames:[7],
                    next:"quieto",
                    speed:.2
                }
            },
            "images": [imatges['corriendoSprite']],
            "frames":
            {
                "height": 512,
                "width":512,
                "regX": 256,
                "regY":256,
                "count": 8
            }
        });

        anima = new createjs.Sprite(array_imatges);
        jugador.addChild(anima);
        jugador.y=alt-jugador.getBounds().height/3;
        jugador.addEventListener("mousedown",GamePlay.downJugador);
        createjs.Tween.get(jugador).to({x:amp/4},1800,createjs.Ease.circOut);

    };


    this.ponPoli=function(){

        if(maxPolis<=maderos.length){return}

        var madero;
        if( madero == null || madero == undefined ) {// container Jugador
            madero=new createjs.Container();
        }
        madero.x=amp/4;
        madero.y=alt;
        stage.addChild(madero);
        madero.addEventListener("mousedown",GamePlay.downPoli);

        var array_imatges_poli = new createjs.SpriteSheet({ // SpriteSheet
            "animations":
            {
                "correns":{
                    frames: [0,1,2],
                    next:"correns",
                    speed: .4
                },
                "quieto":{
                    frames:[3]
                }
            },
            "images": [imatges['poliSprite']],
            "frames":
            {
                "height": 512,
                "width":512,
                "regX": 256,
                "regY":256,
                "count": 4
            }
        });

        animaPoli = new createjs.Sprite(array_imatges_poli);
        madero.addChild(animaPoli);
        madero.y=alt-jugador.getTransformedBounds().height/2;
        madero.x=amp;
        animaPoli.gotoAndPlay("correns");
        createjs.Tween.get(madero).to({x:amp/2+Math.random()*50,scaleX:sc/2+zoom,scaleY:sc/2+zoom,y:alt/1.3+zoom*200+Math.random()*30},1000,createjs.Ease.circInOut).call(function(){GamePlay.mamporrear(madero)});//scaleX:sc+zoom, scaleY:sc+zoom,



    };


    this.ponHUB=function(){

        if( botPause == null || botPause == undefined ) {
            botPause=new createjs.Bitmap(imatges["botPause"]);
            botPause.addEventListener("click",AudioPunk.play);
        }
        Utils.pon(botPause,20,20,false,.5);

    };




};