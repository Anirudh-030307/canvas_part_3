var database;
var drawing = [] ;
var currentPath = [] ;
var isDrawing = false ;

function setup() {
  var canvas = createCanvas(800,500);
  canvas.mousePressed(startPath); 
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

  database = firebase.database();

  var ref = database.ref('drawings');
  ref.on('value',gotData,errData);
  
}

function startPath() {
  isDrawing = true ;
  currentPath = [];
  drawing.push(currentPath);
}

 function endPath() {
  isDrawing = false ;
 }

function draw() {
  background(0);  

  if (isDrawing) {
    var point ={
      x : mouseX,
      y : mouseY
    }
  currentPath.push(point);
  }

  stroke(255);
  strokeWeight(4);
  noFill();
  for (var i = 0 ; i < drawing.length ; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0 ; j < path.length ; j++) {
      vertex(path[j].x , path[j].y)
    }
    endShape(); 
  }

}
 

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name : "name",
    drawing : drawing
  }
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err,status) {
    console.log(status);
  }

}

function gotData(data) {
  var drawings = data.val();
  var keys = Object.keys(drawing);
  for (var i = 0; i < keys.length; i++) {
    var keys = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    var ahref = createA('#',key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
} 

function showDrawing() {
  console.log(this.html());
}

function clearDrawing() {
  drawing = [];
}