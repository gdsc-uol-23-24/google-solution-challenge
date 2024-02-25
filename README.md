# LiteraDraw — Google Solution Challenge 2024

Empowering children who enter primary school at an academic disadvantage to meet key literacy benchmarks, **one drawing at a time.**

<p align="center">
  <img src="src/assets/images/literadraw-logo-large.png" alt="LiteraDraw Logo" width="25%" />
</p>


## Overview

LiteraDraw is an Android-first mobile application, built to assess and provide feedback to users on the presence of pre-writing shapes in simple pencil drawings made by children belonging to the 3–11 age group.

The application utilizes image processing and machine learning techniques to classify, extract, and rate these drawn shapes in accordance with the **Battelle guide**, offering insights to adult users on the development status of the child's pre-literacy skills. Included within these insights are further recommendations for the child based on their perceived strengths and weaknesses, which serve as a crucial starting point to bridge the gap between their current and expected literacy level.


## Project structure

This is a full-stack mobile application, with components divided among two folders:

- **Frontend components:**  
    The `src` folder is the main container of all the frontend code inside the application. It contains the following sub-folders.
    - `assets` (for static images or fonts)
    - `components` (for reusable UI elements)
    - `routes` (for navigation-related code)
    - `screens` (for rendering individual screens)

    The `App.js` file in the root directory is the entry point and main component of the application.

- **Backend components:**
    - `app.py`: An API script facilitating communication between the front-end and back-end.
    - `algorithm.py`: Manages data from the backend, extracting, classifying, and assessing drawings sent from the frontend.
    - `Models` folder: Contains pre-trained models for drawing classification and assessment.

- **Additional Components**
    - The code for training our model is located on a separate branch. You can access and review it by visiting the following link: [Our Models](https://github.com/gdsc-uol-23-24/google-solution-challenge/tree/feature/how-we-train-our-model/model_training).

## Prerequisites

On your **PC**, you will need to have installed:
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com) (usually bundled with Node.js)
> 💡 You can run `node --version` in your terminal to confirm if Node.js is already installed onto your machine.
- [Python 3.6+](https://www.python.org)

On your **smartphone**, you will need to have installed:
- [Expo Go](https://expo.dev/client) (available on the App Store and Google Play). You can use this app to scan the QR code that is generated once you start the project server, making it easy to view the project on your own mobile device.


## Installation

Once you have cloned the repository, open your terminal and navigate into the project directory.
> `cd google-solution-challenge`

## Backend

Navigate to the backend directory.
> `cd backend`

Set up a virtual environment.
> `python -m venv [name of your virtual environment]`    

Install the required dependencies.
> `pip install -r ./requirements.txt`

Initiate the Flask server.
> `flask run --host=0.0.0.0`

After starting the server, make a note of the IPv4 address displayed along with the port. You will need it later when running the frontend.
```
# Message from server:
Running on http://185.107.80.231:5000

# In this example, your IPv4 address and port is 'http://185.107.80.231:5000'
```
⚠ Ensure that you execute the Flask server on your local computer and utilize the Expo Go app on your mobile device, ensuring that both are connected to the same internet network.

## Frontend

Open a new terminal, different to the terminal that you’re running the backend server in, and navigate to the frontend directory.
> `cd frontend`

Install the required packages for the frontend by running:
> `npm i`

This may take a little bit of time, but will eventually generate a folder called `node_modules` in your frontend folder, based on the dependencies specified in the `package-lock.json` file.

Next, in your IDE, open ./src/screens/LiteracyAssessment.js, and **initialize the `backendUrl` variable** in **line 9** to the same IPv4 address returned by your Flask server. It will look something like this:
> `const backendUrl = http://185.107.80.231:5000`

Now that you’re set up, you can use the Expo CLI to launch the app by leveraging `npx`, a Node.js package runner. View the list of available commands by running:
> `npx expo --help`

To **start the development server**, simply run:
> `npx expo`

As the server starts, a **QR code** will be displayed in your terminal. Scan this on your smartphone using Expo Go. Expo Go will download a Javascript bundle along with any assets needed and render the React Native app straight to your screen.


## Usage

(We'll add screenshots)


## Contributors

[Francis](https://github.com/francisblessedkim)  
[Hamza](https://github.com/SelfTaught-HamzaCodes)  
[Injila](https://github.com/injl)  
[Jana](https://github.com/JanaDragovic)


## Credits
- Battelle guide from [ Design, Implementation and Evaluation of a Support System for Educators and Therapists to Rate the Acquisition of Pre-Writing Skills](https://ieeexplore.ieee.org/document/9440430).
- [Kid Sense: Writing Readiness (Pre-Writing) Skills](https://childdevelopment.com.au/areas-of-concern/writing/writing-readiness-pre-writing-skills/).

<br>

***
Thank you,          
**Team LiteraDraw**
