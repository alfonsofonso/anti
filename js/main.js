
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
        Menu.initMenu();
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

    this.toggleFullScreen=function() {
        if(navigator.userAgent.indexOf("Apple")!=-1){return}
        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            requestFullScreen.call(docEl);
            console.log("llamo fullscreen")
        }
        else {
            cancelFullScreen.call(doc);
        }
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
