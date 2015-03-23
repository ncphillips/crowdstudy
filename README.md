# Crowd Study
Starting in March 2015, the UPEI HCI Lab will be conducting a number of 
experiments related to crowd work. In order to track data gathered from 
these experiments, we have created CrowdStudy. This application for serving
files, and collecting results for each experiment.

## Getting Started
Before you can get started using the Crowd Study platform, you must make sure to sign up for
both Crowdflower and Amazon's Mechanical Turk.

### Crowdflower
Go to [Crowdflower's website](http://make.crowdflower.com) to sign up for their account.

### Amazon Mechanical Turk
* [Sign up](https://aws-portal.amazon.com/gp/aws/developer/registration/index.html) for an Amazon Web Services account.
* [Sign up](https://requester.mturk.com) to be an Amazon Mechanical Turk requester
* Configure the Command Line Tools to use your AWS identifier:
    * View the [Security Credentials](https://console.aws.amazon.com/iam/home?#security_credential) page to find or
    generate your access and security keys. These must be for your root account, not for one of the IAM User accounts.
    * `cp /path/to/crowdstudy/mturk-clit/bin/mturk.properties_copy /path/to/crowdstudy/mturk-clit/bin/mturk.properties`
    * Open `mturk-clit/bin/mturk.properties`
    * On lines 11 and 12, insert your access and secret keys, respectively.
* Set the `MTURK_CMD_HOME` environment variable to `./mturk-clt`
    * `echo export MTURK_CMD_HOME="/path/to/crowdstudy/mturk-clt" >> ~/.profile`
* Make sure you have the Java JRE installed:
    * The default JRE can be installed with `sudo apt-get install default-jre`, but any other version will do.
* Set the `JAVA_HOME` environment variable to your Java Standard Edition Runtime Environment (JRE) installation location.
    * With default-jre, run `echo export JAVA_HOME="/usr/" >> ~/.profile`
* Test things out by getting your AWS account balance.
    * `cd /path/to/crowdstudy/mturk-clt/bin/`
    * `sh getBalance.sh`
    * This should print something like `Your account balance: $0.00`
    * **Note:** This MUST be run from within `mturk-clt/bin` directory.

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

### The Worker Collection
Information about workers from Crowdflower and Mechanical Turk will be stored in a 
MongoDB `workers` collection. These documents will have the following structure:

    {
        id: 1341235,                // The Crowdflower or mTurk ID.
        platform: 'crowdflower',    // A string containing either "crowdflower" or "mturk"
        experiments: {              // Each sub-object here will have whatever format suits the experiment.
            ajax_interaction: {
                headers: { ... },
                img: ['a.jpg', 'c.jpg'],
            },
            example: {
                name: 'Billy Joel'
            },
            external_link: {
                dob: {
                    year: 1992,
                    month: 2,
                    day: 21
                }
            }
        }
    }

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
Some experiments will be carried out using an link on the job page. This link takes him to a page hosted by this platform
where he is asked to supply his Crowdflower or mTurk worker id, and complete a survey. After completing the survey, the 
worker is given code which he must paste into a textfield back on Crowdflower/mTurk. The worker is then given a bonus
if he has submitted the correct code.

This experiment is pretty simple: 3 views, 3 routes, 3 controllers, and a couple helper functions.

`GET /` calls the `get_survey` controller, which renders `survey.jsx` to show the worker the initial survey page.

`POST /` calls `post_survey` which validates the form. If it is not valid, then `survey.jsx` is re-rendered with the appropriate errors. If the form
is valid, then the worker's information is saved to Mongo and a code is generated and displayed by rendering `code_page.jsx`.

If an unexpected error occurs, `error_page.jsx` is rendered.

`POST /webhook` is accessed by Crowdflower for when send back the judgments gathered. The `webhook` controller handles this route.

## Using CrowdStudy
To run the CrowdStudy server:

    grunt | bunyan -o short


