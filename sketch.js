let mic;

function setup() {
  createCanvas(400, 400);
  //set up the microphone to use the audio in class
  mic = new p5.AudioIn();

  //start the mic and request the browser to ask for it
  mic.start();
}

function draw() {
  background(220);

  let micLevel = get.micLevel(); //gives us a value from ZERO TO ONE

  // map(value, start1, stop1, start2, stop2, [withinBounds])
  // so like from 0, 1, we convert 0 to 10 and then 1 to 10
  // 0.5, 0, 1, 50, 100
  // 0.5 -> 0:1 is 1:2, because that's equivalent to 0:1 
  let mappedLevel = map(micLevel, 0, 1, 10, 100);

  console.log("original:" + micLevel);
  console.log("mapped: " + mappedLevel);


  circle(mouseX, mouseY, micLevel);

}