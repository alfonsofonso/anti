/**
alfonsofonso
*/


var stage;

var instr1_1,instr2,instr3,instr4;
var screen01;

Menu=new  function() {



    this.initMenu = function ()///   P O R T A D A   Y   P O N E R     P L A Y    B U T T O N
     {
         console.log("INIT MENU");
         if( screen01 == null || screen01 == undefined ) {
             screen01=new createjs.Bitmap(imatges["SCREEN_01"]);

             screen01.regY=400;
         }

         //screen01.scaleX=screen01.scaleY=amp/1272;

         if (amp<alt){
             Utils.pon(screen01,amp/2,alt/2,true,alt/800);
         }else{
             Utils.pon(screen01,amp/2,alt/2,true,amp/800);
         }

         Assets.ponJugador();
         anima.gotoAndPlay("quieto");

         jugador.scaleX=jugador.scaleY=.5;
         jugador.x=amp/1.6;
         jugador.y=alt/1.3;
         stage.addEventListener("click",function(){  Main.toggleFullScreen();GamePlay.init();});
         createjs.Ticker.addEventListener("tick",Pulso.handlerTick);

    };


    this.handlerFora = function()
    {
        history.back();
    };

};