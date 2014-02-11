
var fons;
var fonsCity, fonsCity2, fonsCity3;
var botPause, botMute;
var maderos=[];
var refuerzos=[];
var energy;
var energyCont;
var sangre;
var gameOver;

var Assets=new function(){


    this.ponFons=function(){

        if( fons == null || fonsCity == undefined ) {
            fons=new createjs.Container();
        }
        fons.regX=720;
        fons.regY=300;//380;// el horizonte en el png
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
        createjs.Tween.get(fons,{override:false}).to({scaleX:sc,scaleY:sc},1800,createjs.Ease.circInOut);

    };


    this.ponJugador=function(){

        if( jugador == null || jugador == undefined ) {// container Jugador
            jugador=new createjs.Container();
        }

        var array_imatges = new createjs.SpriteSheet({ // SpriteSheet jugador
            "animations":
            {
                "correns":{
                    frames: [0,1,4,5],
                    next:"quieto",
                    speed: .3
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
        if(anima==null || anima==undefined){
            anima = new createjs.Sprite(array_imatges);
        }
        //jugador.regX=jugador.regY=256;
        jugador.addChild(anima);

        jugador.x=amp/1.6;
        jugador.y=alt/1.3;//alt-jugador.getBounds().height/3;

        //jugador.scaleX=jugador.scaleY=2;
        stage.addChild(jugador);

        if(!jugador.hasEventListener("mousedown")){
            jugador.addEventListener("mousedown",TouchEvents.downJugador);
        }
        //createjs.Tween.get(jugador).to({x:amp/2,y:alt/1.3+zoom*200,scaleX:sc/2+zoom,scaleY:sc/2+zoom},1800,createjs.Ease.circOut);

    };


    this.ponPoli=function(){

        if(maxPolis<=maderos.length){return}

        console.log("pongo poli, minZum",minimoZoom,"zoom",zoom);
        var madero;
        if( madero == null || madero == undefined ) {// container Jugador
            madero=new createjs.Container();
        }

        var array_imatges_poli = new createjs.SpriteSheet({ // SpriteSheet
            "animations":   {
                "correns":{ frames: [0,1,2], next:"correns", speed: .4 },
                "quieto": { frames:[3] }
            },
            "images":       [imatges['poliSprite']],
            "frames":       { "height": 512, "width":512, "regX": 256, "regY":256, "count": 4 }
        });

        animaPoli = new createjs.Sprite(array_imatges_poli);

        madero.y=jugador.y;
        madero.x=amp;
        madero.scaleX=minimoZoom+zoom/1.3;
        madero.scaleY=minimoZoom+zoom/1.3;
        madero.addEventListener("mousedown",TouchEvents.downPoli);
        madero.addChild(animaPoli);
        stage.addChild(madero);

        animaPoli.gotoAndPlay("correns");

       refuerzos.push(madero);
        //{GamePlay.mamporrear(madero)});//
    };

    this.ponSangre=function(){
        if(sangre==null || sangre==undefined){
            sangre=new createjs.Bitmap(imatges["splatter"]);
            sangre.regX=sangre.regY=480;
            sangre.mouseEnabled=false;
        }
        sangre.x=jugador.x/2;
        sangre.y=jugador.y;

    };

    this.ponHUB=function(){

        if( botPause == null || botPause == undefined ) { /////////////////   boton Pause
            botPause=new createjs.Bitmap(imatges["botPause"]);
            botPause.addEventListener("click",TouchEvents.playStop);
        }
        Utils.pon(botPause,10,50,false,.4);

        if( botMute == null || botMute == undefined ) {/////////////////////   boton Mute
            botMute=new createjs.Bitmap(imatges["botMute"]);
            botMute.addEventListener("click",AudioPunk.playStop);
        }
        Utils.pon(botMute,10,110,false,.4);

        if( energyCont == null || energyCont == undefined ) {///////////////////   barra de energia
            energyCont=new createjs.Container();
            energyCont.x=10;
            energyCont.y=10;
        }
        if( energy == null || energy == undefined ) {
            energy=new createjs.Shape();

            energy.alpha=.8;
        }
        energy.graphics.beginFill("#ff0000").drawRect(0,0, 200, 30);
        energyCont.addChild(energy);
        stage.addChild(energyCont);

    };

    this.ponGameOver=function(){

        if(gameOver==null||gameOver==undefined){
            gameOver=new createjs.Bitmap(imatges["gameOver"]);
            gameOver.addEventListener("click",GamePlay.topGames);
        }
        Utils.pon(gameOver,amp/2,alt/2,true);

    };




};