
var RESOLUTION =2;
var amp;
var alt;
var botBack;

var canvas;
var ampFons;

var sc;// alt/1024 ipod= 1136 x 640

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

(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = 'visible', h = 'hidden',
            evtMap = {
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
            };

        evt = evt || window.event;
        if (evt.type in evtMap){
            document.body.className = evtMap[evt.type];

        } else{
            document.body.className = this[hidden] ? "hidden" : "visible";

        }
        console.log("sta:", document.body.className);
        if(document.body.className=="hidden"){
            AudioPunk.initializeVars();
            jugando=false;
            Riff.mutea("guitarra");
            Riff.mutea("bajo");
            Riff.idle();
        }else{
            AudioPunk.initializeVars();
            jugando=true;
            Riff.initialRiff();
        }
    }
})();