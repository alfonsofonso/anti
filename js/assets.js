
var fons;
var fonsCity,fonsCity2;
var paisaje;
var botPause, botMute;
var maderos=[];
var refuerzos=[];
var energy;
var energyCont;
var sangre;
var gameOver;
var casas=["edifici1","lacaca","lesvis","starfuck"];
var casas_arr=[];
var horizonte;

var anchuraFondo;

var Assets=new function(){


    var alturaFondo=512;
    anchuraFondo=1311;

    this.ponFons=function(){// poner


        if( paisaje == null || paisaje == undefined ) {
            paisaje=new createjs.Container();
        }


        if( fonsCity == null || fonsCity == undefined ) {
            fonsCity=new createjs.Bitmap(imatges["fonsCity"]);
        }
        if( fonsCity2 == null || fonsCity2 == undefined ) {
            fonsCity2=new createjs.Bitmap(imatges["fonsCity"]);
        }

        //////              x    y   centered ratio parent
        Utils.pon(fonsCity, 0,0,false,1,paisaje);
        Utils.pon(fonsCity2, anchuraFondo,0,false,1,paisaje);

        paisaje.scaleX=paisaje.scaleY=sc;
        paisaje.regY=alturaFondo/2;
        paisaje.cache(0,0,paisaje.getTransformedBounds().width,paisaje.getTransformedBounds().height);
        stage.addChild(paisaje);

        //createjs.Tween.get(fons,{override:false}).to({scaleX:sc,scaleY:sc},1800,createjs.Ease.circInOut);

    };

    this.ponUrbe=function(){// poner container casas

        horizonte=alt/1.56;

        if( fons == null || fons == undefined ) {
            fons=new createjs.Container();
        }
        //fons.regX=anchuraFondo/2;
        fons.regY=alturaFondo/2;//300;//380;// el horizonte en el png

        fons.y=alt/2.2;
        fons.scaleX=fons.scaleY=sc;
        fons.mouseEnabled=false;
        stage.addChild(fons);
    };


    this.ponCasa=function(cual,equis){

        var _cual=cual||casas[Math.floor(Math.random()*4)];

        var casa=new createjs.Bitmap(imatges[_cual]);/// coje una imagen de casa en array casas

        //casa.scaleX=sc;
        casa.regY=casa.getBounds().height;

        var _equis=equis||casa.getTransformedBounds().width/2;

        Utils.pon( casa , _equis , alturaFondo/1.2 , false,1,fons);

        casas_arr.push(casa);


    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////  J U G A D O R   ////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

       //jugador.scaleX=jugador.scaleY=scPlayer;
        stage.addChild(jugador);

        if(!jugador.hasEventListener("mousedown")){
            jugador.addEventListener("mousedown",TouchEvents.downJugador);
        }
        //createjs.Tween.get(jugador).to({x:amp/2,y:alt/1.3+zoom*200,scaleX:sc/2+zoom,scaleY:sc/2+zoom},1800,createjs.Ease.circOut);

    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////   P O L I C I A   ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    this.ponPoli=function(){

        if(maxPolis<=refuerzos.length+maderos.length){return}

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
        madero.scaleX=minimoZoom+scPlayer;//minimoZoom+zoom/1.3;
        madero.scaleY=minimoZoom+scPlayer;//minimoZoom+zoom/1.3;
        madero.addEventListener("mousedown",TouchEvents.downPoli);
        madero.addChild(animaPoli);
        stage.addChild(madero);

        animaPoli.gotoAndPlay("correns");

        refuerzos.push(madero);
        //{GamePlay.mamporrear(madero)});//
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    this.ponSangre=function(){
        if(sangre==null || sangre==undefined){
            sangre=new createjs.Bitmap(imatges["splatter"]);
            sangre.regX=sangre.regY=480;
            sangre.mouseEnabled=false;
        }
        sangre.x=jugador.x/2;
        sangre.y=jugador.y;

    };

    this.ponGameOver=function(){

        if(gameOver==null||gameOver==undefined){
            gameOver=new createjs.Bitmap(imatges["gameOver"]);
            gameOver.addEventListener("click",GamePlay.topGames);
        }
        Utils.pon(gameOver,amp/2,alt/2,true);

    };




};