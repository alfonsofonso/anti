
var fons;
var fonsCity, fonsCity2, fonsCity3;

var Fons=new function(){


    this.posaFons=function(){

        if( fons == null || fonsCity == undefined ) {
            fons=new createjs.Container();
        }
        fons.regX=1440;
        fons.regY=512;
        fons.y=alt/2;
        stage.addChild(fons);

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



    }




};