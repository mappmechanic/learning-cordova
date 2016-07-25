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
6. [Adding Basic App Framework for Plugin Testing](https://github.com/mappmechanic/learning-cordova#adding-basic-app-framework-for-plugin-testing)
7. [Cordova Network Plugin](https://github.com/mappmechanic/learning-cordova#cordova-network-plugin)
8. [Cordova Camera Plugin](https://github.com/mappmechanic/learning-cordova#cordova-network-plugin)
9. [Cordova Contacts Plugin](https://github.com/mappmechanic/learning-cordova#cordova-network-plugin)
10. [Cordova Geolocation Plugin](https://github.com/mappmechanic/learning-cordova#cordova-network-plugin)
11. [Cordova Sqlite Plugin](https://github.com/mappmechanic/learning-cordova#cordova-network-plugin)
12. [Push Notifications Plugin](https://github.com/mappmechanic/learning-cordova#push-notifications-demo-with-onesignal-100-free)

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
		<icon src="res/icons/android/icon-36-ldpi.png" density="ldpi" />
		<icon src="res/icons/android/icon-48-mdpi.png" density="mdpi" />
		<icon src="res/icons/android/icon-72-hdpi.png" density="hdpi" />
		<icon src="res/icons/android/icon-96-xhdpi.png" density="xhdpi" />
		<icon src="res/icons/android/icon-144-xxhdpi.png" density="xxhdpi" />
		<icon src="res/icons/android/icon-192-xxxhdpi.png" density="xxxhdpi" />
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
Download the Phonon library which is very small ~ approx 61 KB from this url - https://github.com/quark-dev/Phonon-Framework/archive/master.zip

#### Step 2:
Unzip the archive file downloaded which would contain a folder *dist* in which there will be  sub-folders - *css*, *js* and *fonts*.

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
    <link href="css/phonon.css" rel="stylesheet">
	<link href="css/common.css" rel="stylesheet">
  </head>
  <body>
	  <!-- the home page is the default one. This page does not require to call its content because we define on its tag.-->
	  <home data-page="true">
		  <header class="header-bar">
			  <div class="center">
				  <h1 class="title">Cordova Plugins</h1>
			  </div>
		  </header>
		  <div class="content">
			  <ul class="list">
				  <li class="divider">Select a plugin</li>
				  <li><a class="padded-list" href="#!device">Device Plugin</a></li>
			  </ul>
		  </div>
	  </home>
	  <device data-page="true"></device>
	  <!-- More Plugin Tags will be Added Later Here-->

	  <!-- Include the compiled Phonon JS -->
	  <script src="js/phonon.js"></script>
	  <script src="js/jquery.min.js"></script>
	  <script src="js/app.js"></script>
	  <script src="js/plugins/device.js"></script>
	  <script src="cordova.js"></script>
  </body>
</html>     
```

#### Step 7:
In order to initiate the Phonon Library, we will write bootstrapping code in */js/app.js* file. We will have to initiate an instance of Phonon App and also instantiate *home* view.

```javascript
var isDeviceReady = false;   
phonon.options({   
    navigator: {   
        defaultPage: 'home',    
        animatePages: true,   
        enableBrowserBackButton: true,   
        templateRootDirectory: './plugins'  
    }
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
app.on({page: 'home', preventClose: false, content: null});

// Let's go!
app.start();
```

#### Step 6:
We need to create a new folder *plugins* inside *js* folder and also another *plugins* folder inside *www* folder itself, where we will keep on adding examples for each cordova plugin we test or make a sample for. For now, create a new file *device.html* inside */www/plugins* for testing the most basic device plugin:

```
<device class="app-page">    
    <header class="header-bar">    
        <div class="center">       
            <button class="btn pull-left icon icon-arrow-back" data-navigation="$previous-page"></button>   
            <h1 class="title">Device Plugin</h1>   
        </div>   
    </header>    

    <div class="content">   
			<ul class="list device-info">   
			   <li class="divider">Device Information</li>   
			   <li class="padded-list">   
				    Model - <span id="model"></span>   
			   </li>   
			   <li class="padded-list">   
				    Manufacturer - <span id="manufacturer"></span>   
			   </li>    
			   <li class="padded-list">   
				    Platform/OS - <span id="platform"></span>    
			   </li>   
			   <li class="padded-list">   
				    Version - <span id="version"></span>   
			   </li>    
			   <li class="padded-list">   
				    Serial No - <span id="serial"></span>    
			   </li>    
			   <li class="padded-list">    
				    UUID - <span id="uuid"></span>    
			   </li>     
		   </ul>    
    </div>   
</device>    

```

#### Step 7:
Now we have to add the JS functionality to access the *window.device* object and put the properties of this project into html dom elements using their unique ids.

```javascript
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
```

### Cordova Network Plugin
We will be making a sample for working with Cordova Network Plugin.

#### Step 1:
Add the plugin by running the following command:

`cordova plugin add cordova-plugin-network-information`

#### Step 2:
Add a new file *network.html* inside *plugins* folder.

```
<network class="app-page">    
    <header class="header-bar">    
        <div class="center">    
            <button class="btn pull-left icon icon-arrow-back" data-navigation="$previous-page"></button>     
            <h1 class="title">Network Plugin</h1>    
        </div>    
    </header>     

    <div class="content">      
        <div class="padded-full">   
            <h3>Events Testing</h3>   
		</div>   
			<ul class="list">   
			   <li class="divider">Connection Type</li>   
			   <li class="padded-list" id="connection_type">Unkown</li>   
			   <li class="divider">Connection Status</li>   
			   <li class="padded-list">   
					<div id="light" class="circle">   
					</div>   
					<span id="network_status">Unkown</span>   
			   </li>   
		   </ul>   
    </div>   
</newtork>   
```

#### Step 3:
In the *index.html* file please add the following *<network>* tag after the rest of the plugins.

```
<!-- More Plugin Tags will be Added Later Here-->    
<network data-page="true"></network>    
```

Also we have to add the link item in the plugins list:
```
<li><a class="padded-list" href="#!network">Network Plugin</a></li>
```

Also in the same file, add reference to a new JS file which we will be creating in next step at last of the body tag.
```
<script src="js/plugins/network.js"></script>
```

#### Step 4:
Add a new file *network.js* inside *js/plugins* folder. This file will contain a function with the same name of the plugin i.e. *'network'* and we will include any functionality to test the network plugin in this.

```javascript

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
```

#### Step 5:
Add following CSS to your */css/common.css* file

```
#light.circle {  
	width:40px;  
	height:40px;  
	border-radius:20px;  
	border:0px;  
	background-color:blue;  
	float:left;  
	margin-right:10px;  
	margin-top:5px;  
}  

#light.offline{  
	background-color:red;  
}  

#light.online{  
	background-color:green;  
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
<camera class="app-page">  
    <header class="header-bar">   
        <div class="center">  
            <button class="btn pull-left icon icon-arrow-back" data-navigation="$previous-page"></button>   
            <h1 class="title">Camera Plugin</h1>   
        </div>   
    </header>   

    <div class="content">   
			<ul class="list">   
			   <li class="divider">Take a Picture</li>   
			   <li class="padded-list">   
				    <button class="btn primary" id="cameraBtn" data-order="takePicture">Take a Picture</button>   
			   </li>   
			   <li class="divider">Picture</li>   
			   <li class="padded-list">   
					<img id="new_image" class="hidden" />   
			   </li>   
		   </ul>   
    </div>  
</camera>    
```

#### Step 3:
In the *index.html* file please add the following *<camera>* tag after the rest of the plugins.

```
<!-- More Plugin Tags will be Added Later Here-->    
<camera data-page="true"></camera>    
```

Also we have to add the link item in the plugins list:
```
<li><a class="padded-list" href="#!camera">Camera Plugin</a></li>
```

Also in the same file, add reference to a new JS file which we will be creating in next step at last of the body tag.
```
<script src="js/plugins/camera.js"></script>
```


#### Step 4:
Add a new file *camera.js* inside *js/plugins* folder. This file will contain sample code for Camera plugin testing.

```javascript
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
```


### Cordova Contacts Plugin
We will be making a sample for working with Cordova Contacts Plugin.

#### Step 1:
Add the plugin by running the following command:

`cordova plugin add cordova-plugin-contacts`

#### Step 2:
Add a new file *contacts.html* inside *plugins* folder.

```
<contacts class="app-page">   
    <header class="header-bar">   
        <div class="center">  
            <button class="btn pull-left icon icon-arrow-back" data-navigation="$previous-page"></button>   
            <h1 class="title">Contacts Plugin</h1>   
        </div>   
    </header>   

    <div class="content">  
			<ul class="list">   
			   <li class="divider">Test Contact Actions</li>   
			   <li class="padded-list">   
				    <button class="btn primary" id="pickContactBtn" data-order="pickAContact">Pick a Contact</button>   
			   </li>   
			   <li class="divider">Selected Contact</li>   
			   <li class="padded-list">   
					<table id="selected_contact" class="table hidden">   
				        <tbody>   
				            <tr><td>Display Name</td><td id="display_name"></td></tr>    
							<tr><td>Mobile</td><td id="mobile_number"></td></tr>   
							<tr><td>Email</td><td id="email"></td></tr>   
							<tr><td>Organisation</td><td id="organisation"></td></tr>   
				        </tbody>    
				    </table>   
			   </li>   
		   </ul>   
    </div>  
</contacts>   
```
#### Step 3:
In the *index.html* file please add the following *<contacts>* tag after the rest of the plugins.

```
<!-- More Plugin Tags will be Added Later Here-->    
<contacts data-page="true"></contacts>    
```

Also we have to add the link item in the plugins list:
```
<li><a class="padded-list" href="#!contacts">Contacts Plugin</a></li>
```

Also in the same file, add reference to a new JS file which we will be creating in next step at last of the body tag.
```
<script src="js/plugins/contacts.js"></script>
```


#### Step 4:
Add a new file *contacts.js* inside *js/plugins* folder. This file will contain sample code for Contacts plugin testing.

```javascript

app.on({page: 'contacts', preventClose: false, content: 'contacts.html', readyDelay: 1}, function(activity) {
	var onAction = function(evt) {
        var target = evt.target;

        if(target.getAttribute('data-order') === 'pickAContact') {
            deviceReady(function(){
				navigator.contacts.pickContact(successCallback,errorCallback);

				function successCallback(contact){
					$('#selected_contact').removeClass('hidden');
					$('#display_name').html(contact["displayName"]);
					$('#mobile_number').html(contact.phoneNumbers && contact.phoneNumbers[0] ? contact.phoneNumbers[0].value : 'N/A');
					$('#email').html(contact.email && contact.email[0] ? contact.email[0].value : 'N/A');
					$('#organisation').html(contact.organizations && contact.organizations[0] ? contact.organizations[0].name : 'N/A');
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
		document.getElementById('pickContactBtn').on('tap',onAction);
    });
});
```

#### Step 5:
Now, we will implement functionality to create a new contact by adding new method in *contacts.js* file and also adding an event handler for creating a contact on click of a new button. We will also add a new Popup Panel which would contain form to create a new Contact.

```javascript
var createContact = function(){
	var contactField = {
		displayName:$('#contact_name').val(),
		phoneNumbers:[new ContactField('mobile', $('#contact_number').val(), true)]
	}
	var newContact = navigator.contacts.create(contactField);
	newContact.save(function(contact_obj){
		alert('Successfully created a new contact.');
		$('#contact_name').val('');
		$('#contact_number').val('');
	},function(error){
		alert("Not able to save new contact: "+error);
	});
}

activity.onCreate(function() {
	document.getElementById('pickContactBtn').on('tap',onAction);
	document.getElementById('createContactBtn').on('tap',createContact);
});
```

HTML Content will be placed at last of the *<div class='content'>...</div>* tag inside *plugins/contacts.html*.

```
<a href="#" data-panel-id="createContactPanel" class="floating-action padded-full icon icon-add active primary"></a>
<div id="createContactPanel" class="panel-full">
	 <header class="header-bar">
		 <a class="btn icon icon-close pull-right" href="#" data-panel-close="true"></a>
		 <h1 class="title"> Create Contact </h1>
	 </header>

	 <div class="content padded-full">
		  <ul class="list">
			 <li><input type="text" id="contact_name" placeholder="Full name"></li>
			 <li><input type="number" id="contact_number" placeholder="10 Digit Mobile Number"></li>
			 <li><br><button id="createContactBtn" class="btn fit-parent primary">Save</button></li>
		 </ul>
	 </div>
 </div>
```

A small CSS change is also required to alter z-index of backdrop. Append the below given css to *common.css* file.
```
.backdrop-panel
{
	z-index:0;
}
```

### Cordova Geolocation Plugin
We will be making a sample for working with Cordova Contacts Plugin.

#### Step 1:
Add the plugin by running the following command:

`cordova plugin add cordova-plugin-geolocation`

#### Step 2:
Add a new file *geolocation.html* inside *plugins* folder.

```
<geolocation class="app-page">   
    <header class="header-bar">   
        <div class="center">   
            <button class="btn pull-left icon icon-arrow-back" data-navigation="$previous-page"></button>   
            <h1 class="title">Geolocation Plugin</h1>   
        </div>   
    </header>    

    <div class="content">   
		<ul class="list device-info">   
		   <li class="padded-list">   
			   <button id="getCurrentLocBtn" class="btn fit-parent primary">Get Current Location</button>   
		   </li>   
		   <li class="padded-list">   
			   <button id="watchPosBtn" class="btn fit-parent primary">Watch Position Changes</button>   
		   </li>    
		   <li class="padded-list">   
			  <button id="clearWatchBtn" class="btn fit-parent primary">Stop Watching</button>    
		  </li>   
		</ul>      
		<ul class="list" id="locationChanges">   
			<li class="divider">Regular Location Watch</li>   
		</ul>   
		<div id="currentLocPanel" class="panel">   
	        <header class="header-bar">   
	            <a class="btn icon icon-close pull-right" href="#" data-panel-close="true"></a>   
	            <h1 class="title"> Current GPS Location </h1>   
	        </header>   

	        <div class="content padded-full">   
				 <ul class="list">   
					<li>Latitude - <span id="clatitude"></span></li>   
					<li>Longitude - <span id="clongitude"></span></li>    
				</ul>    
	        </div>   
		</div>   
    </div>   
</geolocation>     
```
#### Step 3:
In the *index.html* file please add the following *<geolocation>* tag after the rest of the plugins.

```
<!-- More Plugin Tags will be Added Later Here-->    
<geolocation data-page="true"></geolocation>    
```

Also we have to add the link item in the plugins list:
```
<li><a class="padded-list" href="#!geolocation">Geolocation Plugin</a></li>
```

Also in the same file, add reference to a new JS file which we will be creating in next step at last of the body tag.
```
<script src="js/plugins/geolocation.js"></script>
```


#### Step 4:
Add a new file *geolocation.js* inside *js/plugins* folder. This file will contain sample code for Geolocation plugin testing.

```javascript
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
```

#### Step 5:
Now, we will implement functionality to create a new contact by adding new method in *contacts.js* file and also adding an event handler for creating a contact on click of a new button. We will also add a new Popup Panel which would contain form to create a new Contact.

```javascript
var createContact = function(){
	var contactField = {
		displayName:$('#contact_name').val(),
		phoneNumbers:[new ContactField('mobile', $('#contact_number').val(), true)]
	}
	var newContact = navigator.contacts.create(contactField);
	newContact.save(function(contact_obj){
		alert('Successfully created a new contact.');
		$('#contact_name').val('');
		$('#contact_number').val('');
	},function(error){
		alert("Not able to save new contact: "+error);
	});
}

activity.onCreate(function() {
	document.getElementById('pickContactBtn').on('tap',onAction);
	document.getElementById('createContactBtn').on('tap',createContact);
});
```

### Cordova Storage - Sqlite Plugin
We will be making a sample for working with Cordova Sqlite Plugin for all your performant storage needs.

#### Step 1:
Add the plugin by running the following command:

`cordova plugin add cordova-sqlite-storage --save`

#### Step 2:
Add a new file *storage.html* inside *plugins* folder.

```
<storage class="app-page">   
    <header class="header-bar">   
        <div class="center">  
            <button class="btn pull-left icon icon-arrow-back" data-navigation="$previous-page"></button>   
            <h1 class="title">Storage Plugin</h1>   
        </div>   
    </header>   

    <div class="content">   
			<ul class="list device-info">   
			   <li class="divider">Manage Todos</li>   
			   <li class="padded-list">   
				    <input type="text" id="todo_text" placeholder="Add Todo Here...">   
			   </li>   
			   <li class="padded-list">   
				    <button id="insertTodoBtn" class="btn fit-parent primary">Add to List</button>   
			   </li>    
			   <li class="padded-list">   
				    <button id="refreshTodosBtn" class="btn fit-parent primary">Refresh List</button>    
			   </li>    
		   </ul>  
			<ul class="list" id="todos_list">   
			</ul>   
    </div>   
</storage>      
```
#### Step 3:
In the *index.html* file please add the following *<storage>* tag after the rest of the plugins.

```
<!-- More Plugin Tags will be Added Later Here-->    
<storage data-page="true"></storage>    
```

Also we have to add the link item in the plugins list:
```
<li><a class="padded-list" href="#!storage">Storage Plugin</a></li>
```

Also in the same file, add reference to a new JS file which we will be creating in next step at last of the body tag.
```
<script src="js/plugins/storage.js"></script>
```


#### Step 4:
Add a new file *storage.js* inside *js/plugins* folder. This file will contain sample code for Geolocation plugin testing.

```javascript

app.on({page: 'storage', preventClose: false, content: 'storage.html', readyDelay: 1}, function(activity) {
	var db,dbName = 'todos.db',todosCount=0;

	var insertTodo = function(evt) {
		var todoText =  $('#todo_text').val();
	    deviceReady(function() {
		    db = window.sqlitePlugin.openDatabase({
		        name: dbName,
		        location: 'default'
		    }, function(res) {
		         var query = "INSERT INTO todos_list (text) VALUES (?)";
		        runQuery(query,[todoText],function(res) {
		          todosCount++;
		          console.log(JSON.stringify(res));
		          alert("New Todo Created");
				  $('#todos_list').prepend("<li class='padded-list'>"+todoText+"</li>");
				  $('#todo_text').val('');
		        }, function (err) {
		          alert("New Todo Creation Error");
		          alert(JSON.stringify(err));
		        });
		    },function(err){
		        console.log(err);
		    });
	    });
	};

	var getTodos = function(needsRefresh) {
	    deviceReady(function() {
	       db = window.sqlitePlugin.openDatabase({
	        name: dbName,
	        location: 'default'
	      }, function(res) {
			 if(needsRefresh){
				 $('#todos_list').html('');
			 }
	         var query = "SELECT * from todos_list";
	        runQuery(query,[],function(resultSet) {
	          var todosArr = [];
	          for(var i = 0;i<resultSet.rows.length;i++)
	          {
	            todosArr.push(resultSet.rows.item(i));
				var currentTodo = resultSet.rows.item(i);
				$('#todos_list').prepend("<li class='padded-list'>"+currentTodo.text+"</li>")
	          }
	          console.log(todosArr);
	        }, function (err) {
	          alert("Error in fetching Todos.");
			  alert(JSON.stringify(err));
	        });
	      },function(err){
	        console.log(err);
	      });
	    });
	}

	var refreshTodos = function(){
		getTodos(true);
	}

	activity.onCreate(function() {
		document.getElementById('insertTodoBtn').on('tap',insertTodo);
		document.getElementById('refreshTodosBtn').on('tap',refreshTodos);
		initDB();
		getTodos();
    });

	function initDB(){
		deviceReady(function() {
	       db = window.sqlitePlugin.openDatabase({
	        name: dbName,
	        location: 'default'
	      }, function(res) {
	        console.log(res);
	      },function(err){
	        console.log(err);
	      });

	       var query = "CREATE TABLE IF NOT EXISTS todos_list (text string)";
	        runQuery(query,[],function(res) {
	         console.log(JSON.stringify(res));
	         console.log("table created ");
	        }, function (err) {
	          alert(JSON.stringify(err));
	        });
    	});
	}

	function runQuery(query,params,successCb,errorCb){
	    db.executeSql(query, params, function (result) {
	      successCb(result);
	    }, function(error) {
	      console.log('SELECT error: ' + error.message);
	      errorCb(error);
	    });
	}

});
```

### Push Notifications Demo with OneSignal (100% Free)

#### *Step 1*:

We have to make an account on http://onesignal.com. Then, we have to add a new app.

#### *Step 2*:

After that we have to go to Google Developer Console, make a new project and then enable Google Cloud Messaging service for it.

Then we have to create credentials for this project and copy the Server API key. We have to fill this key in the OneSignal console.

#### *Step 3*:
Now we have to add the cordova plugin SDK provided by OneSignal.

`cordova plugin add onesignal-cordova-plugin --save`

#### *Step 4*:

Now, we have to add the following code in our app.js, to subscribe to the push notifications using onesignal plugin.

Add this method after deviceReady function:

```javascript
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
```

And also, add the following code at the last of *app.js* file:

```javascript
// Subscribing to notifications when device is ready
deviceReady(function(){
	subscribeNotifications();
});
```
