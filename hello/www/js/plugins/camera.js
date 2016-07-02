
app.on({page: 'camera', preventClose: false, content: 'camera.html', readyDelay: 1}, function(activity) {
	var onAction = function(evt) {
        var target = evt.target;

        if(target.getAttribute('data-order') === 'takePicture') {
            deviceReady(function(){
				var cameraOptions = {
					destinationType:Camera.DestinationType.DATA_URL,
					sourceType:Camera.PictureSourceType.CAMERA
				};
				navigator.camera.getPicture(successCallback,errorCallback,cameraOptions);

				function successCallback(imageData){
					var image = $('#new_image');
					image.removeClass('hidden');
					image.attr('src',"data:image/jpeg;base64," + imageData);
				}

				function errorCallback(message){
					alert('Error Occurred: '+message);
				}
			});
        } else {
            phonon.alert('Your order has been canceled.', 'Dear customer');
        }
    };

	activity.onCreate(function() {
		document.getElementById('cameraBtn').on('tap',onAction);
    });
});
