/**
 User: alfonso
 Data: 28/11/13 , 10:12
 */



Scores=new function (){

    var fons;
    var score1,score2,score3,score4;
    var titol;

    this.init=function(){

        fons=new createjs.Bitmap(imatges['taula']);
        Utils.pon(fons,0,0,false);


        if( titol == null || titol == undefined )
        {
            titol = new createjs.Text("menjars", "bold "+(50)+"px BoldinaTwo", "#f00");
            titol.textBaseline = "alphabetic";
            titol.mouseEnabled=false;
            titol.y = 40 ;
            titol.x = 50;
        }
        titol.text="puntuacions";
        stage.addChild(titol);


        if( score1 == null || score1 == undefined )
        {
            score1 = new createjs.Text("menjars", "bold "+(50)+"px BoldinaTwo", "#fff");
            score1.textBaseline = "alphabetic";
            score1.mouseEnabled=false;
            score1.y = 200 ;
            score1.x = 50;
        }
        score1.text="vestits: "+localDades.getItem("puntuacioJoc1")+" punts";
        stage.addChild(score1);

        if( score2 == null || score2 == undefined )
        {
            score2 = new createjs.Text("menjars", "bold "+(50)+"px BoldinaTwo", "#fff");
            score2.textBaseline = "alphabetic";
            score2.mouseEnabled=false;
            score2.y = 300 ;
            score2.x = 50;
        }
        score2.text="argolles: "+localDades.getItem("puntuacioJoc2")+" punts";
        stage.addChild(score2);

        if( score3 == null || score3 == undefined )
        {
            score3 = new createjs.Text("menjars", "bold "+(50)+"px BoldinaTwo", "#fff");
            score3.textBaseline = "alphabetic";
            score3.mouseEnabled=false;
            score3.y = 400 ;
            score3.x = 50;
        }
        score3.text="auques: "+localDades.getItem("puntuacioJoc3")+" punts";
        stage.addChild(score3);

        if( score4 == null || score4 == undefined )
        {
            score4 = new createjs.Text("menjars", "bold "+(50)+"px BoldinaTwo", "#fff");
            score4.textBaseline = "alphabetic";
            score4.mouseEnabled=false;
            score4.y = 500 ;
            score4.x = 50;
        }
        score4.text="vestits: "+localDades.getItem("puntuacioJoc4")+" punts";
        stage.addChild(score4);

        Scores.posaBack();
        stage.update();

    };


    this.posaBack=function(){

        botBack=new createjs.Bitmap(imatges['bot1']);
        Utils.pon(botBack,48,alt-40,true,.2);
        botBack.addEventListener("click",Scores.aMenu);

    };

    this.aMenu=function(){

        Menu.initMenu();

    }



};