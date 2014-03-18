/**
 User: alfonso
 Data: 3/01/14 , 10:43
 */
var velPoli=2;
var funciones=[];
var zoom;
var cuantoZoom;
var prevZoom=1;


Pulso = new function(){


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





};

