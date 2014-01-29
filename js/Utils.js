/**
 User: alfonso
 Data: 2/11/13 , 10:33
 */
var localDades;


Utils=new function(){

    this.pon=function(obj,ix,ig,centered,r,father){// objeto, x, y, centered, scale, pare

        /// defaults
        r=r||1;
        centered = centered || false;
        father = father||stage;

        //var nom=obj.image.src.substr(obj.image.src.lastIndexOf(".png")-12,obj.image.src.lastIndexOf(".png"));
        //obj.name=nom;
       // obj.name=obj.image.src;
        obj.alpha=1;
        /// scaling
        obj.scaleX = r;
        obj.scaleY = r;

        // positioning
        if(centered){

            obj.regX=obj.getTransformedBounds().width/(r*2);// instead of normal getTransformedBounds?
            obj.regY=obj.getTransformedBounds().height/(r*2);
        }
        obj.x=ix;
        obj.y=ig;

        // cachis
        obj.cache(0, 0,obj.getBounds().width,obj.getBounds().height);

        // adding
        father.addChild(obj);


    };


    this.dist=function(x1,y1,x2,y2){

        var c1=Math.abs(x1-x2);
        var c2=Math.abs(y1-y2);

        return Math.sqrt(c1*c1+c2*c2);

    };

    this.rad2deg=function(radians)
    {
        degrees = 360 * radians/(2 * Math.PI);
        return degrees;
    };

    this.shuffle=function(array) {
        var currentIndex = array.length
            , temporaryValue
            , randomIndex
            ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }




    this.apuntaPunt=function(){
        var nom="mi variable";
        localDades=localDades||window.localStorage
        var valor=localDades.getItem(nom);

        valor=parseInt(valor);
        valor++;
        console.log("valor: ",valor," en ",nom);
        localDades.setItem(nom,valor);

    };

};