
var RESOLUTION =2;
var amp;
var alt;
var botBack;

var canvas;
var ampFons;

var sc;// alt/1024

Main = new function()
{
    this.InitGame = function ()
    {
        console.log("INIT GAME MAIN + windows resize");
       // Listen for orientation changes
        window.addEventListener("orientationchange",         // Announce the new orientation number
            function() {
                Main.windowResize();

            }, false);

        this.windowResize();
    };


    this.windowResize =function ()
    {
        console.log("windowResize");

        canvas = $("#mainCanvas");
        canvas.css('background-color','black');
        canvas.css('width','100%');
        canvas.css('height','100%');

        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        amp=window.innerWidth;//720//$('#mainCanvas').css('width').substr(0,$('#mainCanvas').css('width').lastIndexOf('px'));
        alt=window.innerHeight;//$('#mainCanvas').css('height').substr(0,$('#mainCanvas').css('height').lastIndexOf('px'));
        sc =   alt/512;
        console.log("sc: ",sc," amp: ",amp);
        if(jugando){
            GamePlay.zoomea();
        }
        stage.update();


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
