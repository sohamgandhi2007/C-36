var database;
var  drawing=[];
var currentPath=[];
var isDrawing=false;

function setup() {
    canvas= createCanvas(100,100);
    canvas.mousePressed(startPath);
    canvas.parent("canvascontainer");
//    canvas.mouseReleased(endPath);
    
var saveButton=select("#saveButton")
saveButton.mousePressed(saveDrawing)

var clearButton=select("#clearButton")
clearButton.mousePressed(clearDrawing)


var firebaseConfig = {
    apiKey: "AIzaSyB5D16kD9JlqRVQ-TiDTCIdR5SSqfoVVCE",
    authDomain: "survey-befa3.firebaseapp.com",
    databaseURL: "https://survey-befa3.firebaseio.com",
    projectId: "survey-befa3",
    storageBucket: "survey-befa3.appspot.com",
    messagingSenderId: "625851805784",
    appId: "1:625851805784:web:b223f3e917d388b6035a2d"
  };

firebase.initalizeapp(config);
database=firebase.database();
var ref=database.ref("drawings")
ref.on("value",gotdata,errdata)

var parmas =getURLParmas();
console.log(parmas);
if(parmas.id){
console.log(parmas.id);
showDrawing(parmas.id)
}
}

function startPath() {
    isDrawing=true;
    currentPath=[];
    drawing.push(currentPath)
}

function endPath(){ 
isDrawing=false;
}

function draw() {
    background("Yellow")
 
    if(isDrawing){
     var point={
         x:mouseX,
         y:mouseY
     }
     currentPath.push(point);
    }
    beginShape();
    stroke("white");
    strokeWeight(4);
    nofil();
    for(var i=0;i< drawing.length;i++)
    var path=drawing[i];
    for(var j=0;j< drawing.length;j++)
vertex(drawing[j],x,drawing[1],y)

endShape();

}

function saveDrawing(){
var ref=firebase.ref("drawings")
var data={
    name:"Dan",
    drawing:drawing
}
  var result =ref.push(data, dataSent);
  console.log(result.key)

function dataSent() {
    console.log(status);
}
}

function gotData(data) {
   
   
   var elts =selectAll(".listing")
   for(var i=0;i<elts.length;i++){
       elts[i].remove();
   }

    var drawings=data.val();
    var keys=Object.keys(drawings);
    for(var i=0; i<keys.length;i++)
    var keys=keys[i];
    //console.log(key)
    var li=createElement("li",key);
    li.class("listing");
    var ahref= createA("#",key)
    ahref.mousePressed(showDrawing)
    ahref.parent(li);

 var perma=createA("?id="+key,"permalink");
 perma.parent(li);   

    li.parent("drawinglist")
}

function errData(data){
    console.log(err);
}

function showDrawing(key) {
    console.log(arguments);
   if(key instanceof MouseEvent){
    var key=this.html();
   }
    var ref=database.ref("drawings/"+key);
    ref.once("value",oneDrawing,errdata);
}

function oneDrawing(data) {
    var dbdrawing=data.val();
    Drawing=dbdrawing.drawing
    console.log(drawing);
}

function clearDrawing() {
    drawing=[];
}