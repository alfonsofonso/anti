/**
 User: alfonso
 Data: 12/11/13 , 15:16
 */
var cuads_arr;
var puntuacio;

Joc3=new function(){

    var fons3;
    var auca1,auca2,auca3,auca4;
    var auques;
    var tesela;
    var paraula;
    var auca1mots,auca2mots,auca3mots,auca4mots;
    var auquesMots;
    var mot;
    var defText;
    var definicions;
    var aucaNum;
    var teseles;
    var lletres;
    var solucio;


    var beJoc3;
    var malJoc3;
    var timeouts;
    //var jugantJoc3;
    var conTess;
    var newString;//paraula retallada


    this.init=function(){  ////////////     A U Q U E S
       //listeners
        stage.removeAllEventListeners();

        //createjs.Ticker.removeAllEventListeners("tick");
        createjs.Ticker.addEventListener("tick", Joc3.handlerTick);

        //inicia variables:
        auca1mots=["argolla", "mall", "bola", "perruca"];
        auca2mots=["pipa", "gos","casaca","mitges"];
        auca3mots=["xocolata", "xicra", "safata", "gerra"];
        auca4mots=["baluard", "torre", "camperol", "bandera"];
        auquesMots=[auca1mots,auca2mots,auca3mots,auca4mots];
        definicions=[
            ["Peça de ferro en forma d’arc que es clavava a terra i que servia per jugar, fent-hi passar una bola per sota",
             "Martell de fusta que s’utilitzava per jugar al joc de l’argolla",
             "Pilota dura i rígida de nespler que s’utilitzava per fer-la passar per sota les argolles",
             "Cabellera postissa molt popular al segle XVIII"],
            ["Tub llarg i prim, amb un recipient fumejant a l’extrem final",
             "Animal de companyia de la família dels cànids",
             "Peça de vestir d’abric usada en certs uniformes, amb mànigues llargues fins als punys, cos cenyit i faldons llargs",
             "Dues peçes de vestir de cotó, llana o seda que s'adapten als peus i a les cames generalment fins més amunt del genoll"],
            ["Beguda de cacau molt popular a Catalunya al segle XVIII",
             "Tassa petita de terrissa o porcellana decorada",
             "Plat gros, molt planer, amb vores de poca altura, que serveix per portar objectes o per presentar alguna cosa",
             "Got alt amb nansa de terrissa, vidre o metall que s’empra per servir líquids"],
            ["Fortificació enfocada cap a fora de les muralles d’una ciutat, destinada a protegir les portes i dificultar els assalts",
             "Construcció cilíndrica. aïllada o sobresortint d’una edificació, feta per protegir una ciutat o un castell, per mirar a gran distància",
             "Persona de camp, que es dedica al conreu de la terra.",
             "Tros de tela fixat per un costat a un pal o asta i que serveix com a símbol d’identificació"]
        ];

        lletres="abcçdefghijklmnoopqrstuvwxyz";
        puntuacio=parseInt(localDades.getItem("puntuacioJoc3"));
        //objectes visuals
        fons3=new createjs.Bitmap(imatges['fons3']);
        Utils.pon(fons3,0,0,false);
        Joc3.creaAuques();

        Joc3.initJoc();
        Joc3.posaBack();
        timeouts=[];
    };

    this.creaAuques=function(){

        auca1=new createjs.Bitmap(imatges["auca1"]);
        auca2=new createjs.Bitmap(imatges["auca2"]);
        auca3=new createjs.Bitmap(imatges["auca3"]);
        auca4=new createjs.Bitmap(imatges["auca4"]);
        auques=[auca1,auca2,auca3,auca4];
        tesela=new createjs.Bitmap(imatges["tesela"]);

        solucio=new createjs.Text("","bold "+50+"px BoldinaTwo","#2472b6");
        solucio.mouseEnabled=false;
        solucio.y=8;
        stage.addChild(solucio);

        cuads_arr=[];
        conTess=new createjs.Container();

        for(var k=0;k<5;k++){// puntuacio: marcs i flors de lis
            var cuad=new createjs.Shape();
            cuad.graphics.beginFill("#877047").drawRect(0,0,40,40);
            cuad.regX=cuad.regY=20;

            stage.addChild(cuad);
            cuad.x=225+k*70;
            cuad.y=56;
            cuad.rotation=45;
            cuad.cache(0,0,70,70);
            cuads_arr.push(cuad);
        }
        var topPunts;
        puntuacio>5?topPunts=5:topPunts=puntuacio;
        for(var l=0;l<topPunts;l++){
            var lis=new createjs.Bitmap(imatges["lis"]);
            lis.x=cuads_arr[l].x;
            lis.y=52;
            lis.regX=lis.regY=lis.getBounds().width/2;
            lis.scaleX=lis.scaleY=.5;

            stage.addChild(lis);
        }

    };


    this.initJoc=function(){

        teseles=[];
        aucaNum=Math.floor(Math.random()*4);
        Utils.pon(auques[aucaNum],amp/2,alt/3.25,true);
        mot=Math.floor(Math.random()*4);
        paraula=auquesMots[aucaNum][mot];

        Joc3.creaParaules();
        Joc3.colocaTeseles();
        Joc3.colocaDefinicio();
        solucio.regX=paraula.length*12;
        solucio.x=amp/2-6;
        solucio.text="";
    };


    this.creaParaules=function(){

        conTess.removeAllChildren();
        newString=paraula;

        for(var i=0;i<paraula.length;i++){
            var conten=new createjs.Container();
            if(!conten.hasEventListener("mousedown")){
                conten.addEventListener("mousedown",Joc3.toc);
            }
            teseles.push(conten);
            var tes=new createjs.Bitmap(imatges["tesela"]);
            Utils.pon(tes,0,0,false,1,conten);

            var lletr=new createjs.Text(paraula.charAt(i),"bold "+45+"px BoldinaTwo","#2472b6");
            // lletr.textBaseline = "alphabetic";
            lletr.regX=lletr.getTransformedBounds().width/2;
            lletr.x=tes.getTransformedBounds().width/2;
            lletr.y=6;
            conten.addChild(lletr);

            var tess=new createjs.Shape();
            tess.graphics.beginFill("#0E70B9").drawRect(i*66,0,60,60);
            conTess.addChild(tess);
        }

        conTess.regX=paraula.length*33;
        conTess.x=amp/2;
        conTess.y=632;
        conTess.alpha=.4;
        stage.addChild(conTess);


        for(var j= 0;j<(12-paraula.length);j++){/// lletres sobrants
            var conten=new createjs.Container();
            if(!conten.hasEventListener("mousedown")){
                conten.addEventListener("mousedown",Joc3.toc);
            }
            teseles.push(conten);
            var tes=new createjs.Bitmap(imatges["tesela"]);
            Utils.pon(tes,0,0,false,1,conten);

            var lletr=new createjs.Text(lletres.charAt(Math.floor(Math.random()*lletres.length)),"bold "+45+"px BoldinaTwo","#2472b6");
            // lletr.textBaseline = "alphabetic";
            lletr.mouseEnabled=false;
            lletr.regX=lletr.getTransformedBounds().width/2;
            lletr.x=tes.getTransformedBounds().width/2;
            lletr.y=6;
            conten.addChild(lletr);
        }
    };

    this.colocaTeseles=function(){

        teseles=Utils.shuffle(teseles);
        for(var i= 0;i<6;i++){//linia 1
           stage.addChild(teseles[i]);
            teseles[i].x=amp/6+i*84;
            teseles[i].y=alt/4*3-28;
        }
        for(var j= 6;j<12;j++){//linia 1
           stage.addChild(teseles[j]);
           teseles[j].x= amp/6+(j-6)*84;
           teseles[j].y=alt/6*5-28;
        }
    };

    this.colocaDefinicio=function(){

        if(defText==undefined || defText==null){
            defText=new createjs.Text("","bold "+24+"px BoldinaTwo","#6B3E15");
            defText.x=amp/2;defText.y=alt/1.95;
            defText.textAlign="center";

            defText.lineHeight=25;
            defText.lineWidth=amp/1.5;
        }
        stage.addChild(defText);
        defText.text=definicions[aucaNum][mot];
        defText.regY=defText.getTransformedBounds().height/2;

    };

    this.toc=function(e){
        //x  if(jugantJoc3){return};

        jugantJoc3=true;

        var lletra=e.target.parent.children[1].text;

        if(newString.indexOf(lletra)==0){

            createjs.Tween.get(e.target.parent).to({y:conTess.y-2,x:conTess.x+(paraula.length-newString.length)*66-paraula.length*33},500,createjs.Ease.quadIn);
            newString = newString.substr(1,paraula.length);
            //paraula=newString;
            if(newString==""){
                var tm=setTimeout(Joc3.guanyar,800);
                timeouts.push(tm);
            }
            Audio.sonalletra();
        }else{
            Joc3.malament();
        }
    };

    this.unaltre=function(){

        //jugantJoc3=false;
        stage.removeChild(auques[aucaNum]);
        for(var i= 0;i<teseles.length;i++){
            stage.removeChild(teseles[i]);
        }
        Joc3.initJoc();
    };

    this.guanyar=function(){

        puntuacio++;
        Main.apuntaPunt(2);
        Audio.sonapersonatge_ok();
        if(puntuacio<5){
            var lis=new createjs.Bitmap(imatges["lis"]);
            lis.x=cuads_arr[puntuacio-1].x;
            lis.y=52;
            lis.regX=lis.regY=lis.getBounds().width/2;
            //lis.scaleX=lis.scaleY=2;
            lis.alpha=0;
            stage.addChild(lis);
            createjs.Tween.get(lis).to({scaleX:.5,scaleY:.5,alpha:1},800,createjs.Ease.backIn);

        }else if(puntuacio==5){
            var lis2=new createjs.Bitmap(imatges["lis"]);
            lis2.x=cuads_arr[puntuacio-1].x;
            lis2.y=52;
            lis2.regX=lis2.regY=lis2.getBounds().width/2;
            lis2.scaleX=lis2.scaleY=.5;
            stage.addChild(lis2);
            createjs.Tween.get(lis2).to({scaleX:.5,scaleY:.5},1200,createjs.Ease.quadIn);

            var tm=setTimeout(Joc3.trionfa,1200);
            timeouts.push(tm);
            return
        }else{
            var tm2=setTimeout(Joc3.trionfa,1200);
            timeouts.push(tm2);
            return
        }
        var tm3=setTimeout(Joc3.unaltre,1000);
        timeouts.push(tm3);
    };

    this.trionfa=function(){/// posa clau

        if(beJoc3==undefined || beJoc3==null){
            beJoc3=new createjs.Bitmap(imatges["beJoc3"]);
            beJoc3.addEventListener("click",Joc3.jugaMes);
            Audio.sonaaplaudiment();
        }
        Audio.sonaaplaudiment();
        Utils.pon(beJoc3,amp/2,alt/2,true);


    };

    this.jugaMes=function(){
        Audio.sonatouch();
        stage.removeChild(beJoc3);
        stage.removeChild(malJoc3);
        Joc3.unaltre();

    };

    this.malament=function(){

        for(var i= 0;i<teseles.length;i++){

            createjs.Tween.get(teseles[i]).to({y:alt*2,rotation:Math.random()*360-180},1800,createjs.Ease.quadIn);
        }
        Audio.sonaminimec();
        var tm=setTimeout(Joc3.malJoc3,2000);
        timeouts.push(tm);

    };

    this.malJoc3=function(){

       if(malJoc3==undefined||malJoc3==null){

          malJoc3=new createjs.Bitmap(imatges["malJoc3"]);
          malJoc3.addEventListener("click",Joc3.jugaMes);
       }
       Utils.pon(malJoc3,amp/2,alt/2,true);
        Audio.sonafi_ko();

    };

    this.handlerTick=function(){

        stage.update();

    };

    this.posaBack=function(){

        botBack=new createjs.Bitmap(imatges['bot1']);
        Utils.pon(botBack,20,alt-50,false);
        botBack.addEventListener("click",Joc3.aMenu);
    };

    this.aMenu=function(){

        createjs.Ticker.removeEventListener("tick",Joc3.handlerTick);
        createjs.Tween.removeAllTweens();
        for(var i=0;i<timeouts.length;i++){

            clearTimeout(timeouts[i]);
        }
        Menu.initMenu();
        Audio.sonatouch();

    }


};