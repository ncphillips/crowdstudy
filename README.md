# CrowdStudy
Starting in March 2015, the UPEI HCI Lab will be conducting a number of 
experiments related to crowd work. In order to track data gathered from 
these experiments, we have created CrowdStudy. This application for serving
files, and collecting results for each experiment.

The server is written in Javascript using the expressjs framwork. It is
being run by io.js, a fork of Node.js which uses Chrome v8 engine and
supports ES6. 

## Database
Data is stored in a Mongo database, which is made accessible through `req.db`. By default, there are no models 
or any other kind of type checking, but feel free to add them as needed.

## View rendering
The React library is used both server and client side. On the serverside, React only generates static markup.

## Logging
A global `log` variable provides access to a bunyan logger. 

## Documentation
Two forms of documentation applications will used in this project: docco and JSDocs.

Run `docco *` at the command line to generate docco docs.


## Experiments
Each experiment is represented by an Express app located in the 
`experiments` directory. These experiments are mounted on a URL
which corresponds to the experiment name. 

### App Structure
Experiment sub-applications have the following structure:

    example/
        public/
            scripts/
                ExampleButton.js
                ExampleInput.js
        views/
            components/
                ExampleList.jsx
            layouts/
                ExampleLayout.jsx
            ExampleLayout.jsx
        app.js
        controllers.js
        routes.js
        

* app.js – This file exports the experiment as an application. It sets up the experiment specific views, static files, and routes.
* controller.js – Contains middleware and controller functions for handling requests.
* routes.js - Is a function which sets up the routes needed for the experiment.
* views/ – Contains React JSX views. These views are rendered to _static markup_.
    * componenets/ – Contains React components. These too are rendered to _static markup_.
    * layouts/ – Contains React layouts. These are also definitely rendered to _static markup_.
* public/ – Contains public files specific to this experiment. e.g. scripts and stylesheets

Check out example experiment's source code to see how it's being used. 

A couple notes on creating experiments:

1. You shouldn't have to change `app.js` for different experiments.
1. Note that the React classes defined in `views` are rendered to static markup. Those views cannot be mounted on 
the client, which means functions like `handleClick` won't work on them. See the [`express-react-views`](https://github.com/reactjs/express-react-views) page for more info.
        
## Using CrowdStudy
To run the CrowdStudy server:

    grunt | bunyan -o short


