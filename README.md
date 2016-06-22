# Learning Cordova
Author: Rahat Khanna
Twitter: http://twitter.com/mappmechanic
LinkedIn: http://linkedin.com/in/rahatkh

## Introduction:
I am writing a Repository to help beginners in Learning Cordova. This Repository will contain Step by Step Guides with Sample Codes.

## Table of Contents
1. [Building HelloWorld App](https://github.com/mappmechanic/learning-cordova#building-helloworld-app-)
2. [Cordova Hooks](https://github.com/mappmechanic/learning-cordova#cordova-hooks-)
3. Customize App Properties
4. Cordova LifeCycle Events

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

`module.exports = function(context) {
	...
}`

The context variable is passed in the function which has all information regarding the hook.

#### *Step 3:*
Hooks use asynchronous promises and can use the Cordova 'Q' library to return a promise.

`module.exports = function() {
	console.log('Hook Running before the Build');
	var Q = context.requireCordovaModule('q');
    var deferral = new Q.defer();

    return deferral.promise;
}`

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

`<widget id="com.mappmechanic.learncordova" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>LearnCordova</name>
    <description>
        An app to learn all about Cordova.
    </description>
    <author email="rahat.khanna@yahoo.co.in" href="http://twitter.com/mappmechanic">
        MAppmechanic
    </author>
...
...`

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
