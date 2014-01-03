
var stage;
var RESOLUTION =2;
var amp;
var alt;
var botBack;
var localDades;

var canvas;
var ampFons;

Main = new function()
{
    this.InitGame = function ()
    {
        console.log("INIT GAME MAIN");

        window.requestAnimFrame =  (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 66);
                };
        })();

        this.windowResize();

       // createjs.Ticker.addEventListener("tick", Main.handlerTick);
        createjs.Ticker.setFPS(20);
        //console.log("localDades first "+localDades);
        //localDades=localDades||window.localStorage;////////// inicio localDades
        //console.log("localDades after "+localDades+ " item "+localDades.getItem("puntuacioJoc1"));

       /* if(localDades.getItem("puntuacioJoc1")==undefined || localDades.getItem("puntuacioJoc1")==null){
            console.log("localDades==null, inicialitzo");

            window.localStorage.clear();

            localDades=window.localStorage;
            localDades.setItem("puntuacioJoc1",0);
            localDades.setItem("puntuacioJoc2",0);
            localDades.setItem("puntuacioJoc3",0);
            localDades.setItem("puntuacioJoc4",0);

            console.log("localDades initiated "+localDades);*/
        //}


    };

    this.handlerTick =function ()
    {


 //       coriendoFons1.y=alt-coriendo1.getTransformedBounds().2eight/4;

        if(correns){
        fonsCity.x-=40;
        fonsCity2.x-=40;
        }

      //  var altFons=fonsCity2.getTransformedBounds().height;

        if(fonsCity.x<-ampFons){
            fonsCity.x=fonsCity2.x+ampFons;

        }
        if(fonsCity2.x<-ampFons){
            fonsCity2.x=fonsCity.x+ampFons;

        }

         stage.update();

    };

    this.apuntaPunt=function(){
        var nom="mi variable";
        var valor=localDades.getItem(nom);

        valor=parseInt(valor);
        valor++;
        console.log("valor: ",valor," en ",nom);
        localDades.setItem(nom,valor);

    };

    this.windowResize =function ()
    {
        console.log("windowResize");
        $("#background").css('width','100%');
        $("#background").css('heigth','100%');

        canvas = $("#mainCanvas");
      //  canvas.css('width','100%');
       canvas.css('height','100%');

        //ratio =   960/1440;

        console.log(" height: ",canvas.css("height"));

    };


};

window.addEventListener('resize', Main.windowResize, false);

