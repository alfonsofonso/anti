/**
 User: alfonso
 Data: 6/11/13 , 9:00
 */


var puntsR;//pals
var puntsS;//gol
var puntsCricket;//puntuacio
var radio;
var dist;
var textPunts;
var apuntaX,apuntaY;
var golsFicats;

Joc2=new function(){

    var terreny;
    var canal0,canal1,canal2,canal3,canal4,canal5;
    var canals;
    var disposicions;
    var disposicio1, disposicio2, disposicio3;
    var dispNum;
    var linia;
    var tocant;
    var tret;
    var velx,vely;
    var voraDreta,voraEsquerra,voraDalt,voraBaix;


    var pal, palN,palNO,palNE,palS,palSO,palSE,palE,palO;
    var gols;
    var passats;
    var copsMax; /// a la partida actual

    var cops;
    var malJoc2;
    var beJoc2;
    var malls_arr;
     ///puntuacio global
    var puntsPremi;// punts per guanyar el codi

    var modulo;
    var rebotant;
    var prevVely;
    var golsPassats;

    this.init=function(){   /////  CRICKET

        // listeners
      //  createjs.Ticker.removeAllEventListeners("tick");
        createjs.Ticker.addEventListener("tick",Joc2.handlerTick);

        stage.addEventListener("stagemousedown",Joc2.toc);
        stage.addEventListener("stagemouseup",Joc2.dixa);
        //
        disposicio1=[[150,195],[300,195],[450,195],[150,600],[300,600],[450,600],[600,430]];// en linea 3 i 3
        disposicio2=[[180,135],[420,135],[120,315],[510,315],[180,625],[450,625],[450,875]];
        disposicio3=[[354,190],[227,327],[531,327],[227,556],[531,556],[150,736],[450,832]];
        disposicions=[disposicio1,disposicio2,disposicio3];

        Joc2.posaCamp();
        Joc2.posaBack();
    };


    this.posaCamp=function(){

        dispNum=Math.floor(Math.random()*disposicions.length);
        var disp=disposicions[dispNum];//;posicions del arcs

        terreny=new createjs.Bitmap(imatges['terreny']);
        Utils.pon(terreny,0,0,false);
     // bola
        bola=new createjs.Bitmap(imatges['bola']);
        Utils.pon(bola,disp[6][0],disp[6][1],true);
    // canals
        canal0=new createjs.Bitmap(imatges['canal0']);
        Utils.pon(canal0,disp[0][0],disp[0][1],false);
        canal0.alpha=1;
        canal1=new createjs.Bitmap(imatges['canal1']);
        Utils.pon(canal1,disp[1][0],disp[1][1],false);
        canal1.alpha=1;
        canal2=new createjs.Bitmap(imatges['canal2']);
        Utils.pon(canal2,disp[2][0],disp[2][1],false);
        canal2.alpha=1;
        canal3=new createjs.Bitmap(imatges['canal3']);
        Utils.pon(canal3,disp[3][0],disp[3][1],false);
        canal3.alpha=1;
        canal4=new createjs.Bitmap(imatges['canal4']);
        Utils.pon(canal4,disp[4][0],disp[4][1],false);
        canal4.alpha=1;
        canal5=new createjs.Bitmap(imatges['canal0']);
        Utils.pon(canal5,disp[5][0],disp[5][1],false);
        canal5.alpha=1;
        canals=[canal0,canal1,canal2,canal3,canal4,canal5];

        tret=false;
        velx=0.1;
        vely=0.1;
        apuntaX=0;
        apuntaY=0;
        voraDreta=644;
        voraEsquerra=76;
        voraDalt=90;
        voraBaix=984;
        radio=33;

        puntsR=[{x:canal0.x+4,y:canal0.y+canal0.getTransformedBounds().height-radio *.7},//x +3
            {x:canal0.x+canal0.getBounds().width-3,y:canal0.y+canal0.getTransformedBounds().height-radio *.7},//x -1
            {x:canal1.x+4,y:canal1.y+canal1.getTransformedBounds().height-radio *.7},
            {x:canal1.x+canal1.getBounds().width-3,y:canal1.y+canal1.getTransformedBounds().height-radio *.7},
            {x:canal2.x+4,y:canal2.y+canal2.getTransformedBounds().height-radio *.7},
            {x:canal2.x+canal2.getBounds().width-3,y:canal2.y+canal2.getTransformedBounds().height-radio *.7},
            {x:canal3.x+4,y:canal3.y+canal3.getTransformedBounds().height-radio *.7},
            {x:canal3.x+canal3.getBounds().width-3,y:canal3.y+canal3.getTransformedBounds().height-radio *.7},
            {x:canal4.x+4,y:canal4.y+canal4.getTransformedBounds().height-radio *.7},
            {x:canal4.x+canal4.getBounds().width-3,y:canal4.y+canal4.getTransformedBounds().height-radio *.7},
            {x:canal5.x+4,y:canal5.y+canal5.getTransformedBounds().height-radio *.7},
            {x:canal5.x+canal5.getBounds().width-3,y:canal5.y+canal5.getTransformedBounds().height-radio *.7}
        ];

        for(var p= 0;p<puntsR.length;p++){

            var ggg = new createjs.Graphics();
            ggg.setStrokeStyle(1);
            ggg.beginStroke("#aaa");
            ggg.beginFill("#fff");
            ggg.drawCircle(puntsR[p].x, puntsR[p].y, 2);
            puntgg = new createjs.Shape(ggg);
            puntgg.regX=1;
            puntgg.regY=1;
            //stage.addChild(puntgg);
        }

        puntsS=[{x:canal0.x+canal0.getTransformedBounds().width/2,y:canal0.y+canal0.getTransformedBounds().height-radio *.7},
            {x:canal1.x+canal1.getTransformedBounds().width/2,y:canal1.y+canal1.getTransformedBounds().height-radio *.7},//.7
            {x:canal2.x+canal2.getTransformedBounds().width/2,y:canal2.y+canal2.getTransformedBounds().height-radio *.7},
            {x:canal3.x+canal3.getTransformedBounds().width/2,y:canal3.y+canal3.getTransformedBounds().height-radio *.7},
            {x:canal4.x+canal4.getTransformedBounds().width/2,y:canal4.y+canal4.getTransformedBounds().height-radio *.7},
            {x:canal5.x+canal5.getTransformedBounds().width/2,y:canal5.y+canal5.getTransformedBounds().height-radio *.7}

        ];

        for(var k= 0;k<puntsS.length;k++){    //gols
            var gg = new createjs.Graphics();
            gg.setStrokeStyle(1);
            gg.beginStroke("#aaa");
            gg.beginFill("#fff");
            gg.drawCircle(puntsS[k].x, puntsS[k].y, 2);
            puntg = new createjs.Shape(gg);
            puntg.regX=1;
            puntg.regY=1;
          //stage.addChild(puntg);
        }

        if(!stage.hasEventListener("stagemousedown")){
           stage.addEventListener("stagemousedown",Joc2.toc);

        }
        if(!stage.hasEventListener("stagemouseup")){
            stage.addEventListener("stagemouseup",Joc2.dixa);
        }

        pal=new createjs.Container();
        palN=new createjs.Bitmap(imatges['palN']);
        palNO=new createjs.Bitmap(imatges['palNO']);
        palNE=new createjs.Bitmap(imatges['palNE']);
        palS=new createjs.Bitmap(imatges['palS']);
        palSO=new createjs.Bitmap(imatges['palSO']);
        palSE=new createjs.Bitmap(imatges['palSE']);
        palE=new createjs.Bitmap(imatges['palE']);
        palO=new createjs.Bitmap(imatges['palO']);
        Utils.pon(palN,0,0,false,1,pal);
        Utils.pon(palNO,0,0,false,1,pal);
        Utils.pon(palNE,0,0,false,1,pal);
        Utils.pon(palS,0,0,false,1,pal);
        Utils.pon(palSO,0,0,false,1,pal);
        Utils.pon(palSE,0,0,false,1,pal);
        Utils.pon(palE,0,0,false,1,pal);
        Utils.pon(palO,0,0,false,1,pal);
        stage.addChild(pal);
        palN.visible=palNO.visible=palNE.visible=palS.visible=palSE.visible=palSO.visible=palE.visible=palO.visible=false;
        pal.visible=false;

        gols=0;
        passats=[];
        golsPassats=[];
        golsFicats=0;
        puntsPremi=5;
        puntsCricket=parseInt(localDades.getItem("puntuacioJoc2"));
        copsMax=6+Math.floor(Math.random()*6);
        cops=copsMax;
        malls_arr=[];
        rebotant=false;

        for(var j=0;j<copsMax;j++){
            var mall=new createjs.Bitmap(imatges["mallPunt"]);
            malls_arr.push(mall);
            mall.x=amp/2+j*30;
            mall.y=3;
            stage.addChild(mall);
        }

        for(var i=0;i<puntsPremi;i++){
            var arcPunt=new createjs.Bitmap(imatges["arcPunt"]);
            if(i>=puntsCricket){
                arcPunt.alpha=.3;
                arcPunt.cache(0, 0,arcPunt.getBounds().width,arcPunt.getBounds().height);
            }
            stage.addChild(arcPunt);
            arcPunt.x=20+45*i;
            arcPunt.y=6;
        }

        if(textPunts==null || textPunts==undefined){
            textPunts = new createjs.Text(" ", "bold "+(70/RESOLUTION)+"px BoldinaTwo", "#caa578");
            textPunts.textBaseline = "alphabetic";
            textPunts.y = 45;
            textPunts.x = amp/3;
        }
        stage.addChild(textPunts);

        if(puntsCricket>5){
            textPunts.text=puntsCricket+"";
        }
        linia=new createjs.Shape();
        stage.addChild(linia);

      //  puntsCricket=0;
};

    this.toc=function(e){

        tocant=true;
        stage.addEventListener("stagemousemove" , Joc2.apunta);
        createjs.Ticker.addEventListener("tick", Joc2.handlerTick);
        linia.graphics.c();

    };

    this.apunta=function(e){/// mouseMove

        pal.visible=true;

        Audio.sonatira_linia();

        apuntaX= e.stageX-bola.x;
        apuntaY= e.stageY-bola.y;
        dist=Utils.dist(e.stageX, e.stageY,bola.x,bola.y);
        //var ratioD=dist/50;
        if(dist>140){
            apuntaX/=dist/140;
            apuntaY/=dist/140;
        }
        linia.graphics.c().ss(8,"butt").s("rgba(250,250,250,0.5)").mt(bola.x,bola.y).lt(bola.x+apuntaX, bola.y+apuntaY);
        //var palDeg= Utils.rad2deg(Math.atan2(e.stageY-bola.y ,e.stageX-bola.x));
        var palDeg= Utils.rad2deg(Math.atan2(bola.y-e.stageY ,bola.x- e.stageX)); //versio inversa
        palN.visible=palNO.visible=palNE.visible=palS.visible=palSE.visible=palSO.visible=palE.visible=palO.visible=false;

      if(palDeg<-160){
          palO.visible=true;
          pal.x=bola.x+radio;
          pal.y=bola.y-pal.getBounds().height+radio/2;
      }else if(palDeg<-110){
          palNO.visible=true;
          pal.x=bola.x;
          pal.y=bola.y-pal.getBounds().height+radio*3;
      }else if(palDeg<-70){
          palN.visible=true;
          pal.x=bola.x-radio/2;
          pal.y=bola.y-pal.getBounds().height+radio*3;
      }else if(palDeg<-20){
          palNE.visible=true;
          pal.x=bola.x-pal.getBounds().width-radio/2;
          pal.y=bola.y-pal.getBounds().height+radio*3;
      }else if(palDeg>160){
          palO.visible=true;
          pal.x=bola.x+radio;
          pal.y=bola.y-pal.getBounds().height+radio/2;
      }else if(palDeg>110){
          palSO.visible=true;
          pal.x=bola.x+radio;
          pal.y=bola.y-pal.getBounds().height-radio/2;
      }else if(palDeg>70){
          palS.visible=true;
          pal.x=bola.x-radio;
          pal.y=bola.y-pal.getBounds().height-radio;
      }else if(palDeg>20){
          palSE.visible=true;
          pal.x=bola.x-pal.getBounds().width-radio;
          pal.y=bola.y-pal.getBounds().height-radio/2;
      }else{
          palE.visible=true;
          pal.x=bola.x-pal.getBounds().width-radio;
          pal.y=bola.y-pal.getBounds().height+radio/2;
      }

    };

    this.dixa=function(e){

        if(tocant){
            linia.graphics.clear();
            tocant=false;
            stage.removeAllEventListeners("stagemousemove");

            //velx=(e.stageX-bola.x)/20;// potencia
            //vely=(e.stageY-bola.y)/20;
            velx=-apuntaX/5;// versió inversa
            vely=-apuntaY/5;

            Joc2.colpega();
            stage.removeEventListener("stagemousedown",Joc2.toc);
            stage.removeEventListener("stagemouseup",Joc2.dixa);
        }
    };

    this.colpega=function(){
        createjs.Tween.get(pal,{override:true}).to({x:pal.x-velx*3,y:pal.y-vely*3},500,createjs.Ease.quadOut).call(Joc2.colpega2);
    };

    this.colpega2=function(){
        createjs.Tween.get(pal,{override:true}).to({x:pal.x+velx*4,y:pal.y+vely*4},500,createjs.Ease.quadIn).call(Joc2.dispara);

    };

    this.dispara=function(){
     //   console.log("dispara");
        cops--;
        malls_arr[cops].alpha=.3;

        pal.visible=false;
        tret=true;
        Audio.sonabola_llenca();
    };

    this.handlerTick=function(){

        if(tret==true){
            /* for(var m=0;m<canals.length;m++){
                if(bola.y>canals[m].y+(canal0.getTransformedBounds().height-radio*2)){
                    stage.swapChildren(bola,canals[m]);
                }
            }
            linia.graphics.ss(2,"butt").s("rgba(180,180,180,1)").mt(bola.x,bola.y).lt(bola.x+velx,bola.y+vely);*/

            bola.x+=velx;
            bola.y+=vely;
            velx*=0.96;
            vely*=0.96;

            if(bola.x>voraDreta || bola.x<voraEsquerra){
                velx*=-1;
                bola.x>voraDreta?bola.x=voraDreta:bola.x=voraEsquerra;
                Audio.sonarebot_amb_paret();
            }
            if(bola.y>voraBaix  || bola.y<voraDalt){
                vely*=-1;
                bola.y>voraBaix?bola.y=voraBaix:bola.y=voraDalt;
                Audio.sonarebot_amb_paret();
            }

            if(Math.abs(velx)<.6 && Math.abs(vely)<.6){// se para cuando vel<0.5pxPerFrame
               Joc2.aturada();
            }

            for(var i=0;i<puntsR.length;i++){

                if(Utils.dist(bola.x, bola.y, puntsR[i].x, puntsR[i].y)<radio){
                    //stage.update();
                    Joc2.rebotar(puntsR[i].x, puntsR[i].y);
                    return
                }
            }
            Joc2.comprovaGol();
        }

        stage.update();
    };




    this.aturada=function(){
        //console.log("aturada");
        tret=false;
        if(gols>0){
            Joc2.retiraCanals([passats]);
        }
        if(golsFicats==6){
            Joc2.guanyar();
            return;
        }
        if(cops<=0){
            Joc2.perdre();
        }

        if(!stage.hasEventListener("stagemousedown")){
            stage.addEventListener("stagemousedown",Joc2.toc);
        }
        if (!stage.hasEventListener("stagemouseup")){
            stage.addEventListener("stagemouseup",Joc2.dixa);
        }
    };

    this.perdre=function(){
        stage.removeEventListener("stagemouseup",Joc2.dixa);
        Audio.sonafi_ko();
       if(malJoc2==undefined || malJoc2==null){
           malJoc2=new createjs.Bitmap(imatges["malJoc2"]);
           malJoc2.addEventListener("click",Joc2.reintentar);
       }
        Utils.pon(malJoc2,amp/2,alt/2,true);

    };

    this.comprovaGol=function(){

        for(var l=0;l<puntsS.length;l++){// per cada porteria...

            if(Utils.dist(bola.x, bola.y, puntsS[l].x, puntsS[l].y)<radio*.85 &&!rebotant ){//.7

                var tard=setTimeout(function(){Joc2.comprovaTard(tard,l)},100);
             //   console.log("comprova q gol, rebotant=",rebotant)
                // createjs.Ticker.removeEventListener("tick",Joc2.handlerTick);
                return
            }
        }


    };

    this.comprovaTard=function(tard,l){
      //  console.log("conprovaTard q es gol, reb:",rebotant);
        clearTimeout(tard);
        if(!rebotant&& golsPassats.indexOf(l+"")==-1){

            Joc2.gol(l);
            golsPassats.push(""+l);
        }

    };

    this.reintentar=function(){
        Audio.sonatouch();
        createjs.Tween.removeAllTweens();
        stage.removeAllChildren();
        Joc2.posaCamp();
        Joc2.posaBack();
        tocant=false;
        tret=false;
    };

    this.guanyar=function(){
        stage.removeEventListener("stagemouseup",Joc2.dixa);

        puntsCricket++;
        Main.apuntaPunt(1);
        if(puntsCricket>=puntsPremi){
            if(beJoc2==undefined || beJoc2==null){
                beJoc2=new createjs.Bitmap(imatges["beJoc2"]);
                beJoc2.addEventListener("click",Joc2.reintentar);
                Audio.sonaaplaudiment();

            }
            Utils.pon(beJoc2,amp/2,alt/2,true);
            return;
        }
        Audio.sonapersonatge_ok();
        Joc2.posaCamp();
        Joc2.posaBack();
        tocant=false;
        tret=false;
    };

    this.retiraCanals=function(){

        for(var k= 0;k<passats.length;k++){
           createjs.Tween.get(passats[k]).to({y:passats[k].y-100,alpha:0},1000,createjs.Ease.quadIn);
            golsFicats++;
            puntsR[canals.indexOf(passats[k])*2]={x:10000,y:20000};
            puntsR[canals.indexOf(passats[k])*2+1]={x:24444,y:33333};
            Audio.sonaarquet_ok();
        }

        gols=0;
        passats=[];

    };

    this.gol=function(quin){
//        console.log("gol afegit");
        gols++;
        passats.push(canals[quin]);
        puntsS[quin]={x:10000,y:10000};


    };


    this.rebotar=function(px,py){

        if(Utils.dist(bola.x,bola.y,px,py)<(radio/3)){//torna a la posició anterior
            bola.x-=velx;
            bola.y-=vely;
        }

        var angulo=Math.atan2( (py-bola.y),(px-bola.x)  );// * (180/Math.PI);
        var drccn=Math.atan2(vely,velx);// * (180/Math.PI);
        var nuevaDireccion=(angulo*2)-drccn;
        modulo=Math.sqrt((vely*vely)+(velx*velx));

        //linia.graphics.ss(2,"butt").s("rgba(0,0,180,1)").mt(px,py).lt(bola.x,bola.y);//radio desde p a puntoDeRebote

        prevVely=vely;

        velx = modulo * Math.cos(nuevaDireccion) * -1;
        vely = modulo * Math.sin(nuevaDireccion)*-1;
        //radians = degrees * (pi/180);
        //degrees = radians * (180/pi);

        bola.x+=velx*1.2;
        bola.y+=vely*1.2;
        var tm;
       // linia.graphics.ss(2,"butt").s("rgba(0,250,250,1)").mt(bola.x,bola.y).lt(bola.x+velx*100,bola.y+vely*100);//radio desde p a nuevo punto
        //linia.graphics.ss(2,"butt").s("rgba(250,0,0,1)").mt(bola.x,bola.y).lt(bola.x+velx*-100,bola.y+vely*-100);//radio desde p a nuevo punto
     //   linia.graphics.ss(2,"butt").s("rgba(0,250,250,1)").mt(bola.x,bola.y).lt(velx*100,vely*100);//radio desde p a nuevo punto
      //  createjs.Ticker.removeEventListener("tick",Joc2.handlerTick);
        if(prevVely<0&&vely>0 || prevVely>0&&vely<0){
            rebotant=true;
            tm=setTimeout(function(){rebotant=false},900);
        }

        stage.update();
        Joc2.comprovaGol();
        Audio.sonarebot_amb_paret();
    };

    this.posaBack=function(){

        botBack=new createjs.Bitmap(imatges['bot1']);
        Utils.pon(botBack,20,alt-50,false);
        botBack.addEventListener("click",Joc2.aMenu);
    };

    this.aMenu=function(){

        createjs.Ticker.removeEventListener("tick",Joc2.handlerTick);
        createjs.Tween.removeAllTweens();
        Menu.initMenu();
        Audio.sonatouch();
    }
};

