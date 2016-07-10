
app.on({page: 'mediacapture', preventClose: false, content: 'mediacapture.html', readyDelay: 1}, function(activity) {
	function onError(error){
		alert('Error Occurred with Code:' +error.code+ '\n & Message: '+error.message);
	}

	var audioMediaFile;

	var recordAudio = function(evt) {
		deviceReady(function(){
			// start audio capture
			navigator.device.capture.captureAudio(onSuccess, onError, {limit:1,duration:5});
		});

		function onSuccess(mediaFiles){
			var i, path, len;
			for (i = 0, len = mediaFiles.length; i < len; i += 1) {
				path = mediaFiles[i].fullPath;
				// do something interesting with the file
				audioMediaFile = new Media(mediaFiles[i].localURL);
			}
		}
    };

	var recordVideo = function(evt) {
		deviceReady(function(){
			// start audio capture
			navigator.device.capture.captureVideo(onSuccess, onError, {limit:2});
		});

		function onSuccess(mediaFiles){
			var i, path, len;
			for (i = 0, len = mediaFiles.length; i < len; i += 1) {
				path = mediaFiles[i].fullPath;
				// do something interesting with the file
				console.log(path);
				$('#recorded_video').removeClass('hidden').attr('src',path);
			}
		}
    };

	var playAudio = function(){
		audioMediaFile.play();
	}

	var stopAudio = function(){
		audioMediaFile.stop();
	}

	var releaseAudio = function(){
		audioMediaFile.release();
	}

	activity.onCreate(function() {
		document.getElementById('recAudioBtn').on('tap',recordAudio);
		document.getElementById('playAudioBtn').on('tap',playAudio);
		document.getElementById('stopAudioBtn').on('tap',stopAudio);
		document.getElementById('releaseAudioBtn').on('tap',releaseAudio);
		document.getElementById('recVideoBtn').on('tap',recordVideo);
    });
});
