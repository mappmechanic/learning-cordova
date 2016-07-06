
app.on({page: 'geolocation', preventClose: false, content: 'geolocation.html', readyDelay: 1}, function(activity) {
	function onError(error){
		alert('Error Occurred with Code:' +error.code+ '\n & Message: '+error.message);
	}

	var commonWatchId;

	var getCurrentLocation = function(evt) {
		deviceReady(function(){
			navigator.geolocation.getCurrentPosition(onSuccess,onError,{timeout:30000})
		});

		function onSuccess(position){
			$('#clatitude').html(position.coords.latitude);
			$('#clongitude').html(position.coords.longitude);
			phonon.panel('#currentLocPanel').open();
		}
    };

	var watchPosition = function(evt) {
		deviceReady(function(){
			commonWatchId = navigator.geolocation.watchPosition(onPositionReceived,onError,{timeout:30000})
		});

		function onPositionReceived(position){
			var newListElement = '<li> Lat: '+position.coords.latitude+' & Long: '+position.coords.longitude;
			$('#locationChanges').append(newListElement);
		}
    };

	var clearWatch = function(evt){
		navigator.geolocation.clearWatch(commonWatchId);
	}

	activity.onCreate(function() {
		document.getElementById('getCurrentLocBtn').on('tap',getCurrentLocation);
		document.getElementById('watchPosBtn').on('tap',watchPosition);
		document.getElementById('clearWatchBtn').on('tap',clearWatch);
    });
});
