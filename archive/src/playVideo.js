function playVideo(stream, idVideo){
	const video = document.getElementById(idVideo);
			video.srcObject = stream;
			video.onloadedmetadata = function () {
				// body...
				video.play();
			}
}

module.exports= playVideo;