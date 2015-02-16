# CrowdStudy
Starting in March 2015, the UPEI HCI Lab will be conducting a number of 
experiments related to crowd work. In order to track data gathered from 
these experiments, we have created CrowdStudy. This application for serving
files, and collecting results for each experiment.

The server is written in Javascript using the expressjs framwork. It is
being run by io.js, a fork of Node.js which uses Chrome v8 engine and
supports ES6. 

Data is stored in a Mongo database, which is made accessible through `req.db`.

The React library to help create the GUIs needed.

A global `log` variable now provides access to a bunyan logger. 


## Experiments
Each experiment is represented by an Express app located in the 
`experiments` directory. These experiments are mounted on a URL
which corresponds to the experiment name. 

### App Structure
Experiment sub-applications have the following structure:

    example_experiment/
        views/
            index.jsx
        app.js
        controllers.js
        routes.js
    
## Using CrowdStudy
To run the CrowdStudy server:

    grunt | bunyan -o short


