/**
 User: alfonso
 Data: 29/01/14 , 15:03
 */

var currentRiff;

var Riff= new function(){

    this.initialRiff=function(){

        melodiaBajo=[{nota:"aB",duracion:2},{nota:"aB",duracion:0},{nota:"aB",duracion:1},{nota:"aB",duracion:2},
            {nota:"aB",duracion:0},{nota:"aB",duracion:1},{nota:"aB",duracion:1},{nota:"aB",duracion:1},
            {nota:"fB",duracion:2},{nota:"fB",duracion:0},{nota:"fB",duracion:1},{nota:"gB",duracion:2},
            {nota:"gB",duracion:0},{nota:"gB",duracion:1},{nota:"gB",duracion:1},{nota:"gB",duracion:1}];
        melodiaBate=[{nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0},
            {nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0},
            {nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0},
            {nota:"caj",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0}];
        melodiaGuit=[{nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},
            {nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},{nota:"aG",duracion:0},
            {nota:"fG",duracion:0},{nota:"fG",duracion:0},{nota:"fG",duracion:0},{nota:"gG",duracion:0},
            {nota:"gG",duracion:0},{nota:"gG",duracion:0},{nota:"gG",duracion:0},{nota:"gG",duracion:0}];

    };


    this.corriendo=function(){ // pone bateria riff

        melodiaBate=[{nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
                     {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
                     {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
                     {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1}];
    };


    this.luchando=function(){// pone guitarra riff

        melodiaGuit=[{nota:"aG",duracion:2},{nota:"aG",duracion:0},{nota:"aG",duracion:1},{nota:"aG",duracion:2},
                     {nota:"aG",duracion:0},{nota:"aG",duracion:1},{nota:"aG",duracion:1},{nota:"aG",duracion:1},
                     {nota:"fG",duracion:2},{nota:"fG",duracion:0},{nota:"fG",duracion:1},{nota:"gG",duracion:2},
                     {nota:"gG",duracion:0},{nota:"gG",duracion:1},{nota:"gG",duracion:1},{nota:"gG",duracion:1}];

        melodiaBate=[{nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
            {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
            {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1},
            {nota:"caj",duracion:1},{nota:"bom",duracion:1},{nota:"caj",duracion:1},{nota:"bom",duracion:1}];
    };

    this.mutea=function(cual){// quita riff de...

        switch (cual) {
            case "guitarra": for(var i=0;i<melodiaGuit.length;i++){melodiaGuit[i].duracion=0}
                break;
            case "bajo": for(var j=0;j<melodiaBajo.length;j++){melodiaBajo[j].duracion=0}
                break;
            case "bateria": for(var k=0;k<melodiaBate.length;k++){melodiaBate[k].duracion=0}
                break;
        }
    };

    this.toqueMortal=function(){
        melodiaBajo=[{nota:"fB",duracion:7},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"aB",duracion:0},
            {nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"fB",duracion:1},
            {nota:"gB",duracion:8},{nota:"fB",duracion:0},{nota:"fB",duracion:0},{nota:"gB",duracion:0},
            {nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0}];

        melodiaBate=[{nota:"tom",duracion:0},{nota:"tom",duracion:1},{nota:"tom",duracion:1},{nota:"tom",duracion:1},
            {nota:"tom",duracion:1},{nota:"tom",duracion:1},{nota:"tom",duracion:1},{nota:"tom",duracion:1},
            {nota:"tom",duracion:1},{nota:"tom",duracion:0},{nota:"tom",duracion:0},{nota:"bom",duracion:1},
            {nota:"bom",duracion:3},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0}];

        melodiaGuit=[{nota:"fG",duracion:7},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"aB",duracion:0},
            {nota:"aG",duracion:0},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"fG",duracion:1},
            {nota:"gG",duracion:8},{nota:"fB",duracion:0},{nota:"fB",duracion:0},{nota:"gB",duracion:0},
            {nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0}];
    };


    this.funebre=function(){

        melodiaBajo=[{nota:"aB",duracion:4},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"aB",duracion:0},
            {nota:"aB",duracion:3},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"aB",duracion:1},
            {nota:"aB",duracion:8},{nota:"fB",duracion:0},{nota:"fB",duracion:0},{nota:"gB",duracion:0},
            {nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0}];

        melodiaBate=[{nota:"crs",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:1},
            {nota:"bom",duracion:3},{nota:"caj",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0},
            {nota:"crs",duracion:0},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:1},
            {nota:"bom",duracion:3},{nota:"bom",duracion:0},{nota:"caj",duracion:0},{nota:"bom",duracion:0}];

        melodiaGuit=[{nota:"aG",duracion:4},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"aB",duracion:0},
            {nota:"aG",duracion:3},{nota:"aB",duracion:0},{nota:"aB",duracion:0},{nota:"aG",duracion:1},
            {nota:"aG",duracion:8},{nota:"fB",duracion:0},{nota:"fB",duracion:0},{nota:"gB",duracion:0},
            {nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0},{nota:"gB",duracion:0}];
    };



};