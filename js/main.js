
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
        console.log("INIT GAME MAIN + windows resize");
       // Listen for orientation changes
        window.addEventListener("orientationchange",         // Announce the new orientation number
            function() { Main.windowResize();}, false);

        this.windowResize();
    };

    this.windowResize =function ()
    {
        console.log("windowResize");

        $("#background").css('width','100%');
        $("#background").css('heigth','100%');
        $("#background").css('background-color','red');

        canvas = $("#mainCanvas");
        canvas.css('background-color','grey');
        //  canvas.css('width','100%')
        //canvas.css('height','100%');

        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
       // Main.InitGame();
//Menu.initMenu();
        //ratio =   960/1440;
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
