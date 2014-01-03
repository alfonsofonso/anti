/**
alfonsofonso
*/



var corriendo1,corriendo2,corriendo3,corriendo4;
var anima;
var corriendo;
var correns;
var fonsCity, fonsCity2;
var fons;

var instr1_1,instr2,instr3,instr4;

Menu=new  function() {



    this.initMenu = function ()///  B A C K    B U T T O N
     {
       /// listeners
          // Main.windowResize();

         stage = new createjs.Stage(document.getElementById("mainCanvas"));
         createjs.Touch.enable(stage);


         stage.removeAllChildren();
        stage.removeAllEventListeners();

         //////////
        Menu.startMenu();//
    };

    this.startMenu = function()
    {


       //stage.removeChild(percent);

       // amp=stage.width;
        //alt=stage.height;

        $("#mainCanvas").css('background-color','red');
        $("#background").css('background-color','grey');

        createjs.Ticker.addEventListener("tick",Main.handlerTick);
        Menu.posaBotons();
    };


    this.posaBotons=function(){

        stage.removeChild(fons_loader);

        if( fons == null || fonsCity == undefined ) {
            fons=new createjs.Container();
        }
        stage.addChild(fons);

        if( fonsCity == null || fonsCity == undefined ) {
            fonsCity=new createjs.Bitmap(imatges["fonsCity"]);
        }
        if( fonsCity2 == null || fonsCity2 == undefined ) {
            fonsCity2=new createjs.Bitmap(imatges["fonsCity"]);
        }

        altFons=fonsCity2.getTransformedBounds().height;
        ampFons=fonsCity2.getBounds().width;

        Utils.pon(fonsCity,0,altFons/2,true,1,fons);
        Utils.pon(fonsCity2,2880,altFons/2,true,1,fons);




        if( corriendo == null || corriendo == undefined ) {
            corriendo=new createjs.Container();
        }
        corriendo.x=amp/4;

        stage.addChild(corriendo);
        corriendo.y=altFons-256;
       /* if( corriendo1 == null || corriendo1 == undefined ) {
            corriendo1=new createjs.Bitmap(imatges["corriendo1"]);
        }
        if( corriendo2 == null || corriendo2 == undefined ) {
            corriendo2=new createjs.Bitmap(imatges["corriendo2"]);
        }
        if( corriendo3 == null || corriendo3 == undefined ) {
            corriendo3=new createjs.Bitmap(imatges["corriendo3"]);
        }
        if( corriendo4 == null || corriendo4 == undefined ) {
            corriendo4=new createjs.Bitmap(imatges["corriendo4"]);
        }
        corr_arr=[corriendo1,corriendo2,corriendo3,corriendo4];
        */

        var array_imatges = new createjs.SpriteSheet({
            "animations":
            {
                "correns":{
                    frames: [0,1,2,3],
                    next:"saltant",
                    speed:.4

                }//,

               // "saltant":{
                //    frames: [0]

//                }

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


        anima = new createjs.BitmapAnimation(array_imatges);

        // anima.gotoAndPlay("rei1");
       // anima.visible=false;
        corriendo.addChild(anima);



       //Utils.pon(corriendo1,amp/3,0,true,1,corriendo);
        corriendo.addEventListener("mousedown",Menu.downHandler);
        stage.update();
    };

    this.downHandler=function(){
        createjs.Tween.removeAllTweens();
        correns=true;
        var quant=Math.random()*2000;
        anima.gotoAndPlay("correns");
       //corriendo.removeChild(Menu.cambia());

        createjs.Tween.get(fons).to({scaleX:1+quant/1000,scaleY:1+quant/1000,y:-quant},500,createjs.Ease.circInOut).call(Menu.torna);
        createjs.Tween.get(corriendo).to({scaleX:1+quant/1000,scaleY:1+quant/1000},500,createjs.Ease.circInOut);



    };

    this.torna=function(){

        correns=false;

    };




    this.handlerFora = function()
    {
        history.back();
    };

};