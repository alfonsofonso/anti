/**
 User: alfonso
 Data: 3/01/14 , 10:43
 */

Pulso=new function(){

    this.handlerTick =function ()
    {

        if(taping){
            fons.x-=40;
        }
        if(fons.x<-fons.getTransformedBounds().width/3){
           // console.log(fons.getTransformedBounds().width,"es fons.getTrandformedBounds.width",fons.getBounds().width,"es getBounds.width");
            fons.x=0;
        }


        stage.update();

    };
};