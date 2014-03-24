/**
 User: alfonso
 Data: 3/01/14 , 10:43
 */
var velPoli=2;
var funciones=[];
var skate;
var colors;
var colorSpray;
var mascaraPared;

Pulso = new function(){

    this.zoom;


    this.handlerTick =function ()
    {

        for(var f=0;f<funciones.length;f++){
            funciones[f]();
        }

        stage.update();

    };

    this.jugando=function(){

        //if(taping){/////////////////////////// fondo

        fons.regX+=20;
        //fons.x-=10;
        //}

        if(fons.regX>anchuraFondo){// loopear
            // console.log(fons.getTransformedBounds().width,"es fons.getTrandformedBounds.width",fons.getBounds().width,"es getBounds.width");
            console.log(fons.x,fons.regX,fons.getTransformedBounds().width);
            fons.regX=0;
            //fons.x=0;
        }

        for(var i=maderos.length-1;i>=0;i--){// recorrer array polis

            console.log(" vuela");
            energia-=40;

            TouchEvents.downPoli(maderos[i]);

            if(!taping){  /// está peleando
                console.log("golpeado");
                energia-=30;
                anima.gotoAndPlay("golpeado");
                TweenMax.to(jugador,.35,{x: amp/4,ease:Power2.easeOut,yoyo:true,repeat:1,onComplete:TouchEvents.torna});

            }
            // }// fin if madero cerca
        }// fin recorrer array maderos

        for(var r=refuerzos.length-1;r>=0;r--){// recorrer array refuerzos

            if(Math.abs(refuerzos[r].x-jugador.x)<140){
                TouchEvents.downPoli(refuerzos[r]);
                energia-=10;
                if(!taping){  /// está peleando
                    console.log("golpeado");
                    energia-=30;
                    anima.gotoAndPlay("golpeado");
                    TweenMax.to(jugador,.35,{x: amp/4,ease:Power2.easeOut,yoyo:true,repeat:1,onComplete:TouchEvents.torna});

                }
            }
            // }// fin if madero cerca
        }// fin refuerzos

        energy.graphics.clear();/////          barra energeetica
        energy.graphics.beginFill("#ee0000").drawRect(0,0, energia, 200);
        energyCont.cache(0, 0, rage.image.width, rage.image.height);

        if(energia<1){
            GamePlay.muerte();
            energy.graphics.clear();
        }
        else if(toques>1000){
            stage.removeEventListener("stagemousedown",TouchEvents.downJugador);

            setTimeout(function(){
                funciones.splice(funciones.indexOf(Pulso.jugando),1);
                Pulso.pintando();
            },2000);

            clearInterval(timerPonPoli);
        }

    };


    this.tomaEnergia=function(){
        if(energia<500){
            energia+=12;
        }
        energy.graphics.clear();
        energy.graphics.beginFill("#ee0000").drawRect(0,0, energia, 200);
        energyCont.cache(0, 0, rage.image.width, rage.image.height);

        if (funciones.indexOf(Pulso.jugando)!=-1){funciones.splice(Pulso.tomaEnergia,1)}

    };


    this.pintando=function(){



        if(skate==null && skate== undefined){
            skate=new createjs.Bitmap(imatges["skate"]);
            stage.addChild(skate);
            skate.x=amp-200;
            skate.y=alt/2;


        }
        stage.addEventListener("stagemousedown",Pulso.dibujar);
        //skate.on("click",function(){funciones.push(Pulso.pinta)},this,true);
        stage.addEventListener("stagemouseup",Pulso.pararDePintar);
        anima.gotoAndPlay("quieto");

    };

    this.dibujar=function(e){
        colors = ["#828b20", "#b0ac31", "#cbc53d", "#fad779", "#f9e4ad", "#faf2db", "#563512", "#9b4a0b", "#d36600", "#fe8a00", "#f9a71f"];


            //if (stage.contains(title)) { stage.clear(); stage.removeChild(title); }
            colorSpray = colors[Math.floor(Math.random()*colors.length)];
            stroke = Math.random()*30 + 10 | 0;
            oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
            oldMidPt = oldPt;
            stage.addEventListener("stagemousemove" , Pulso.garabatear);
    };

    this.garabatear=function(event) {
        var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);
       mascaraPared=new createjs.Container();
        var drawingCanvas = new createjs.Shape();
        mascaraPared.addChild(drawingCanvas);
        stage.addChild(mascaraPared);
        drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(colorSpray).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

        oldPt.x = stage.mouseX;
        oldPt.y = stage.mouseY;

        oldMidPt.x = midPt.x;
        oldMidPt.y = midPt.y;

        //    stage.update();

        var amf = new createjs.AlphaMaskFilter(fons.children[2].image);
        drawingCanvas.filters = [amf];
        drawingCanvas.cache(0,0,amp,alt);
    };

     this.pararDePintar=function(event) {
            stage.removeEventListener("stagemousemove" , Pulso.garabatear);

     };


};

