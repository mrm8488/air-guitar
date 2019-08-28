const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 1, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.89 // confidence threshold for predictions.
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
let model;

handTrack.startVideo(video).then(status => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      stream => {
        video.srcObject = stream;
        setInterval(runDetection, 100);
      },
      error => console.error(error)
    );
  }
});

const runDetection = () => {
  model.detect(video).then(predictions => {
    console.log(predictions);
    if (predictions.length) {
      let hand1 = predictions[0].bbox;
      let x = hand1[0];
      let y = hand1[1];

      if (y > 300) {
        if (x < 200) {
          audio.src = "./A.mp3";
        } else if (x > 400) {
          audio.src = "./E.mp3";
        } else if (x > 300) {
          audio.src = "./C.mp3";
        } else if (x > 200) {
          audio.src = "./B.mp3";
        }
      }

      audio.play();
    }
  });
};

handTrack.load().then(lmodel => (model = lmodel));
