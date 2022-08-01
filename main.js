var img = "";
var Status = "";
var objects = [];
var objectDetector = "";

function preload(){
    img = loadImage('dog_cat.jpg');
}

function setup() 
{ canvas = createCanvas(380, 400);
  canvas.center(); 
  video = createCapture(VIDEO);
  video.size(380,400);
  video.hide();
}

function modelLoaded(){
    console.log("Model Loaded");
    Status = true;
    objectDetector.detect(video, gotResult);
}

function draw(){
    image(video, 0, 0, 380, 400);
    if (Status != "")
    {
      r = random(255);
      g = random(255);
      b = random(255);
      objectDetector.detect(video, gotResult);
      for (i = 0; i < objects.length; i++)
      {
        document.getElementById("status").innerHTML= "Status : object detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects are detected";
        
        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

      }
    }
} 

function gotResult(error, results) {
    if (error){
      console.error(error, "error");
    }
    console.log(results, "results");
    objects = results;
}
function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}