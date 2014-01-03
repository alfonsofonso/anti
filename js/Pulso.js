/**
 User: alfonso
 Data: 3/01/14 , 10:43
 */

Pulso=new function(){

    this.handlerTick =function ()
    {

        if(correns){
            fonsCity.x-=40;
            fonsCity2.x-=40;

            if(fonsCity.x<-ampFons){
                fonsCity.x=fonsCity2.x+ampFons;

            }
            if(fonsCity2.x<-ampFons){
                fonsCity2.x=fonsCity.x+ampFons;

            }
        }



        stage.update();

    };
}