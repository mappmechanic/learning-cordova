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
	if(deviceReady){
		done();
	}else {
		document.addEventListener('deviceReady',onDeviceReady,false);
	}
	function onDeviceReady(){
		isDeviceReady = true;
		done();
	}
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
