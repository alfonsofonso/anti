/**
 User: alfonso
 Data: 12/11/13 , 15:17
 */
var platsPunts_arr;

Joc4=new function(){

    var tocs;
    var rebost;
    var puntsMenjars;
    var ingReceptes;
    var ing1p1,ing2p1,ing3p1,ing4p1,ing1p2,ing2p2,ing3p2,ing4p2,ing1p3,ing2p3,ing3p3,ing4p3,ing1p4,ing2p4,ing3p4,ing4p4,ing1p5,ing2p5,ing3p5,ing4p5;
    var receptaNum;
    var recepta2Num;
    var plat1,plat2;
    var recepta1,recepta2,recepta3,recepta4,recepta5;
    var receptes;
    var posicions;

    var level2;
    var diPlat;
    var izqPrimins;
    var receptaPosada;
    var timeouts;
    var p1,p2,p3,p4,p5;
    var restArr;
    var extra1,extra2;
    var fons4;
    var beJoc4,malJoc4;
    var platBe,platBe2;
    var rectanglePunts;


    this.init=function(){//////////////   A L I M E N T S

        console.log("joc4 init");
        stage.removeAllEventListeners();

       // createjs.Ticker.removeAllEventListeners("tick");
        createjs.Ticker.addEventListener("tick", Joc4.handlerTick);
        //inicia variables:
        posicions=[[150,180],[135,375],[600,165],[360,345],[570,360], [390,165], [300,570],[120,660], [480,570],[615,660]];
        puntsMenjars=parseInt(localDades.getItem("puntuacioJoc4"));
        // visuales
        fons4=new createjs.Bitmap(imatges['taula']);
        Utils.pon(fons4,0,0,false);

        Joc4.carregaIngs();
        level2=4;/// num de plats servits per passar a multitouch
        Joc4.partida();
    };

    this.carregaIngs=function(){

        ing1p1=new createjs.Bitmap(imatges['ing1p1']);
        ing2p1=new createjs.Bitmap(imatges['ing2p1']);
        ing3p1=new createjs.Bitmap(imatges['ing3p1']);
        ing4p1=new createjs.Bitmap(imatges['ing4p1']);

        ing1p2=new createjs.Bitmap(imatges['ing1p2']);
        ing2p2=new createjs.Bitmap(imatges['ing2p2']);
        ing3p2=new createjs.Bitmap(imatges['ing3p2']);
        ing4p2=new createjs.Bitmap(imatges['ing4p2']);

        ing1p3=new createjs.Bitmap(imatges['ing1p3']);
        ing2p3=new createjs.Bitmap(imatges['ing2p3']);
        ing3p3=new createjs.Bitmap(imatges['ing3p3']);
        ing4p3=new createjs.Bitmap(imatges['ing4p3']);

        ing1p4=new createjs.Bitmap(imatges['ing1p4']);
        ing2p4=new createjs.Bitmap(imatges['ing2p4']);
        ing3p4=new createjs.Bitmap(imatges['ing3p4']);
        ing4p4=new createjs.Bitmap(imatges['ing4p4']);

        ing1p5=new createjs.Bitmap(imatges['ing1p5']);
        ing2p5=new createjs.Bitmap(imatges['ing2p5']);
        ing3p5=new createjs.Bitmap(imatges['ing3p5']);
        ing4p5=new createjs.Bitmap(imatges['ing4p5']);

        plat1=new createjs.Bitmap(imatges['plat1']);
        plat2=new createjs.Bitmap(imatges['plat2']);

        p1=new createjs.Bitmap(imatges['p1']);
        p2=new createjs.Bitmap(imatges['p2']);
        p3=new createjs.Bitmap(imatges['p3']);
        p4=new createjs.Bitmap(imatges['p4']);
        p5=new createjs.Bitmap(imatges['p5']);

        //p1.visible=p2.visible=p3.visible=p4.visible=p5.visible=false;
        platBe=new createjs.Container();
        platBe2=new createjs.Container();

        recepta1=new createjs.Bitmap(imatges['recepta1']);
        recepta2=new createjs.Bitmap(imatges['recepta2']);
        recepta3=new createjs.Bitmap(imatges['recepta3']);
        recepta4=new createjs.Bitmap(imatges['recepta4']);
        recepta5=new createjs.Bitmap(imatges['recepta5']);

        receptes=[recepta1,recepta2,recepta3,recepta4,recepta5];
        var localDades=window.localStorage;
        puntsMenjars=localDades.getItem("puntuacioJoc4");

        if(rectanglePunts==null || rectanglePunts==undefined){
            rectanglePunts=new createjs.Bitmap(imatges["rectanglePunts"]);
        }
        Utils.pon(rectanglePunts,amp/2-20,alt/9*8,false);

        platsPunts_arr=[];
        for(var i=0;i<5;i++){
            if(puntsMenjars>i){
                var platPunt;
                platPunt=new createjs.Bitmap(imatges["platPunt"]);
                Utils.pon(platPunt,15+rectanglePunts.x+i*66,rectanglePunts.y+16);

            }else{
                var platPunt;
                platPunt=new createjs.Bitmap(imatges["platNoPunt"]);
                Utils.pon(platPunt,23+rectanglePunts.x+i*66,rectanglePunts.y+16);

            }
            platsPunts_arr.push(platPunt);
        }

        diPlat=720/window.innerWidth;
        diPlatY=1080/window.innerHeight;
        Joc4.posaBack();

        timeouts = [];
    };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.esborra=function(){

        rebost=[];
        receptes=[recepta1,recepta2,recepta3,recepta4,recepta5];
        ingReceptes=[[ing1p1,ing2p1,ing3p1,ing4p1],[ing1p2,ing2p2,ing3p2,ing4p2],[ing1p3,ing2p3,ing3p3,ing4p3],[ing1p4,ing2p4,ing3p4,ing4p4],[ing1p5,ing2p5,ing3p5,ing4p5]];
        stage.removeChild(receptaPosada);
        plat1.removeAllEventListeners();
        stage.removeAllEventListeners();
        createjs.Tween.removeAllTweens();

        for (var i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }  //quick reset of the timer array you just cleared
        timeouts = [];
    };


    this.partida=function(){

        Joc4.esborra();

        receptaNum=Math.floor(Math.random()*5);

        if(puntsMenjars<level2){/// level 0

            receptaNum=Math.floor(Math.random()*5);// poso recepta1
            Utils.pon(receptes[receptaNum],amp/2,28,false);
            receptaPosada=receptes[receptaNum];

            for(var i=0;i<4;i++){     //////////////////////  apunto els ingredients
                rebost.push(ingReceptes[receptaNum][i]);
            }
            ingReceptes.splice(receptaNum,1);/// trec els ingredients bons

            ingReceptes[0]=Utils.shuffle(ingReceptes[0]);// barajo
            ingReceptes[1]=Utils.shuffle(ingReceptes[1]);
            ingReceptes[2]=Utils.shuffle(ingReceptes[2]);

            for (var j= 0;j<2;j++){
                rebost.push(ingReceptes[0][0]);
                ingReceptes[0].splice(0,1);
                rebost.push(ingReceptes[1][0]);
                ingReceptes[1].splice(0,1);
                rebost.push(ingReceptes[2][0]);
                ingReceptes[2].splice(0,1);
            }

        }else{//// amb 2 plats ----  level >0

            receptaNum=Math.floor(Math.random()*5);
            Utils.pon(receptes[receptaNum],4,28,false);// posa recepta1

            for(var o=0;o<4;o++){// afegeix a rebost ingredients recepta 1
                rebost.push(ingReceptes[receptaNum][o]);
            }
            //// segona recepta
            recepta2Num=Math.floor(Math.random()*5);
            if(receptaNum==recepta2Num){
                if(recepta2Num==0){
                    recepta2Num=1;
                }else{
                    recepta2Num=receptaNum-1;
                }
            }
            Utils.pon(receptes[recepta2Num],amp/2,28,false);// posa recepta2

            for(var m=0;m<4;m++){//afegeix a rebost ingredients recepta 2
                rebost.push(ingReceptes[recepta2Num][m]);
            }

            restArr=["0","1","2","3","4"];
            restArr.splice(restArr.indexOf(receptaNum.toString()),1);
            restArr.splice(restArr.indexOf(recepta2Num.toString()),1);

            extra1=parseInt(restArr[0]);//
            extra2=parseInt(restArr[1]);//

            ingReceptes[extra1]=Utils.shuffle(ingReceptes[extra1]);
            ingReceptes[extra2]=Utils.shuffle(ingReceptes[extra2]);

            rebost.push(ingReceptes[extra1][0]);// add 2 more to get 10
            rebost.push(ingReceptes[extra2][0]);
        }

        rebost=Utils.shuffle(rebost);

        ////////////////////////////////   para la taula //////////
        for(var k=0;k<10;k++){
            Utils.pon(rebost[k],posicions[k][0],posicions[k][1],true,.5);
        }

        /////////////////////////////////////////////  1 plat
        if(puntsMenjars<level2){  // un plat
            Utils.pon(plat1,amp/2,alt+90,true,.6);
            createjs.Tween.get(plat1).to({y:860,scaleY:.6,scaleX:.6},700,createjs.Ease.quadOut);

            if(!plat1.hasEventListener("mousedown")){

                plat1.addEventListener("mousedown",Joc4.toc);
            }

        }else{                /////////////////////////// 2 plats

            Utils.pon(plat1,200,alt+90,true,.5);
            Utils.pon(plat2,500,alt+90,true,.5);
            createjs.Tween.get(plat1).to({y:860,scaleX:.6,scaleY:.6},700,createjs.Ease.quadOut);
            createjs.Tween.get(plat2).to({y:860,scaleX:.6,scaleY:.6},800,createjs.Ease.quadOut);
            stage.off("pressmove");

            if(!stage.hasEventListener("stagemousedown")){
               stage.on("stagemousedown",Joc4.tocats);
            }
            if(!stage.hasEventListener("stagemouseup")){
                stage.on("stagemouseup",Joc4.dixals);
            }
        }

        ingReceptes=[[ing1p1,ing2p1,ing3p1,ing4p1],[ing1p2,ing2p2,ing3p2,ing4p2],[ing1p3,ing2p3,ing3p3,ing4p3],[ing1p4,ing2p4,ing3p4,ing4p4],[ing1p5,ing2p5,ing3p5,ing4p5]];
    };// fi partida

    //////////////////////////  U N I T  O U C H     ////////////

    this.toc=function(e){
        //g("toc");
        stage.on("pressmove",Joc4.mouPlat1);
        createjs.Tween.get(plat1).to({scaleX:.7,scaleY:.7},300,createjs.Ease.quadOut);
    };

    this.mouPlat1=function(e){

        plat1.x= e.stageX;
        plat1.y= e.stageY;

        for(var n=0;n<rebost.length;n++){

            if(Utils.dist(e.stageX, e.stageY,rebost[n].x,rebost[n].y)<40){

                if(ingReceptes[receptaNum].indexOf(rebost[n])==-1){/// si toques un que no val...
                    e.remove();
                    createjs.Tween.get(plat1).to({y:alt+90},700,createjs.Ease.quadOut);
                    timeouts.push(setTimeout(Joc4.perdre,800));
                    Audio.sonaminimec();
                    return
                }else{/// si agafes un que sí

                    ingReceptes[receptaNum].splice(ingReceptes[receptaNum].indexOf(rebost[n]),1);
                    Audio.sonaingredient_ok();
                    stage.removeChild(rebost[n]);
                    var ali=rebost[n];
                    rebost.splice(rebost.indexOf(rebost[n]),1);
                    stage.update();
                    stage.addChild(ali);
                    ali.x= e.stageX;
                    ali.y= e.stageY;
                    createjs.Tween.get(ali).to({scaleX:2,scaleY:2,alpha:0},700,createjs.Ease.quadOut).call(function(){Joc4.restaura(ali)});
                    Joc4.comprovaFi(e);
                    break
                }
            }
        }
        //  if(e.stageY<80){// pasar el plato a sala
        //    e.remove();
            //
            //return
        //}
    };

    this.dixa=function(e){
        //logg("dixa");
        //e.remove();
        createjs.Tween.get(plat1).to({scaleX:.6,scaleY:.6},700,createjs.Ease.bounceOut);

    };
// ///////////////////////////////////////        M U L T I T O U C H    ///////////////////////////////////////////////////////////////////////////

    this.tocats=function(e){

        tocs= e.nativeEvent.touches;
        if(tocs==undefined){return}

        if(tocs.length<2){
            stage.off("pressmove",Joc4.moulos);
            return }

        if(!stage.hasEventListener("pressmove")){

            stage.on("pressmove",Joc4.moulos);
        }
        /// if dit primer toca plat1 i dit2 toca plat2
        if(Utils.dist(tocs[0].clientX*diPlat,tocs[0].clientY*diPlatY,plat1.x,plat1.y)<30  &&
            Utils.dist(tocs[1].clientX*diPlat,tocs[1].clientY*diPlatY ,plat2.x,plat2.y)<30 ){
            izqPrimins=true;
            //aixecals
            createjs.Tween.get(plat1).to({scaleX:.7,scaleY:.7},300,createjs.Ease.quadOut);
            createjs.Tween.get(plat2).to({scaleX:.7,scaleY:.7},400,createjs.Ease.quadOut);
            //  if dit 2 toca plat1 i dit 1 toca plat2
        } else if(Utils.dist(tocs[1].clientX*diPlat,tocs[1].clientY*diPlatY,plat1.x,plat1.y)<30  &&
            Utils.dist(tocs[0].clientX*diPlat,tocs[0].clientY*diPlatY ,plat2.x,plat2.y)<30 ){
            izqPrimins=false;
            //aixeca els plats
            createjs.Tween.get(plat1).to({scaleX:.7,scaleY:.7},400,createjs.Ease.quadOut);
            createjs.Tween.get(plat2).to({scaleX:.7,scaleY:.7},300,createjs.Ease.quadOut);

        }else{
            return
        }

    };


    this.moulos=function(e){

        tocs= e.nativeEvent.touches;

        if(izqPrimins){

            plat1.x= tocs[0].clientX*diPlat;
            plat1.y= tocs[0].clientY*diPlatY;

            plat2.x= tocs[1].clientX*diPlat;
            plat2.y= tocs[1].clientY*diPlatY;

        }else{

            plat1.x= tocs[1].clientX*diPlat;
            plat1.y= tocs[1].clientY*diPlatY;

            plat2.x= tocs[0].clientX*diPlat;
            plat2.y= tocs[0].clientY*diPlatY;
        }
        ///
        Joc4.comprovaToca(e);//si toca aliment
    };

    this.dixals=function(e){

        tocs= e.nativeEvent.touches;
        if(tocs==undefined){return}
        //e.remove();
        stage.removeAllEventListeners("pressmove");
        if(tocs.length<2){

            createjs.Tween.get(plat1).to({scaleX:.6,scaleY:.6},300,createjs.Ease.quadOut);
            createjs.Tween.get(plat2).to({scaleX:.6,scaleY:.6},400,createjs.Ease.quadOut);

        }
        //stage.off("stagemousedown",Joc4.tocats);
        // stage.on("stagemousedown",Joc4.tocats);
    };

    this.handlerTick=function(){
        stage.update();
    };

    this.restaura=function(alim){// restaura aliment
        stage.removeChild(alim);
        alim.alpha=1;
        alim.scaleX=alim.scaleY=1;
    };

    this.comprovaFi=function(e){

        if(ingReceptes[receptaNum].length<1){
            e.remove();
            plat1.visible=false;
            platBe.removeAllChildren();
            if(receptaNum==0){
                platBe.addChild(p1);
            }else if(receptaNum==1){
                platBe.addChild(p2);
            }else if(receptaNum==2){
                platBe.addChild(p3);
            }else if(receptaNum==3){
                platBe.addChild(p4);
            }else if(receptaNum==4){
                platBe.addChild(p5);
            }

            platBe.x=plat1.x;
            platBe.y=plat1.y;
            platBe.regX=p1.getTransformedBounds().width/2;
            platBe.regY=p1.getTransformedBounds().height/2;
            platBe.scaleX=platBe.scaleY=.7;
            stage.addChild(platBe);
            createjs.Tween.get(platBe).to({x:amp/6*5,y:130,scaleX:1,scaleY:1},1000,createjs.Ease.quadInOut).call(Joc4.platFet);
        }
    };

    this.platFet=function(){
        Audio.sonapersonatge_ok();
        createjs.Tween.get(platBe).to({y:-190},1100,createjs.Ease.backIn).wait(200).call(Joc4.guanyar);


    };

    this.comprova2Fi=function(){
        if(rebost.length<3){

            plat1.visible=false;
            plat2.visible=false;

            platBe2.removeAllChildren();
            platBe.removeAllChildren();

            if(receptaNum==0){
                platBe.addChild(p1);
            }else if(receptaNum==1){
                platBe.addChild(p2);
            }else if(receptaNum==2){
                platBe.addChild(p3);
            }else if(receptaNum==3){
                platBe.addChild(p4);
            }else if(receptaNum==4){
                platBe.addChild(p5);
            }
            if(recepta2Num==0){
                platBe2.addChild(p1);
            }else if(recepta2Num==1){
                platBe2.addChild(p2);
            }else if(recepta2Num==2){
                platBe2.addChild(p3);
            }else if(recepta2Num==3){
                platBe2.addChild(p4);
            }else if(recepta2Num==4){
                platBe2.addChild(p5);
            }

            platBe.x=plat1.x;
            platBe.y=plat1.y;
            platBe.regX=p1.getTransformedBounds().width/2;
            platBe.regY=p1.getTransformedBounds().height/2;
            platBe.scaleX=platBe.scaleY=.7;
            stage.addChild(platBe);

            platBe2.x=plat2.x;
            platBe2.y=plat2.y;
            platBe2.regX=p1.getTransformedBounds().width/2;
            platBe2.regY=p1.getTransformedBounds().height/2;
            platBe2.scaleX=platBe2.scaleY=.7;
            stage.addChild(platBe2);

            createjs.Tween.get(platBe).to({x:amp/3,y:130,scaleX:1,scaleY:1},1000,createjs.Ease.quadInOut);
            createjs.Tween.get(platBe2).to({x:amp/6*5,y:130,scaleX:1,scaleY:1},1100,createjs.Ease.quadInOut).call(Joc4.platFet2);

        }
    };

    this.platFet2=function(){

        createjs.Tween.get(platBe).to({y:-190},1000,createjs.Ease.backIn).wait(200);
        createjs.Tween.get(platBe2).to({y:-190},1000,createjs.Ease.backIn).wait(200).call(Joc4.guanyar);

    };

    this.perdre=function(){

        for(var i=0;i<rebost.length;i++){
            stage.removeChild(rebost[i]);
        }
        if(malJoc4==undefined||malJoc4==null){
            malJoc4=new createjs.Bitmap(imatges["malJoc4"]);
            malJoc4.addEventListener("click",Joc4.reintentar);
        }
        Utils.pon(malJoc4,amp/2,alt/2,true);
        Audio.sonafi_ko();
    };

    this.reintentar=function(){
        stage.removeChild(malJoc4);
        stage.removeChild(beJoc4);
        Joc4.partida();
        Audio.sonatouch();
    };

    this.guanyar=function(){

        puntsMenjars++;
        //
        if(puntsMenjars<=5){

            stage.removeChild(platsPunts_arr[puntsMenjars-1]);
            var platPunt=new createjs.Bitmap(imatges["platPunt"]);
            Utils.pon(platPunt,platsPunts_arr[puntsMenjars-1].x,platsPunts_arr[puntsMenjars-1].y,false,2);
            platPunt.alpha=0;
            createjs.Tween.get(platPunt).to({scaleX:1,scaleY:1,alpha:1},800,createjs.Ease.backIn);
        }

        for(var i=0;i<rebost.length;i++){
            stage.removeChild(rebost[i]);
        }
        plat1.x=plat2.x=4000;
        plat1.visible=true;
        plat2.visible=true;

        Main.apuntaPunt(3);

        if(puntsMenjars>=5){
           Joc4.trionfa();
            return
        }
        var tm=setTimeout(Joc4.partida,1000);
        timeouts.push(tm);

    };

    this.trionfa=function(){

        if(beJoc4==undefined||beJoc4==null){
            beJoc4=new createjs.Bitmap(imatges["beJoc4"]);
            beJoc4.addEventListener("click",Joc4.reintentar);
        }
        Utils.pon(beJoc4,amp/2,alt/2,true);
        Audio.sonaaplaudiment();

    };

    this.rNum=function(rn){

        if(rn==receptaNum){
            if(izqPrimins){
                return receptaNum
            }else{
                return recepta2Num
            }
        }else{
            if(izqPrimins){
                return recepta2Num
            }else{
                return receptaNum
            }
        }
    };

    this.comprovaToca=function(e){


        tocs= e.nativeEvent.touches;

        for(var n=0;n<rebost.length;n++){//   C O M P R O V A   per a tots els ingredients de la taula:
            ///////////////////////  p e l   primer dit (esquerre?)    /////////////////////////
            if(Utils.dist(tocs[0].clientX*diPlat,tocs[0].clientY*diPlatY,rebost[n].x, rebost[n].y)<30){

                if(ingReceptes[Joc4.rNum(receptaNum)].indexOf(rebost[n])==-1){/// si toques un que no val...

                    timeouts.push(setTimeout(Joc4.perdre,800));
                    e.remove();// stage.off("pressmove",Joc4.moulos);
                    createjs.Tween.get(plat1).to({y:alt+90},500,createjs.Ease.quadOut);
                    createjs.Tween.get(plat2).to({y:alt+90},700,createjs.Ease.quadOut);
                    Audio.sonaminimec();
                    return
                }else{/// si toques un de bo
                    Audio.sonaingredient_ok();
                    stage.removeChild(rebost[n]);
                    var ali2=rebost[n];
                    rebost.splice(rebost.indexOf(rebost[n]),1);
                    stage.update();
                    stage.addChild(ali2);
                    ali2.x=tocs[0].clientX*diPlat;
                    ali2.y=tocs[0].clientY*diPlatY;
                    createjs.Tween.get(ali2).to({scaleX:2,scaleY:2,alpha:0},700,createjs.Ease.quadOut).call(function(){Joc4.restaura(ali2)});

                    Joc4.comprova2Fi();

                    break
                }
            }
            //////////////////       p e l   s e g o n     d i t     p o s a t   (d r e t?)     ////////////////
            if(Utils.dist(tocs[1].clientX*diPlat, tocs[1].clientY*diPlatY, rebost[n].x, rebost[n].y)<30){
                if(ingReceptes[Joc4.rNum(recepta2Num)].indexOf(rebost[n])==-1){/// si toques un que no val...

                    Audio.sonaminimec();
                    e.remove();//stage.off("pressmove",Joc4.moulos);
                    createjs.Tween.get(plat1).to({y:alt+90},700,createjs.Ease.quadOut);
                    createjs.Tween.get(plat2).to({y:alt+90},500,createjs.Ease.quadOut);
                    timeouts.push(setTimeout(Joc4.perdre,800));
                    return
                }else{/// si toques un de bo
                    //console.log("toques un de bo am el dit 2");
                    stage.removeChild(rebost[n]);
                    Audio.sonaingredient_ok();
                    var ali=rebost[n];
                    rebost.splice(rebost.indexOf(rebost[n]),1);
                    stage.update();
                    stage.addChild(ali);
                    ali.x=tocs[1].clientX*diPlat;
                    ali.y=tocs[1].clientY*diPlatY;
                    createjs.Tween.get(ali).to({scaleX:2,scaleY:2,alpha:0},700,createjs.Ease.quadOut).call(function(){Joc4.restaura(ali)});

                    Joc4.comprova2Fi();

                    break
                }
            }
        }
    };

    this.posaBack=function(){

        botBack=new createjs.Bitmap(imatges['bot1']);
        Utils.pon(botBack,20,alt-50);
        botBack.addEventListener("click",Joc4.aMenu);
    };

    this.aMenu=function(){

        createjs.Ticker.removeEventListener("tick",Joc4.handlerTick);
        createjs.Tween.removeAllTweens();
        for(var i=0;i<timeouts.length;i++){
            clearTimeout(timeouts[i]);
        }
        Menu.initMenu();
        Audio.sonatouch();
    }




};// fi Joc4