/**
alfonsofonso
*/


var stage;

var instr1_1,instr2,instr3,instr4;
var screen01;

Menu=new  function() {



    this.initMenu = function ()///   P O R T A D A   Y   P O N E R     P L A Y    B U T T O N
     {
         if( screen01 == null || screen01 == undefined ) {
             screen01=new createjs.Bitmap(imatges["SCREEN_01"]);
             screen01.addEventListener("click",function(){GamePlay.init();AudioPunk.init()});
         }

         screen01.scaleX=screen01.scaleY=amp/1272;
         stage.addChild(screen01);

         stage.update();

    };



    this.handlerFora = function()
    {
        history.back();
    };

};