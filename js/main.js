
var stage;
var RESOLUTION =2;
var amp;
var alt;
var botBack;

var canvas;
var ampFons;

Main = new function()
{
    this.InitGame = function ()
    {
        console.log("INIT GAME MAIN");

        this.windowResize();
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


/*
esto estaba en this.InitGame

window.requestAnimFrame =  (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 66);
        };
})();*/
