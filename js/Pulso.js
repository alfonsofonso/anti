/**
 User: alfonso
 Data: 3/01/14 , 10:43
 */

Pulso = new function(){

    this.handlerTick =function ()
    {

        if(taping){
            fons.x-=40;
        }

        if(fons!=undefined && fons.x<-1420){
           // console.log(fons.getTransformedBounds().width,"es fons.getTrandformedBounds.width",fons.getBounds().width,"es getBounds.width");
            fons.x=0;
        }

        for(var i=0;i<refuerzos.length;i++){
            if(refuerzos[i].x>=jugador.x+200*sc){
                refuerzos[i].x-=10;
            }else{
                maderos.push(refuerzos[i]);
                refuerzos.splice(i,1);
            }

        }


        stage.update();

    };
};