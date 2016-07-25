var isDeviceReady = false;

phonon.options({
    navigator: {
        defaultPage: 'home',
        animatePages: true,
        enableBrowserBackButton: true,
        templateRootDirectory: './plugins'
    },
    i18n: null // for this example, we do not use internationalization
});

function deviceReady(done){
	if(isDeviceReady){
		done();
	}else {
		document.addEventListener('deviceReady',onDeviceReady,false);
	}
	function onDeviceReady(){
		isDeviceReady = true;
		done();
	}
}

function subscribeNotifications(){
	var notificationOpenedCallback = function(jsonData) {
	   console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
	 };
	 console.log('Init One Signal');
	 window.plugins.OneSignal.init("2e61bde8-1f02-4e75-a90f-1c41d0a4c0d1",
									{googleProjectNumber: "159978502825"},
									notificationOpenedCallback);
	 console.log('Enabling in App Notifications');
	 // Show an alert box if a notification comes in when the user is in your app.
	 window.plugins.OneSignal.enableInAppAlertNotification(true);
}

var app = phonon.navigator();

/**
 * The activity scope is not mandatory.
 * For the home page, we do not need to perform actions during
 * page events such as onCreate, onReady, etc
*/
app.on({page: 'home', preventClose: false, content: null});

// Let's go!
app.start();

// Subscribing to notifications when device is ready
deviceReady(function(){
	subscribeNotifications();
});
