
app.on({page: 'network', preventClose: false, content: 'network.html', readyDelay: 1}, function(activity) {
	activity.onCreate(function() {
	       deviceReady(function() {
	   		console.log('Device is Ready');
	   		document.addEventListener('online',onOnline,false);
	   		document.addEventListener('offline',onOffline,false);

	   		if(navigator.connection.type === Connection.UNKNOWN || navigator.connection.type === Connection.NONE){
	   			onOffline();
	   		}else {
	   			onOnline();
	   		}

	   		function onOnline(){
	   			console.log('Now Online');
	   			$('#network_status').html('Online');
	   			$('#light').addClass('online');
	   			$('#light').removeClass('offline');
	   			$('#connection_type').html(checkConnectionType());
	   		}

	   		function onOffline(){
	   			console.log('Now Offline');
	   			$('#network_status').html('Offline');
	   			$('#light').addClass('offline');
	   			$('#light').removeClass('online');
	   			$('#connection_type').html(checkConnectionType());
	   		}

	   		function checkConnectionType(){
	   			var networkState = navigator.connection.type;

	   		    var states = {};
	   		    states[Connection.UNKNOWN]  = 'Unknown connection';
	   		    states[Connection.ETHERNET] = 'Ethernet connection';
	   		    states[Connection.WIFI]     = 'WiFi connection';
	   		    states[Connection.CELL_2G]  = 'Cell 2G connection';
	   		    states[Connection.CELL_3G]  = 'Cell 3G connection';
	   		    states[Connection.CELL_4G]  = 'Cell 4G connection';
	   		    states[Connection.CELL]     = 'Cell generic connection';
	   		    states[Connection.NONE]     = 'No network connection';

	   		    return states[networkState];
	   		}
	   	});
    });
});
