function camera(){
	document.addEventListener('deviceready',onDeviceReady,false);
	function onDeviceReady(){
		console.log('Device is Ready');
		window.takeNewPicture = takeNewPicture;

		function takeNewPicture() {
			var cameraOptions = {
				destinationType:Camera.DestinationType.FILE_URI,
				sourceType:Camera.PictureSourceType.CAMERA
			};
			navigator.camera.getPicture(successCallback,errorCallback,cameraOptions);

			function successCallback(imageData){
				var image = $('#new_image');
				image.removeClass('hidden');
  				image.src = "data:image/jpeg;base64," + imageData;
			}

			function errorCallback(message){
				alert('Error Occurred: '+message);
			}
		}
	}
}
