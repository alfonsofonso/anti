/**
 User: alfonso
 Data: 3/01/14 , 10:43
 */
var velPoli=2;
var funciones=[];

Pulso = new function(){


    this.handlerTick =function ()
    {


        for(var f=0;f<funciones.length;f++){
            funciones[f]();
        }

        stage.update();

    };

    this.jugando=function(){

        if(taping){
            fons.x-=20;
        }
        energia--;
        if(fons.x<-1700*fons.scaleX){// loopear fondo
            // console.log(fons.getTransformedBounds().width,"es fons.getTrandformedBounds.width",fons.getBounds().width,"es getBounds.width");
            fons.x=0;
        }

        for(var i=maderos.length-1;i>=0;i--){

            console.log(" vuela");
            energia-=40;

            TouchEvents.downPoli(maderos[i]);
            if(!taping){  /// está peleando
                energia-=30;
                anima.gotoAndPlay("golpeado");
                createjs.Tween.get(jugador).to({x: 10},350,createjs.Ease.circOut).call(TouchEvents.torna);

            }
            // }// fin if madero cerca
        }// fin recorrer array maderos

        energy.graphics.clear();
        energy.graphics.beginFill("#ee0000").drawRect(0,0, energia, 200);
        energyCont.cache(0, 0, rage.image.width, rage.image.height);

        if(energia<1){
            GamePlay.muerte();
            energy.graphics.clear();
        }

    };

    this.tomaEnergia=function(){
        energia++;
        energy.graphics.clear();
        energy.graphics.beginFill("#ee0000").drawRect(0,0, energia, 200);
        energyCont.cache(0, 0, rage.image.width, rage.image.height);
    };



};

