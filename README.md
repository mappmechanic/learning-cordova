# Learning Cordova
Author: Rahat Khanna
Twitter: http://twitter.com/mappmechanic
LinkedIn: http://linkedin.com/in/rahatkh

## Introduction:
I am writing a Repository to help beginners in Learning Cordova. This Repository will contain Step by Step Guides with Sample Codes.

## Table of Contents
1. [Building HelloWorld App](https://github.com/mappmechanic/learning-cordova#building-helloworld-app-)
2. [Cordova Hooks](https://github.com/mappmechanic/learning-cordova#cordova-hooks-)
3. [Customize App Properties](https://github.com/mappmechanic/learning-cordova#cordova-app-properties)
4. [Cordova LifeCycle Events](https://github.com/mappmechanic/learning-cordova#cordova-lifecycle-events)
5. [Icons & SplashScreens](https://github.com/mappmechanic/learning-cordova#icons-and-splashscreens)
6. [Adding Basic App Framework for Plugin Testing]
7. Cordova Network Plugin
8. Cordova Camera Plugin
9. Cordova Contacts Plugin

## Code Samples with Steps :

### Building HelloWorld App

We need to install all the dependencies and then use the Cordova CLI to initiate a new project.

#### *Step 1:*
Execute the cordova create command on your CommandPrompt(Windows) & Terminal(MAC OS)

`cordova create hello com.example.hello HelloWorld`

#### *Step 2:*
Check the Cordova Help command to see any other commands you would need for Cordova Project.

`cordova help`

Output would seem like this:
![Alt text](readme-imgs/cordova-help.png?raw=true "Cordova Help Output")

#### *Step 3:*
First go to the folder by doing 'cd hello' and then, Add a Platform to the cordova project so that we can build for it.

```
 cd hello   
 cordova platform add ios --save   
 cordova platform add android@^5.0.0 --save   
```

After adding iOS & Android as platforms we can check the platforms added by running the following command:

`cordova platform list`

![Alt text](readme-imgs/cordova-list.png?raw=true "Cordova List Output")

#### *Step 4:*
Now we can test if the cordova app is able to prepare itself, resolve all dependencies etc.

`cordova prepare`

#### *Step 5:*
After preparing the cordova project, we can emulate the app for all platforms or a specific platform:

`cordova emulate ios`

#### *Step 6:*
During development, for a hybrid app we do not want it to be redeployed on the device everytime. In this scenario we can use cordova serve to host the app on a local dev web server and browse it on the browser during development:

`cordova serve`

#### *Step 7:*
In order to compile our app and generate builds, we can run the compile command for a specific platform or without any platform to compile for all.

`cordova compile`

#### *Step 8:*
In order to run this simple app, we can use the cordova run command which will prepare and then build the app. It will try to find a device connected to the machine for running or else will deploy to any available emulator. Now we will be able to see the app on our phones.

`cordova run`


### Cordova Hooks

Cordova Hooks represent special scripts which could be added by application and plugin developers or even by your own build system to customize cordova commands. Cordova hooks allow you to perform special activities around cordova commands. For example, you may have a custom tool that checks for code formatting in your javascript file.

#### *Step 1:*
We will be using the /hooks folder to maintain our scripts for the hooks. Create the folder, if it does not exists

`mkdir /hello/hooks/`

#### *Step 2:*
Hooks can be created using Javascript and Non-Javascript (shell scripts/bat scripts). We will be looking at JS hooks for now. Others can be used similarly. Now, we have to create a new JS file named after the hook inside hooks folder. Make a file */hello/hooks/beforeBuild.js*. The cordova hook should have the following code structure:

```javascript
module.exports = function(context) {
	...
}
```

The context variable is passed in the function which has all information regarding the hook.

#### *Step 3:*
Hooks use asynchronous promises and can use the Cordova 'Q' library to return a promise.

```javascript
module.exports = function() {
	console.log('Hook Running before the Build');
	var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    return deferral.promise;
}
```

#### *Step 4:*
The build process will be on hold till we resolve this promise. We will write a setTimeout script to simulate any asynchronous method and resolve the promise inside it.

```javascript
module.exports = function(context) {
    console.log('Hook Running before the Build');
	var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    setTimeout(function(){
      console.log('BeforeBuild Hook >> end');

	  // Asynchronous Operations can be done here like writing to any file or making an API call to get Production configuration and replace locally

      deferral.resolve();
	}, 3000);

    return deferral.promise;
}
```

#### *Step 5:*

In config.xml, we have to add a hook element with appropriate script name to make it run.

`<hook type="before_build" src="hooks/beforeBuild.js" />`

#### *Step 6:*

Now run the command *'cordova build'* and see the Console output to check the logs you have put inside the hooks to test if they are running properly.

![Alt text](readme-imgs/cordova-hook.png?raw=true "Cordova Hook beforeBuild Output")

#### *Step 7:*
For platform specific hook, just copy the *beforeBuild.js* file and rename it to *afterBuildAndroid.js*. Then you have add a new hook tag in the config.xml but it should be inside the platform tag with the attribute name set to a specific platform name.

`<platform  name="android">   
	<hook type="after_build" src="hooks/afterBuildAndroid.js" />    
</platform>`

### Customize App Properties
In order to customize your cordova project, we can modify the config.xml file and its properties. Update the config.xml with the following code in the beginning:

```
<widget id="com.mappmechanic.learncordova" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">    
    <name>LearnCordova</name>    
    <description>    
        An app to learn all about Cordova.   
    </description>   
    <author email="rahat.khanna@yahoo.co.in" href="http://twitter.com/mappmechanic">   
        MAppmechanic   
    </author>   
...
```

### Cordova LifeCycle Events
In a Cordova Project, we have to know when the cordova is ready with its native platform so that the web projects can be initialized and start calling the native methods. We also require other lifecycle events to know when an app is going to pause state and then back to resume state.

Cordova provides events to which we can subscribe from javascript and register any handlers.

#### Step1: *deviceReady* Event
It is fired when the native platform is ready and any cordova js call to native functionality can be done.

```javascript
{
...
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	}
...
}
```

#### Step2: *pause* Event
We can listen to the event which is fired whenever the app is paused as it is taken out of focus by the user.

`document.addEventListener("pause", this.onPause, false)`

#### Step3: *resume* Event
We can listen to the event which is fired whenever the app is resumed as it is taken into focus by the user.

`document.addEventListener("resume", this.onResume false)`

### Icons and SplashScreens
In a Cordova Project, by default the cordova logo is put as icon and splash screens if we do not replace them. In order to replace them we can make any folder in our Cordova Project and store the images for icons and splash screens.

#### Step 1:
For this project demo, we will make a folder named *res* and then have different folders for different platforms in it. We have to link that image with appropriate size device, which can be configured in the config.xml as follows:

```
	<icon src="res/icons/ios/icon.png" platform="ios" width="57" height="57" density="mdpi" />

	<platform name="android">
		<icon src="res/icons/android/ldpi.png" density="ldpi" />
		<icon src="res/icons/android/mdpi.png" density="mdpi" />
		<icon src="res/icons/android/hdpi.png" density="hdpi" />
		<icon src="res/icons/android/xhdpi.png" density="xhdpi" />
		<icon src="res/icons/android/xxhdpi.png" density="xxhdpi" />
		<icon src="res/icons/android/xxxhdpi.png" density="xxxhdpi" />
	</platform>
```

#### Step 2:
Run or build your cordova project so that cordova cli can copy these assets into their native platform codebase.

`cordova run|build`

#### Step 3:
Adding splash screens to your project is also similar to adding icons. For splash screens to work we need to add the plugin for splash screens:

`cordova plugin add cordova-plugin-splashscreen`

Please add the following configuration in the platform tag for android.

```
	...
	<!-- Splash Screens -->
		<splash src="res/screens/android/screen-hdpi-portrait.png" density="port-hdpi"/>
		<splash src="res/screens/android/screen-ldpi-portrait.png" density="port-ldpi"/>
		<splash src="res/screens/android/screen-mdpi-portrait.png" density="port-mdpi"/>
		<splash src="res/screens/android/screen-xhdpi-portrait.png" density="port-xhdpi"/>
	...
```

### Adding Basic App Framework for Plugin Testing
We will be adding a basic app framework called Ratchet for creating small examples to test our plugins.

#### Step 1:
Download the Ratched library which is very small ~ approx 52 KB from this url - https://github.com/twbs/ratchet/releases/download/v2.0.2/ratchet-2.0.2-dist.zip

#### Step 2:
Unzip the archive file downloaded which would contain folders - *css*, *js* and *fonts*.

#### Step 3:
Put the folders inside your *www* folder overriding existing folders.

#### Step 4:
Replace code in *index.html*, with the following basic template:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Learning Cordova Sample Page</title>

    <!-- Sets initial viewport load and disables zooming  -->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">

    <!-- Makes your prototype chrome-less once bookmarked to your phone's home screen -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <!-- Include the compiled Ratchet CSS -->
    <link href="css/ratchet.css" rel="stylesheet">
	<link href="css/common.css" rel="stylesheet">

    <!-- Include the compiled Ratchet JS -->
    <script src="js/jquery.min.js"></script>
	<script src="cordova.js"></script>
	<script>
		function loadPluginPage(pluginName) {
		  $.get('plugins/'+pluginName+'.html').then(function(data) {
			  document.getElementById('viewport').innerHTML = data;
			  if(window[pluginName]){
				  window[pluginName].call(window);
			  }
		  },function(error){
			  debugger;
		  });
		}
	</script>
	<!-- <script src="cordova.js"></script> -->
  </head>
  <body>
		<div id="viewport">
		</div>
	<script type="text/javascript">
		loadPluginPage('index');
	</script>
</body>
</html>     
```

#### Step 5:
We need to create a new folder *plugins* where we will keep on adding examples for each cordova plugin we test or make a sample for. For now, create a new placeholder for all plugins example named *index.html* and place the following code in it:

```
<!-- Make sure all your bars are the first things in your <body> -->
<header class="bar bar-nav">
  <h1 class="title">Learning Cordova</h1>
</header>    

<!-- Wrap all non-bar HTML in the .content div (this is actually what scrolls) -->     
<div class="content">      
  <p class="content-padded">This is a sample app to run examples for Cordova Plugins. The list of cordova plugins and the link to their respective sections is given below:</p>    
  <div class="card">      
	<ul class="table-view">    
	  <li class="table-view-cell">   
		<a class="push-right" onClick="loadPluginPage('network')" href="#">    
		  <strong>Network Plugin</strong>    
		</a>    
	  </li>    
	  <li class="table-view-cell">    
		<a class="push-right" href="plugins/plugin1.html">    
		  <strong>Upcoming Plugin...</strong>    
		</a>    
	  </li>   
	</ul>    
  </div>    
</div>    

```

### Cordova Network Plugin
We will be making a sample for working with Cordova Network Plugin.

#### Step 1:
Add the plugin by running the following command:

`cordova plugin add cordova-plugin-network-information`

#### Step 2:
Add a new file *network.html* inside *plugins* folder.

```
<header class="bar bar-nav">     
	<a class="icon icon-left-nav pull-left" href="#"></a>      
	<h1 class="title">Network Plugin</h1>     
</header>      

<div class="content">     
	<h3>Events Testing</h3>    
	<p>   
		Network Status: <span id="network_status">UNKOWN</span><br>   
		Status Light : <br>   
		<div id="light" class="circle"></div><br>    
		Connection Type: <span id="connection_type">UNKOWN</span>    
	</p>    
</div>   

```

#### Step 3:
Add a new file *network.js* inside *js/plugins* folder. This file will contain a function with the same name of the plugin i.e. *'network'* and we will include any functionality to test the network plugin in this.

```javascript
function network(){
	document.addEventListener('deviceready',onDeviceReady,false);
	function onDeviceReady(){
		console.log('Device is Ready');
		document.addEventListener('online',onOnline,false);
		document.addEventListener('offline',onOffline,false);

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
	}
}
```

### Cordova Camera Plugin
We will be making a sample for working with Cordova Camera Plugin.

#### Step 1:
Add the plugin by running the following command:

`cordova plugin add cordova-plugin-camera`

#### Step 2:
Add a new file *camera.html* inside *plugins* folder.

```
<header class="bar bar-nav">   
	<a class="icon icon-left-nav pull-left" href="#"></a>    
	<h1 class="title">Camera Plugin</h1>   
</header>   

<div class="content">   
	<h3>Camera Methods Testing</h3>    
	<p>    
		<button class="btn" onClick="takeNewPicture()">    
			Get a New Picture    
		</button>   
	</p>   
	<p>   
		<img id="new_img" class="hidden" src="">    
	</p>    
</div>    
```

#### Step 3:
Add a new file *camera.js* inside *js/plugins* folder. This file will contain sample code for Camera plugin testing.

```javascript
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
```
