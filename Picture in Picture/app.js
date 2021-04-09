const videoElement = document.getElementById('video');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

attachEventListeners();


async function selectStream(){
    try{
        const videoStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = videoStream;
    } catch (err) {
        console.error(err.message);
        alert("Please try again!");
        throw err;
    }
}

function attachEventListeners() {
    videoElement.addEventListener('loadedmetadata', async () => {
        try {
            videoElement.play();
            await videoElement.requestPictureInPicture();
        } catch (err) {
            console.error(err.message);
            alert("Please try again!");
            throw err;
        }
    });
    
    startBtn.addEventListener('click', async () => {
        startBtn.disabled = true;
    
        await selectStream();
    
        startBtn.hidden = true;
        stopBtn.hidden = false;
        startBtn.disabled = false;
    });
    
    stopBtn.addEventListener('click', () => {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(t => t.stop());
        videoElement.srcObject = null;
        document.exitPictureInPicture();
        
        stopBtn.hidden = true;
        startBtn.hidden = false;
    });
}