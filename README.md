# Compiling, Deploying and Running this Application

To be able to install and run our app on your local maching follow the following steps.

## Steps for Running on a local machine.

1. **Install MongoDB on your machine and Start it.**

You can follow this [link](https://docs.mongodb.com/manual/installation/) to learn how to install and run MongoDB if you're new to the technology. If not you can just start running Mongo on your machine in the cammand line by running Monogd.exe and then in a new command line run mongo.exe.

2. **Install Node.js on your machine**

You can follow this [link](https://nodejs.org/en/) to download and install node on your machine. You need to have Node 6 or higher to run this application.

3. **Install Ionic on your machine.**

You can follow this [link](https://ionicframework.com/docs/intro/installation/) to learn how to install the ionic framework on        your machine. If you already have it installed then you should check if you're up to date with ionic 2. You can do this by runnning the following command...

```
>ionic info
```
Check the Ionic App lib version and it should be at least 2.0.0 to run this app.

4. **Clone this repository or download the .zip**

When you have the project files on your machine open the command line and navigate to the project directory. Make sure you are in the ReviewApp repositroy and run 
```
>npm install
```
This will install all the necessary node packages needed to run this application.

5. **Running the Application**

With MongoDB running and with all the above necessary instalations completed, navigate to the project folder, cd into the server folder and run this command...
```
>node server.js
```
This will start the server for our API. Now open and new command line window and cd into the ReviewApp folder and run...
```
>ionic serve -l
```
This will deploy our app on our machine in Ionic Labs where we can view how the app looks on Android, IOS and Windows. From here you can start using the app.

## How to Deploy the App on your Smart Phone.

To use this app on your smart phone device download the .apk file included in this repository and put the file on your phone. Install the .apk on your device and the app will then be installed on your phone. This app is built for Android and IOS.


