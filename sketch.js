let mic;
let recorder;

let recordingState = 0;
let sounds = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //set up the microphone to use the audio in class
  mic = new p5.AudioIn();

  //start the mic and request the browser to ask for it
  mic.start();

  recorder = new p5.SoundRecorder();
  recorder.setInput(mic); //this sets the input to the mic global variable 
}

function draw() {
  // background(220);

  let micLevel = mic.getLevel(); //gives us a value from ZERO TO ONE

  // map(value, start1, stop1, start2, stop2, [withinBounds])
  // so like from 0, 1, we convert 0 to 10 and then 1 to 10
  // 0.5, 0, 1, 50, 100
  // 0.5 -> 0:1 is 1:2, because that's equivalent to 0:1 
  let mappedLevel = map(micLevel, 0, 1, 20, 100);


  console.log("original:" + micLevel);
  console.log("mapped: " + mappedLevel);


  circle(mouseX, mouseY, mappedLevel);
}

function keyPressed() {
  if (keyCode == 32) { //spacebar
    if (recordingState == 0) {

      if (sounds.length > 0 && sounds[sounds.length - 1].isPlaying()) {
        sounds[sounds.length - 1].stop();
      }
      //creating a local sound file to store the recording
      let sound = new p5.SoundFile(); //this needs to be stored in an array in our sketch
      sounds.push(sound); //push this sound file into the global array sounds[]

      //start recording the sound
      recorder.record(sound);

      background('red');

      recordingState = 1;
    } else if (recordingState == 1) {
      recorder.stop();

      background('lightpink');

      recordingState = 2;
    } else if (recordingState == 2) {
      sounds[sounds.length - 1].loop();

      background('lightgreen');
      recordingState = 0;
    }
  }
}