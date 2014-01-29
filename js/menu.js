/**
alfonsofonso
*/


var stage;

var instr1_1,instr2,instr3,instr4;
var screen01;

Menu=new  function() {



    this.initMenu = function ()///  B A C K    B U T T O N
     {
         if( screen01 == null || screen01 == undefined ) {
             screen01=new createjs.Bitmap(imatges["SCREEN_01"]);
             screen01.addEventListener("click",GamePlay.init);
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