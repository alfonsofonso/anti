
var fons,fons2;
var fonsCity,fonsCity2,fonsCity3;
var paisaje;
var botPause, botMute;

var energy;
var energyCont;
var sangre;
var blancote;
var gameOver;
var casas=["edifici1","lacaca","lesvis","starfuck","muro"];
var casas_arr=[];
var horizonte;
var puntext;
var anchuraFondo;
var metros;
var iconFB;
var playAgain;
var rage;



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
        if( fonsCity3 == null || fonsCity3 == undefined ) {
            fonsCity3=new createjs.Bitmap(imatges["fonsCity"]);
        }

        //////              x    y   centered ratio parent
        Utils.pon(fonsCity, 0,0,false,1,paisaje);
        Utils.pon(fonsCity2, anchuraFondo,0,false,1,paisaje);
        Utils.pon(fonsCity3, anchuraFondo*2,0,false,1,paisaje);

        paisaje.scaleX=paisaje.scaleY=sc;
        paisaje.regY=alturaFondo/2;
     //   paisaje.cache(0,0,paisaje.getTransformedBounds().width,paisaje.getTransformedBounds().height);
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

        //fons.y=0;//alt/2.2;
        fons.scaleX=fons.scaleY=sc;
        fons.mouseEnabled=false;
        stage.addChild(fons);


    };


    this.ponCasa=function(cual,equis){

        var _cual=cual||casas[Math.floor(Math.random()*4)];

        var casa=new createjs.Bitmap(imatges[_cual]);/// coje una imagen de casa en array casas
        casa.cache(0,0,casa.getBounds().width,casa.getBounds().height);
        //casa.scaleX=sc;
        casa.regY=casa.getBounds().height;

        var _equis=equis||casa.getTransformedBounds().width/2;
        casa.x=_equis;
        casa.y=alturaFondo/1.2;
        fons.addChild(casa);
        //Utils.pon( casa , _equis , alturaFondo/1.2 , false,1,fons);

        casas_arr.push(casa);

    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////  J U G A D O R   ////////////////////////////////////////////////////
    //////////////////////////////////////////////// poner solo touch al jugador no a los polis !!! ////////////////////////////

    this.ponJugador=function(){

        if( jugador == null || jugador == undefined ) {// container Jugador
            jugador=new createjs.Container();
        }

        var array_imatges = new createjs.SpriteSheet({ // SpriteSheet jugador
            "animations":
            {
                "correns":{
                    frames: [0,1,4,5],
                    next:"correns",
                    speed: .3
                },
                "quieto":{
                    frames:[2,6],
                    speed:.1,
                    next:"quieto"
                },
                "golpeado":{
                    frames:[7],
                    next:"quieto",
                    speed:.2
                },
                "empujando":{
                    frames:[7],
                    next:"corriendo",
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



        //createjs.Tween.get(jugador).to({x:amp/2,y:alt/1.3+zoom*200,scaleX:sc/2+zoom,scaleY:sc/2+zoom},1800,createjs.Ease.circOut);

    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////   P O L I C I A   ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    this.creaPoli=function(){

        var  madero=new createjs.Container();

        var array_imatges_poli = new createjs.SpriteSheet({ // SpriteSheet
            "animations":   {
                "correns":{ frames: [0,1,2], next:"correns", speed: .4 },
                "quieto": { frames:[3] },
                "parao":{frames:[0],next:"parao"}
            },
            "images":       [imatges['poliSprite']],
            "frames":       { "height": 512, "width":512, "regX": 256, "regY":256, "count": 4 }
        });

        animaPoli = new createjs.Sprite(array_imatges_poli);

        madero.y=jugador.y;
        madero.x=amp;
        madero.scaleX=madero.scaleY=minimoZoom + zoom *sc;
        //madero.addEventListener("mousedown",TouchEvents.downPoli);
        madero.addChild(animaPoli);


        animaPoli.gotoAndPlay("correns");
        stage.addChild(madero);
        createjs.Tween.get(madero,{override:true}).to({x:amp/3 },1200,createjs.Ease.circIn).call(function(){Assets.ponPoli(madero)});
        refuerzos.push(madero);
    };
    this.ponPoli=function(m){
        
        maderos.push(m);

    };
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.ponHUB=function(){



        if( botPause == null || botPause == undefined ) { /////////////////   boton Pause
            botPause=new createjs.Bitmap(imatges["botPause"]);
            botPause.addEventListener("click",TouchEvents.pausePlay);
        }
       // Utils.pon(botPause,10,50,false,.4);

        if( botMute == null || botMute == undefined ) {/////////////////////   boton Mute
            botMute=new createjs.Bitmap(imatges["botMute"]);
            botMute.addEventListener("click",AudioPunk.muteUnmute);
        }
        //Utils.pon(botMute,10,110,false,.4);

        if( energyCont == null || energyCont == undefined ) {///////////////////   barra de energia
            energyCont=new createjs.Container();
            energyCont.x=10;
            energyCont.y=10;
        }
        if( energy == null || energy == undefined ) {
            energy=new createjs.Shape();

        }
        energy.graphics.clear();
        energy.graphics.beginFill("#ee0000").drawRect(0,0, 160, 100);
        energyCont.addChild(energy);
        stage.addChild(energyCont);

        if( rage == null || rage == undefined ) {///////////////////   barra de energia
            rage=new createjs.Bitmap(imatges["rage"]);
            rage.x=10;
            rage.y=10;
        }

        //stage.addChild(rage);
        var amf = new createjs.AlphaMaskFilter(rage.image);
        energyCont.filters = [amf];
        energyCont.scaleX=energyCont.scaleY=(amp-40)/rage.image.width;
        energyCont.cache(0, 0, rage.image.width, rage.image.height);

        if(metros==null || metros== undefined ){///////////////////////  contador metros
            metros=new createjs.Text("0", "bold "+Math.abs(50*sc)+"px BoldinaTwo", "#ffffff");
            metros.y=alt-60*sc;
        }
        metros.text="";
        metros.x=amp/1.3;
        stage.addChild(metros);


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

    this.muestraSangre=function(){

        blancote.visible=true;
        setTimeout(Assets.ocultaSangre,30);
        stage.update();

    };
    this.ocultaSangre=function(){
       blancote.visible=false;
    };


    this.ponGameOver=function(){
                                                /// angelito
        if(gameOver==null||gameOver==undefined){
            gameOver=new createjs.Bitmap(imatges["gameOver"]);

        }
        Utils.pon(gameOver,amp/2,alt/2,true,sc);

        stage.addChild(metros);
                                          // puntos
        if(puntext==null || puntext== undefined ){
            puntext=new createjs.Text("0", "bold "+Math.abs(50*sc)+"px BoldinaTwo", "#eeeeee");
            puntext.x=20;
            puntext.y=80*sc;
        }
        puntext.text="record: "+localDades.getItem("miRecord")+" m.";//toques*5+" m.\n

        stage.addChild(puntext);


        if(playAgain==null || playAgain== undefined ){
            playAgain=new createjs.Text("play", "bold "+Math.abs(80*sc)+"px BoldinaTwo", "#eeeeee");
            playAgain.x=20;
            playAgain.y=alt/1.3;
            playAgain.addEventListener("click",GamePlay.topGames);
        }
        playAgain.text="play";//toques*5+" m.\n

        stage.addChild(playAgain);

                                                            /// fb
        if(iconFB==null||iconFB==undefined){
            iconFB=new createjs.Bitmap(imatges["iconFB"]);
            //iconFB.addEventListener("click",GamePlay.facebook);
        }
        //Utils.pon(iconFB,amp/1.5,alt/3,false);

        maderos=[];


        clearInterval(timerPonPoli);
    };




};