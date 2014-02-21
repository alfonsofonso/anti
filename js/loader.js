
var preload;
var manifest;
var imatges= new Array();

var NUM_IMATGES = 13 ;// --- + NUM_AUDIOS;
var loaded_imatges = 0;
var percent;
var loading;


Loader = new function() {

    this.initLoad = function (){

        stage = new createjs.Stage(document.getElementById("mainCanvas"));
        window.requestAnimFrame =  (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 66);
                };
        })();

        Main.windowResize();


        createjs.Touch.enable(stage);
        createjs.Ticker.setFPS(30);

       // Loader.loadSound(); // or..
        Loader.ponLoading();
        AudioPunk.init();//inicia AudioPunk

    };

    this.ponLoading=function(){

      if(loading==null || loading== undefined ){
          loading=new createjs.Text("loading...", "bold "+Math.abs(80*amp/alt)+"px BoldinaTwo", "#ff0000");

          loading.x=amp/4;
          loading.y=alt/3;
       }
        stage.addChild(loading);
        stage.update();

    };

    this.loadSound = function(){
        if (!createjs.Sound.initializeDefaultPlugins()) {
            //loaded_imatges = NUM_AUDIOS;
            this.reload();
        }
        else
        {
            var assetsPath = "audio/";
            var manifestAudio = [
                //{src:assetsPath+"cagatio.mp3|"+assetsPath+"cagatio.ogg", id:'cagatio'}
            ];

            createjs.Sound.addEventListener("fileload", createjs.proxy(Loader.soundLoaded, Loader)); // add an event listener for when load is completed
            createjs.Sound.registerManifest(manifestAudio);
        }

    };

    this.soundLoaded = function()
    {
        loaded_imatges++;
        if(loaded_imatges == NUM_AUDIOS){
            loaded_imatges=0;
            this.reload();
        }
    };


    // Reset everything ---- load images
    this.reload = function () {
        // If there is an open preload queue, close it.
        if (preload != null){ preload.close(); }
        //
        // Push each item into our manifest
        manifest = [
            //entorn -- 1 imatge
            "menu.jpg",
            "botPause.png",
            "botMute.png",
            "corriendo.png",
            "antiPosturas/dead.png",
            "fons.jpg",
            "splatter.png",
            "casas/lacaca.png",
            "casas/lesvis.png",
            "casas/starfuck.png",
            "casas/edifici1.png",
            "poli/poliSprite.png",
            "iconFB.png"


        ];

        // Create a preloader. There is no manifest added to it up-front, we will add items on-demand.
        //if(RESOLUTION == 1) preload = new createjs.LoadQueue(true, "img_gran/");
        if(RESOLUTION == 2) preload = new createjs.LoadQueue(false, "img_mig/");
       // if(RESOLUTION == 4) preload = new createjs.LoadQueue(true, "img_petit/");

        // Use this instead to use tag loading
        //preload = new createjs.LoadQueue(false);
        preload.addEventListener("fileload", Loader.handleFileLoad);
        preload.addEventListener("progress", Loader.handleOverallProgress);
        preload.addEventListener("fileprogress", Loader.handleFileProgress);
        preload.addEventListener("error",Loader.handleFileError);
        preload.setMaxConnections(500);

        Loader.loadAll();
    };

    this.stop = function () {
        if (preload != null) { preload.close(); }
    };

    this.loadAll = function () {
      //  console.log("loaded images "+manifest.length);
        while (manifest.length > 0) {
            var item = manifest.shift();
            preload.loadFile(item);
            // If we have no more items, disable the UI.
            if (manifest.length == 0) {

            }
        }
    };


    // File complete handler
    this.handleFileLoad = function (event) {

        //console.log("Imatge: "+ event.item.src+" Pujada. ");
        loaded_imatges++;

        switch(event.item.src)
        {

            case "botMute.png": imatges['botMute'] =  event.result;
                break
            case "botPause.png": imatges['botPause'] =  event.result;
                break
            case "antiPosturas/dead.png": imatges['gameOver'] =  event.result;
                break
            case "menu.jpg": imatges['SCREEN_01'] =  event.result;
                //Loader.posaLoader();
                break;
            case "corriendo.png": imatges['corriendoSprite'] =  event.result;
                break;
            case "casas/lacaca.png": imatges['lacaca'] =  event.result;
                break;
            case "casas/lesvis.png": imatges['lesvis'] =  event.result;
                break;
            case "casas/starfuck.png": imatges['starfuck'] =  event.result;
                break;
            case "casas/edifici1.png": imatges['edifici1'] =  event.result;
                break;

            case "splatter.png": imatges['splatter'] =  event.result;
                break;
            case "fons.jpg": imatges['fonsCity'] =  event.result;
                break;
            case "poli/poliSprite.png": imatges['poliSprite'] =  event.result;
                break;
            case "iconFB.png": imatges['iconFB'] =  event.result;
                break;
        }

        //console.log("loaded",loaded_imatges,"num",NUM_IMATGES);
        if( loaded_imatges == NUM_IMATGES )
        {
           stage.removeChild(loading);
           Main.InitGame();
           //stage.removeChild( fons_loader );///////////////////////////////////////////////////////////>>>>>>
           //stage.removeAllChildren();


        }

    };
    // File progress handler
    this.handleFileProgress = function (event) {
        console.log("Imatge: "+ event.item.src+" -  progres: "+ preload.progress );
    };

    // Overall progress handler
    this.handleOverallProgress = function (event) {
    //    percent.text = Math.floor(loaded_imatges*100/NUM_IMATGES)+"%";
       // stage.update();
    };
    // An error happened on a file
    this.handleFileError = function (event) {

        //alert("error"+event.message);
        Loader.initLoad();
        console.log("ERROR!!! = "+event.message);
    }


};//fin loader