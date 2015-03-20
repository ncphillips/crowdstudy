# CrowdStudy
Starting in March 2015, the UPEI HCI Lab will be conducting a number of 
experiments related to crowd work. In order to track data gathered from 
these experiments, we have created CrowdStudy. This application for serving
files, and collecting results for each experiment.

## Server & Framework

The server is written in Javascript using the Expressjs framework. It is
being run by io.js, a fork of Node.js which uses Chrome v8 engine and
supports ES6. 

Run the following commands to install io.js on your machine.

    #! /bin/bash
    curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash
    source ~/.nvm/nvm.sh 
    nvm install iojs
    
 

## Database
Data is stored in a Mongo database, which is made accessible through `req.db`. By default, there are no models 
or any other kind of type checking, but feel free to add them as needed.


## View rendering
The React library is used both server and client side.

Server side React components are rendered to static markup. 

Any client side JSX files located in an experiments `public/scripts` directory are compiled to 
Javascript when the server starts.

## Logging
A global `log` variable provides access to a bunyan logger. 

## Documentation
Two forms of documentation applications will used in this project: docco and JSDocs.

Run `docco *` at the command line to generate docco docs.

JSDocs is not yet supported.

## Experiments
Each experiment is represented by an Express app located in the 
`experiments` directory. These experiments are mounted on a URL
which corresponds to the experiment name. 

Three example experiments are provided. The first is a simple example that just shows how to make 
an experiment app, the second is an app which is meant to be interacted with using client-side javascript
built into the Crowdflower and mTurk jobs, and the third is meant to be accessed via an external link.

### Basic App Structure
Experiment sub-applications have the following structure:

    example/
        public/
            scripts/
                ExampleButton.jsx
                ExampleButton.js
                ExampleInput.jsx
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
* public/ – Contains public files specific to this experiment.
    * scripts/ – `.jsx` files here are compiled to `.js` files in the same directory when the server starts. 

Check out example experiment's source code to see how it's being used. 

A couple notes on creating experiments:

1. You shouldn't have to change `app.js` for different experiments.
1. Note that the React classes defined in `views` are rendered to static markup. Those views cannot be mounted on 
the client, which means functions like `handleClick` won't work on them. See the [`express-react-views`](https://github.com/reactjs/express-react-views) page for more info.
1. Make sure any scripts being loaded into views are `https` safe.

### AJAX Interaction Example
TODO
### External Link Example
TODO 
        
## Using CrowdStudy
To run the CrowdStudy server:

    grunt | bunyan -o short


