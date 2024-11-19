const constraints = {
    "video": true, 
    "audio": true
}
const localVideo = document.querySelector('video');
let localStream; 

function Stream(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
}

navigator.mediaDevices.getUserMedia(constraints).then(stream => {
    console.log("Got MediaStream:", stream);
    Stream(stream);
})
.catch(error => {
    console.error("Error accessing media devices.", error);
})