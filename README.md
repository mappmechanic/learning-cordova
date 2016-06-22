# Learning Cordova
Author: Rahat Khanna
Twitter: http://twitter.com/mappmechanic
LinkedIn: http://linkedin.com/in/rahatkh

## Introduction:
I am writing a Repository to help beginners in Learning Cordova. This Repository will contain Step by Step Guides with Sample Codes.

## Table of Contents
1. Building HelloWorld App


## Code Samples with Steps :

### Building HelloWorld App -

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

`cd hello
 cordova platform add ios --save
 cordova platform add android@^5.0.0 --save`

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
