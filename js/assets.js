
var fons;
var fonsCity, fonsCity2, fonsCity3;
var botPause;
var maderos=[];
var sangre;

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
        createjs.Tween.get(fons,{override:false}).to({scaleX:sc+zoom,scaleY:sc+zoom},1800,createjs.Ease.circInOut).call(GamePlay.torna);

    };


    this.ponJugador=function(){

        if( jugador == null || jugador == undefined ) {// container Jugador
            jugador=new createjs.Container();
        }
        jugador.x=0;
        jugador.scaleX=jugador.scaleY=2;
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
        createjs.Tween.get(jugador).to({x:amp/4,y:alt/1.3+zoom*200,scaleX:sc/2+zoom,scaleY:sc/2+zoom},1800,createjs.Ease.circOut);

    };


    this.ponPoli=function(){

        if(maxPolis<=maderos.length){return}

        var madero;
        if( madero == null || madero == undefined ) {// container Jugador
            madero=new createjs.Container();
        }

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

       // madero.y=alt;
        madero.y=alt-jugador.getTransformedBounds().height/2;
        madero.x=amp;
        madero.addEventListener("mousedown",GamePlay.downPoli);
        madero.addChild(animaPoli);
        stage.addChild(madero);

        animaPoli.gotoAndPlay("correns");

        createjs.Tween.get(madero).to({
            scaleX:sc/2+zoom,
            scaleY:sc/2+zoom,
            x:jugador.x+200*sc,
            y:alt/1.3+zoom*200+Math.random()*30},
            1000,createjs.Ease.circInOut).call(function(){GamePlay.mamporrear(madero)});//scaleX:sc+zoom, scaleY:sc+zoom,


    };

    this.ponSangre=function(){
        if(sangre==null || sangre==undefined){
            sangre=new createjs.Bitmap(imatges["splatter"]);
            sangre.regX=sangre.regY=480;
            sangre.mouseEnabled=false;
        }
        sangre.x=-jugador.x+150*sc;
        sangre.y=jugador.y;

    };

    this.ponHUB=function(){

        if( botPause == null || botPause == undefined ) {
            botPause=new createjs.Bitmap(imatges["botPause"]);
            botPause.addEventListener("click",AudioPunk.play);
        }
        Utils.pon(botPause,20,20,false,.5);

    };




};