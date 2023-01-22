const video = document.getElementById("video")
let recordingChunk = [];
let stream = null;
async function startRecording() {
    video.style.display = "block"
    recordingChunk = [];
    try{
        // let mediaDevices=navigator.mediaDevices || navigator.webkitMediaDevices || navigator.mozMediaDevices || navigator.msMediaDevices
        // mediaDevices.getUserMedia=mediaDevices.getUserMedia || mediaDevices.webkitGetUserMedia || mediaDevices.mozGetUserMedia || mediaDevices.msGetUserMedia

        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    }catch(err){
        alert(err.message)
    }
    video.srcObject = stream;
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorder.start(1000);
    mediaRecorder.ondataavailable = (e) => {
        recordingChunk.push(e.data)
    }

}
function stopRecording() {
    const blob = new Blob(recordingChunk, { type: "video/webm" })
    console.log(blob,recordingChunk)
    const url = URL.createObjectURL(blob)
    window.open(url, "width:500px;height:500px")
    removeTracks()
}
function removeTracks() {
    let tracks = stream.getTracks()
    console.log(tracks)
    tracks.map(track => {
        track.stop()
    })
    video.style.display = "none"
}
