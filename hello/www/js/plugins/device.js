
app.on({page: 'device', preventClose: false, content: 'device.html', readyDelay: 1}, function(activity) {
	activity.onCreate(function() {
		deviceReady(function(){
			$('#model').html(device.model);
			$('#manufacturer').html(device.manufacturer);
			$('#platform').html(device.model);
			$('#version').html(device.version);
			$('#serial').html(device.serial);
			$('#uuid').html(device.uuid);
		});
    });
});
