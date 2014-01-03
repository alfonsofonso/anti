/**
 User: alfonso
 Data: 4/11/13 , 9:45
 */
var posRoba;
var arrR;// array contenidors roba
var M_arr;// array contenidors roba que no toca
var Marr;// array roba q no toca
var vestit_arr;
var posicio;

Joc1=new function(){

    var jugador;
    var vestits;
    var arrPersons;//array personatges
    var quinPerson;
    var burgesos,camperols,aristocratos,duquesas;//array burgesos
    var fons;
    var burges, caient, agafat, burgesFi;
    var camperola, campCaient,campAgafat,campFi;
    var aristocrato,arisCaient,arisAgafat,arisFi;
    var duquesa,duqCaient,duqAgafada,duqFi;
    var corda1,corda2,corda3,corda4,corda5;
    var R1,R2,R3,R4,R5;//contenidors roba
    var M1,M2,M3,M4,M5; /// roba q no toca;
    var M_1,M_2,M_3,M_4,M_5;// contenidors roba q no toca
    var burgesR1, burgesR2, burgesR3, burgesR4, burgesR5;// roba del burges
    var campR1,campR2,campR3,campR4,campR5;
    var arisR1,arisR2,arisR3,arisR4,arisR5;
    var duqR1,duqR2,duqR3,duqR4,duqR5;
    var tocant;
    var igrega;

    var posicions;
    var par;//frameRate parell?

    var vestitsText;
    var timeouts;
    var beJoc1,malJoc1;
    var prevpos;

    var ref1,ref2,ref3,ref4,ref5; /// ajuda roba
    var ref_arr;
    var marcRef;

    var Bc1,Bc2,Bc3,Bc4,Bc5,Ba1,Ba2,Ba3,Ba4,Ba5,Bs1,Bs2,Bs3,Bs4,Bs5;
    var Cc1,Cc2,Cc3,Cc4,Cc5,Ca1,Ca2,Ca3,Ca4,Ca5,Cs1,Cs2,Cs3,Cs4,Cs5;
    var Ac1,Ac2,Ac3,Ac4,Ac5,Aa1,Aa2,Aa3,Aa4,Aa5,As1,As2,As3,As4,As5;
    var Dc1,Dc2,Dc3,Dc4,Dc5,Da1,Da2,Da3,Da4,Da5,Ds1,Ds2,Ds3,Ds4,Ds5;


    this.init=function(){ ////////////////////////////////    V E S T I T S

        posicions=[-2,175,300,425,550,675];
        par=true;
        posicio=0;
        tocant=false;
        vestit=[];
        prevpos=true;
            //listeners
        createjs.Ticker.addEventListener("tick", Joc1.handlerTick);

        stage.addEventListener("stagemousedown",Joc1.toc);
        stage.addEventListener("stagemouseup",Joc1.dixa);

        //objectes visuals
        fons=new createjs.Bitmap(imatges['fons']);
        Utils.pon(fons,0,0,false);

        jugador = new createjs.Container();

        corda1=new createjs.Bitmap(imatges['corda']); /// cordes
        corda2=new createjs.Bitmap(imatges['corda']);
        corda3=new createjs.Bitmap(imatges['corda']);
        corda4=new createjs.Bitmap(imatges['corda']);
        corda5=new createjs.Bitmap(imatges['corda']);
        Utils.pon(corda1,-10,posicions[1],false);//120
        Utils.pon(corda2,-10,posicions[2],false);//200
        Utils.pon(corda3,-10,posicions[3],false);//280
        Utils.pon(corda4,-10,posicions[4],false);//360
        Utils.pon(corda5,-10,posicions[5],false);//440

        R1 = new createjs.Container(); ////////////////// roba
        R2 = new createjs.Container();
        R3 = new createjs.Container();
        R4 = new createjs.Container();
        R5 = new createjs.Container();

        M_1 = new createjs.Container(); ////////////////// roba
        M_2 = new createjs.Container();
        M_3 = new createjs.Container();
        M_4 = new createjs.Container();
        M_5 = new createjs.Container();

        arrR=new Array(R1,R2,R3,R4,R5);
        M_arr=new Array(M_1,M_2,M_3,M_4,M_5);
        Marr=new Array();



        // [burg,camp,aris,duqu][caient,agafat,salt][1-5 peça]
        posRoba=[[[Bc1,Bc2,Bc3,Bc4,Bc5],[Ba1,Ba2,Ba3,Ba4,Ba5],[Bs1,Bs2,Bs3,Bs4,Bs5]],
                 [[Cc1,Cc2,Cc3,Cc4,Cc5],[Ca1,Ca2,Ca3,Ca4,Ca5],[Cs1,Cs2,Cs3,Cs4,Cs5]],
                 [[Ac1,Ac2,Ac3,Ac4,Ac5],[Aa1,Aa2,Aa3,Aa4,Aa5],[As1,As2,As3,As4,As5]],
                 [[Dc1,Dc2,Dc3,Dc4,Dc5],[Da1,Da2,Da3,Da4,Da5],[Ds1,Ds2,Ds3,Ds4,Ds5]]];
        var posRobaNames=[[["Bc1","Bc2","Bc3","Bc4","Bc5"],["Ba1","Ba2","Ba3","Ba4","Ba5"],["Bs1","Bs2","Bs3","Bs4","Bs5"]],
            [["Cc1","Cc2","Cc3","Cc4","Cc5"],["Ca1","Ca2","Ca3","Ca4","Ca5"],["Cs1","Cs2","Cs3","Cs4","Cs5"]],
            [["Ac1","Ac2","Ac3","Ac4","Ac5"],["Aa1","Aa2","Aa3","Aa4","Aa5"],["As1","As2","As3","As4","As5"]],
            [["Dc1","Dc2","Dc3","Dc4","Dc5"],["Da1","Da2","Da3","Da4","Da5"],["Ds1","Ds2","Ds3","Ds4","Ds5"]]];

        for(var i1=0;i1<4;i1++){ /// definicio de variables de peçes de roba
            for(var i2=0;i2<3;i2++){
                for (var i3=0;i3<5;i3++){

                    posRoba[i1][i2][i3]=new createjs.Bitmap(imatges[ posRobaNames[i1][i2][i3]]);
                }
            }
        }

        vestits=parseInt(localDades.getItem("puntuacioJoc1"));///////////////////////// puntacio  ///
        if( vestitsText == null || vestitsText == undefined )
        {
            vestitsText = new createjs.Text(vestits+"/10", "bold "+(70/RESOLUTION)+"px BoldinaTwo", "#ffffff");
            vestitsText.textBaseline = "alphabetic";
            vestitsText.y = alt/20;
            vestitsText.x = amp/2-8;
        }
        vestitsText.text=vestits+"/10";
        stage.addChild(vestitsText);

        Joc1.comenzar();
        Joc1.posaBack();

    };


    this.comenzar=function(){

        quinPerson=Math.floor(Math.random()*4);
        Joc1.creaPersonatges(quinPerson);

        arrPersons=[burgesos,camperols,aristocratos,duquesas];
      //  personatge=arrPersons[quinPerson];// persons=
        jugador.scaleX=jugador.scaleY=1;
        stage.addChild(jugador);

        vestitsText.text=vestits+"/10";
        //Main.apuntaPunt(0);
        vestit=[];

        posicio=0;
        timeouts=[];
        jugador.x=30;jugador.y=-30;
        jugador.removeAllChildren();
        vestit_arr=[];

        jugador.addChild(arrPersons[quinPerson][0]);
        jugador.alpha=1;
        Joc1.estendreRoba(quinPerson);
        Joc1.saltet();

    };

    this.estendreRoba=function(num){

        for(var rr=0;rr<arrR.length;rr++){//////////////////////////////////////////   ROBA BONA
            arrR[rr].removeAllChildren();
            stage.addChild(arrR[rr]);
            arrR[rr].y=posicions[rr+1]-1;
            arrR[rr].x=Math.random()*640+80;
            arrR[rr].alpha=1;
        }


        if(num==0){ /// si burges
            burgesR1=new createjs.Bitmap(imatges['burgesR1']);
            burgesR2=new createjs.Bitmap(imatges['burgesR2']);
            burgesR3=new createjs.Bitmap(imatges['burgesR3']);
            burgesR4=new createjs.Bitmap(imatges['burgesR4']);
            burgesR5=new createjs.Bitmap(imatges['burgesR5']);

            Utils.pon(burgesR1,0,0,false,1,R1);
            Utils.pon(burgesR2,0,0,false,1,R2);
            Utils.pon(burgesR3,0,0,false,1,R3);
            Utils.pon(burgesR4,0,0,false,1,R4);
            Utils.pon(burgesR5,0,0,false,1,R5);

            M1=new createjs.Bitmap(imatges["duqR1"]);// roba mala
            M2=new createjs.Bitmap(imatges["campR2"]);
            M3=new createjs.Bitmap(imatges["arisR3"]);
            M4=new createjs.Bitmap(imatges["duqR4"]);
            M5=new createjs.Bitmap(imatges["campR5"]);

            ref1=new createjs.Bitmap(imatges['burgesR1']);// referencias roba
            ref2=new createjs.Bitmap(imatges['burgesR2']);
            ref3=new createjs.Bitmap(imatges['burgesR3']);
            ref4=new createjs.Bitmap(imatges['burgesR4']);
            ref5=new createjs.Bitmap(imatges['burgesR5']);

        } else if(num==1){// si camperola
            campR1=new createjs.Bitmap(imatges['campR1']);
            campR2=new createjs.Bitmap(imatges['campR2']);
            campR3=new createjs.Bitmap(imatges['campR3']);
            campR4=new createjs.Bitmap(imatges['campR4']);
            campR5=new createjs.Bitmap(imatges['campR5']);

            Utils.pon(campR1,0,0,false,1,R1);
            Utils.pon(campR2,0,0,false,1,R2);
            Utils.pon(campR3,0,0,false,1,R3);
            Utils.pon(campR4,0,0,false,1,R4);
            Utils.pon(campR5,0,0,false,1,R5);

            M1=new createjs.Bitmap(imatges["duqR5"]);// roba mala
            M2=new createjs.Bitmap(imatges["burgesR4"]);
            M3=new createjs.Bitmap(imatges["arisR3"]);
            M4=new createjs.Bitmap(imatges["duqR2"]);
            M5=new createjs.Bitmap(imatges["burgesR1"]);

            ref1=new createjs.Bitmap(imatges['campR1']);// referencias roba
            ref2=new createjs.Bitmap(imatges['campR2']);
            ref3=new createjs.Bitmap(imatges['campR3']);
            ref4=new createjs.Bitmap(imatges['campR4']);
            ref5=new createjs.Bitmap(imatges['campR5']);

        } else if(num==2){// si aristocrato
            arisR1=new createjs.Bitmap(imatges['arisR1']);
            arisR2=new createjs.Bitmap(imatges['arisR2']);
            arisR3=new createjs.Bitmap(imatges['arisR3']);
            arisR4=new createjs.Bitmap(imatges['arisR4']);
            arisR5=new createjs.Bitmap(imatges['arisR5']);

            Utils.pon(arisR1,0,0,false,1,R1);
            Utils.pon(arisR2,0,0,false,1,R2);
            Utils.pon(arisR3,0,0,false,1,R3);
            Utils.pon(arisR4,0,0,false,1,R4);
            Utils.pon(arisR5,0,0,false,1,R5);

            M1=new createjs.Bitmap(imatges["duqR2"]);// roba mala
            M2=new createjs.Bitmap(imatges["campR3"]);
            M3=new createjs.Bitmap(imatges["burgesR1"]);
            M4=new createjs.Bitmap(imatges["duqR5"]);
            M5=new createjs.Bitmap(imatges["campR1"]);

            ref1=new createjs.Bitmap(imatges['arisR1']);// referencias roba
            ref2=new createjs.Bitmap(imatges['arisR2']);
            ref3=new createjs.Bitmap(imatges['arisR3']);
            ref4=new createjs.Bitmap(imatges['arisR4']);
            ref5=new createjs.Bitmap(imatges['arisR5']);

        } else { // si cortesana
            duqR1=new createjs.Bitmap(imatges['duqR1']);
            duqR2=new createjs.Bitmap(imatges['duqR2']);
            duqR3=new createjs.Bitmap(imatges['duqR3']);
            duqR4=new createjs.Bitmap(imatges['duqR4']);
            duqR5=new createjs.Bitmap(imatges['duqR5']);

            Utils.pon(duqR1,0,0,false,1,R1);
            Utils.pon(duqR2,0,0,false,1,R2);
            Utils.pon(duqR3,0,0,false,1,R3);
            Utils.pon(duqR4,0,0,false,1,R4);
            Utils.pon(duqR5,0,0,false,1,R5);

            M1=new createjs.Bitmap(imatges["burgesR3"]);// roba mala
            M2=new createjs.Bitmap(imatges["campR4"]);
            M3=new createjs.Bitmap(imatges["arisR5"]);
            M4=new createjs.Bitmap(imatges["burgesR1"]);
            M5=new createjs.Bitmap(imatges["campR2"]);

            ref1=new createjs.Bitmap(imatges['duqR1']);// referencias roba
            ref2=new createjs.Bitmap(imatges['duqR2']);
            ref3=new createjs.Bitmap(imatges['duqR3']);
            ref4=new createjs.Bitmap(imatges['duqR4']);
            ref5=new createjs.Bitmap(imatges['duqR5']);

        }

        Marr=[M1,M2,M3,M4,M5];

        ////////////////////////////////// posar roba mala
        for(var m= 0;m<M_arr.length;m++){
            M_arr[m].removeAllChildren();
            var gg=arrR[m].x+360;
            if(gg>720){ gg-=580}
            M_arr[m].x=gg;
            M_arr[m].y=posicions[m+1];
            M_arr[m].alpha=1;
            M_arr[m].addChild(Marr[m]);
            stage.addChild(M_arr[m]);
        }

        if(marcRef==null || marcRef==undefined){    /////  Punts
            marcRef=new createjs.Shape();
            marcRef.graphics.beginFill("#ffffff").drawRoundRect(20, 830, 500, 140, 20);
        }
        marcRef.alpha=.7;
        stage.addChild(marcRef);


        ref_arr=[ref1,ref2,ref3,ref4,ref5];// referencies
        for(var r=0;r<ref_arr.length;r++){
            stage.removeChild(ref_arr[r]);
        }
        for(var ref=0;ref<ref_arr.length;ref++){
            Utils.pon(ref_arr[ref],70+ref*100,alt/6*5,true,1,stage);
        }
    };


    this.creaPersonatges=function(num){

        if(num==0){// el burgés
            burges=new createjs.Bitmap(imatges['burges']);
            caient=new createjs.Bitmap(imatges['caient']);
            agafat=new createjs.Bitmap(imatges['agafat']);
            burgesFi=new createjs.Bitmap(imatges['burgesFi']);
            burgesos=new Array(burges,caient,agafat,burgesFi);
        }else if(num==1){
            console.log("creo camperola");
            camperola=new createjs.Bitmap(imatges['camperola']);
            campCaient=new createjs.Bitmap(imatges['campCaient']);
            campAgafat=new createjs.Bitmap(imatges['campAgafat']);
            campFi=new createjs.Bitmap(imatges['campFi']);
            camperols=new Array(camperola,campCaient,campAgafat,campFi);
        }else if(num==2){
            console.log("creo aristocrato");
            aristocrato=new createjs.Bitmap(imatges['aristocrato']);
            arisCaient=new createjs.Bitmap(imatges['arisCaient']);
            arisAgafat=new createjs.Bitmap(imatges['arisAgafat']);
            arisFi=new createjs.Bitmap(imatges['arisFi']);
            aristocratos=new Array(aristocrato,arisCaient,arisAgafat,arisFi);
        }else{
            console.log("creo duquesa");
            duquesa=new createjs.Bitmap(imatges['duquesa']);
            duqCaient=new createjs.Bitmap(imatges['duqCaient']);
            duqAgafada=new createjs.Bitmap(imatges['duqAgafada']);
            duqFi=new createjs.Bitmap(imatges['duqFi']);
            duquesas=new Array(duquesa,duqCaient,duqAgafada,duqFi);
        }
    };

    ///////////////////////////////////////////////////////////////////////////////// interaccio //////////////////////////////
    this.toc=function(e){

      tocant=true;
      igrega= e.stageY;

    };

    this.dixa=function(e){

        if(igrega- e.stageY>0 && tocant){
            Joc1.salta();
            tocant=false;
        }else if (tocant){
            Joc1.cau();
            tocant=false;
        }
        Audio.sonasalt();
    };

    this.cau=function(){//deixa caure

        if (posicio>4){
            Joc1.saltFinal();
            return
        }
        //posicio++;


        jugador.removeAllChildren();
        Joc1.vestitAmb("caient");
        prevpos=true;
        createjs.Tween.get(jugador,{override:true}).to({y:posicions[posicio+1]-7},400,createjs.Ease.quintIn).call(Joc1.agafat);

    };

    this.agafat=function(){
        if(prevpos){posicio++}else{posicio--}

        if(Math.abs(jugador.x-arrR[posicio-1].x)<70 && vestit_arr.indexOf(posicio-1)==-1){// agafa roba

            if(vestit_arr.length>=posicio){// capes de roba (ordre)
                vestit_arr.unshift(posicio-1);
            }else{
                vestit_arr.push(posicio-1);
            }
            vestit_arr.sort();
            Audio.sonaagafa_peca_roba();
           // createjs.Tween.get(arrR[posicio-1]).to({x:ref_arr[posicio-1].x,y:ref_arr[posicio-1].y,alpha:0},1000,createjs.Ease.quadOut);
            stage.removeChild(arrR[posicio-1]);
            createjs.Tween.get(ref_arr[posicio-1]).to({alpha:0,scaleX:.8,scaleY:.8},1000,createjs.Ease.elasticIn);



        }
        if(Math.abs(jugador.x-M_arr[posicio-1].x)<60){// agafa roba dolenta
            createjs.Tween.get(M_arr[posicio-1],{override:true}).to({y:1080,rotation:Math.random()*720-360},1000-M_arr[posicio-1].y,createjs.Ease.quintIn);
            Joc1.fi();
            Audio.sonaminimec();
        }

        jugador.removeAllChildren();
        Joc1.vestitAmb("agafat");
    };


    this.salta=function(){// cap amunt

        jugador.removeAllChildren();

        Joc1.vestitAmb("salta");

        if(posicio==0){
           createjs.Tween.get(jugador,{override:true}).to({y:-20},200,createjs.Ease.quintOut).call(Joc1.saltet);
            return
        }else if(posicio==1){
           createjs.Tween.get(jugador,{override:true}).to({y:10},600,createjs.Ease.quintOut).call(Joc1.fi);
            return
        }

        prevpos=false;
        createjs.Tween.get(jugador,{override:true}).to({y:posicions[posicio-1]-7},400,createjs.Ease.backOut).call(Joc1.agafat);

    };

    this.vestitAmb=function(momen){
        var quan;
        if(momen=="caient"){
            jugador.addChild(arrPersons[quinPerson][1]);
           quan=0;
        }else if(momen=="agafat"){
            jugador.addChild(arrPersons[quinPerson][2]);
            quan=1;
        }else{     /// salta
            jugador.addChild(arrPersons[quinPerson][0]);
            quan=2;
        }

        for(var i=0;i<vestit_arr.length;i++){

            jugador.addChild(posRoba[quinPerson][quan][vestit_arr[i]]);
        }

    };

    this.saltet=function(){// al principi
        Audio.sonasalt();
        createjs.Tween.get(jugador,{override:true}).to({y:posicions[0]},600,createjs.Ease.bounceOut);

    };

    this.saltFinal=function(){//caure desde la darrera corda
        posicio=6;
        if(jugador.x>530){
            jugador.removeAllChildren();
            //jugador.addChild(arrPersons[quinPerson][0]);
            Joc1.vestitAmb("salta");
            createjs.Tween.get(jugador,{override:true}).to({x:600,y:760},500,createjs.Ease.bounceOut).call(Joc1.comprova);

        }else{
            Joc1.fi();
        }

    };

    this.comprova=function(){

        if(vestit_arr.length>4){
            jugador.y=760;
            Joc1.vestitAmb("salta");
            createjs.Tween.get(jugador,{override:true}).to({scaleX:.8,scaleY:.8,x:680,y:790,alpha:0},1200,createjs.Ease.cubicIn);
            jugador.removeAllChildren();
            jugador.addChild(arrPersons[quinPerson][3]);
            vestits++;
            vestitsText.text=vestits+"/10";
            Main.apuntaPunt(0);
            Audio.sonapersonatge_ok();
            if(vestits>9){
               timeouts.push(setTimeout( Joc1.guanyar,1300));
                return
            }
            timeouts.push(setTimeout(Joc1.comenzar,1300));

        }
    };

    this.guanyar=function(){

        if(beJoc1==undefined || beJoc1==null){
            beJoc1=new createjs.Bitmap(imatges["beJoc1"]);
            beJoc1.addEventListener("click",Joc1.reintentar);

        }
        Audio.sonaaplaudiment();

        Utils.pon(beJoc1,amp/2,alt/2,true);
    };

    this.fi=function(){///////////////////////////// CAIGUDA
        jugador.removeAllChildren();
        Joc1.vestitAmb("caient");
        createjs.Tween.get(jugador,{override:true}).to({y:1080},1000-jugador.y,createjs.Ease.quintIn).call(Joc1.mort);
    };

    this.mort=function(){ /// mort

       Audio.sonafi_ko();
       if(malJoc1==undefined || malJoc1==null){
           malJoc1=new createjs.Bitmap(imatges["malJoc1"]);
           malJoc1.addEventListener("click",Joc1.reintentar);
       }
       Utils.pon(malJoc1,amp/2,alt/2,true);
    };

    this.reintentar=function(){
        Audio.sonatouch();
        for(var m=0;m<M_arr.length;m++){
            M_arr[m].removeChild(Marr[m]);
            M_arr[m].rotation=0;
            stage.removeChild(ref_arr[m]);
        }
        Marr=[];
        stage.removeChild(malJoc1);
        stage.removeChild(beJoc1);/// falla a la versio web per iOS?
        Joc1.comenzar();
    };


    this.handlerTick=function(){ ///////////////////////////////   T I C K  /////

        if(par){
            corda1.x+=3;
            corda2.x-=3;
            corda3.x+=3;
            corda4.x-=3;
            corda5.x+=3;
            par=false;
        }else{
            corda1.x-=3;
            corda2.x+=3;
            corda3.x-=3;
            corda4.x+=3;
            corda5.x-=3;
            par=true;
        }

        R1.x>720?R1.x=-80:R1.x+=6.6;
        R2.x<-80?R2.x=720:R2.x-=7;
        R3.x>720?R3.x=-80:R3.x+=6.6;
        R4.x<-80?R4.x=720:R4.x-=7;
        R5.x>720?R5.x=-80:R5.x+=6.6;

        M_1.x>720?M_1.x=-80:M_1.x+=6.6;
        M_2.x<-80?M_2.x=720:M_2.x-=7;
        M_3.x>720?M_3.x=-80:M_3.x+=6.6;
        M_4.x<-80?M_4.x=720:M_4.x-=7;
        M_5.x>720?M_5.x=-80:M_5.x+=6.6;

        if(posicio==2||posicio==4){// cordes 2 i 4 van cap a la esquerra
            jugador.x<-80?jugador.x=720:jugador.x-=7;
           }else if(posicio==1||posicio==3||posicio==5){/// cordes 1, 3 i 5 cap a la dreta
            jugador.x>720?jugador.x=-80:jugador.x+=6.6;
        }
        stage.update();

    };

    this.posaBack=function(){

        botBack=new createjs.Bitmap(imatges['bot1']);
        Utils.pon(botBack,20,alt-50,false);
        botBack.addEventListener("click",Joc1.aMenu);
    };

    this.aMenu=function(){

        createjs.Ticker.removeEventListener("tick",Joc1.handlerTick);
        createjs.Tween.removeAllTweens();
        for(var i=0;i<timeouts.length;i++){
            clearTimeout(timeouts[i]);
        }
        Menu.initMenu();
        Audio.sonatouch();

    }

};