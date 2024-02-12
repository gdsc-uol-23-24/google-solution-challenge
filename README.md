# Project overview

This is some basic starter React Native code to set the stage for the front-end team for the Google Solution Challenge project, *Improving Literacy Through Art* (or ILTA — name is still pending).

The idea is to develop an Android-first application that can process pictures of children's drawings on paper, identify key pre-writing shapes present in the drawing, and return an estimate of the child's potential for writing literacy based on the motor skills demonstrated therein, in accordance with the [Battelle guide](https://ieeexplore.ieee.org/document/9440430).

# Project structure

The `src` folder is the main container of all the code inside the application. It contains:
- An `assets` folder (for static images or fonts)
- A `components` folder (for reusable UI elements)
- A `routes` folder (for navigation-related code)
- A `screens` folder (each file in this contains its route).

The `App.js` file in the root directory is the entry point and main component of the application.

The `precision.py` file is retained from a previous commit, but disconnected from the React Native app.

# React Native and Expo
[React Native](https://reactnative.dev/docs/intro-react-native-components) is an open source framework for building Android and iOS applications using React and the app platform’s native capabilities. You use JavaScript to access your platform’s APIs and to describe the appearance/behavior of your UI using **React components**: bundles of reusable, nestable code. 

[Expo](https://docs.expo.dev/get-started/installation) is a set of tools and services built around React Native and, while it has many features, the most relevant one right now is that it can get you **writing a React Native app within minutes**. You only need a recent version of Node.js and a phone or emulator.

# Prerequisites

On your **PC**, you will need to have installed:
- [Visual Studio Code](https://code.visualstudio.com)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com) (usually bundled with Node.js)
> 💡 You can run `node --version` in your terminal to confirm if Node.js is already installed onto your machine. 

On your **smartphone**, you will need to have installed:
- [Expo Go](https://expo.dev/client) (available on the App Store and Google Play). This lets you scan a QR code for the app you're developing from your PC so that it renders on your phone, where it is easier to view and test changes.

# Setting up

Once you have cloned the repository, open your terminal and navigate into the project directory.

> `cd ilta-starter`

Install the required packages for the project locally by running:

> `npm i`

This may take a little bit of time, but will eventually generate a folder called `node_modules` in your root directory, based on the dependencies in the `package-lock.json` file. This step ensures you install the correct versions of the necessary modules.

# Running the project

You will be using the Expo CLI by leveraging `npx`, a Node.js package runner. You can view the list of available commands by running:

> `npx expo --help`

To **start the development server**, simply run:

> `npx expo`

As the server starts, a QR code will be displayed in your terminal. Scan this on your smartphone using Expo Go. Expo Go will download a Javascript bundle along with any assets needed and render the React Native app straight to your screen.

You will also notice a new folder called `.expo` appear in your project directory, which you can ignore.

# Contributing

The `main` branch contains the most up-to-date and stable version of the code. **Do not work directly on it**; instead, create a new branch or work on another related existing one for every significant change you would like to commit.

Some conventions to follow for naming branches:
- **Feature branches** are used for developing new features. Use the prefix `feature/`. For instance, `feature/literacy-test`.
- **Bugfix branches** are used to fix bugs in the code. Use the prefix `bugfix/`. For example, `bugfix/header-styling`.
- **Documentation branches** are used to write, update, or fix documentation. Use the prefix `docs/`. For instance, `docs/project-overview`.


# Note for the GSC team

The version of Node you have installed may not be compatible with some of the packages used. To manage multiple Node versions across projects, you can install and use `nvm`.

If you encounter any problems during the setup that you think should be documented or amended, create an issue for it, or reach out to [Injila](github.com/injl) on Slack.