# Crowdstudy

Crowdstudy is an Node-Express project for running crowd work experiments.

* Access to a Mongo database is provided to middleware via `req.db`.
* EJS is used for rendering views.
* Express sub-apps can be used to provide new functionality or experiments.

## Crowdflower
* [Signup](http://make.crowdflower.com) to be a Crowdflower requester.
* Go to the [user page](https://make.crowdflower.com/account/user) and copy your API Key.
* `cp /path/to/crowdstudy/cf_api_key_dummy.js /path/to/crowdstudy/cf_api_key.js`
* Open `/path/to/crowdstudy/cf_api_key.js` and paste your API Key in the quotes.


    // @module cf_api_key.js
    module.exports = "BWzjrz3NURGCG_NgLrNq";
    
### Crowdflower Job Setup

Navigate to Crowdflower's [new job page](http://make.crowdflower.com/jobs/new).

Under **Survey Job** click **Get Started**.

Go to the CML Editor.

Set the Title and Instructions to what you want.

Use the following CML, but make sure to replace the link url:

    <h3>
      <a href="https://example.com/external_experiment" 
         class="clicked validates-clicked" target="_blank">
           Follow this link to complete our survey!
      </a>
    </h3>
    <cml:text label="Survey Code" name="code" validates="required" 
              data-validates-regex-message="Please copy and paste the code here that can be found at the end of the Survey" 
              default="Enter code here..." instructions="Enter Survey code in this field after completing" />
              
  
## Server & Framework

The server is written in Javascript using the Expressjs framework. It is
being run by io.js, a fork of Node.js which uses Chrome v8 engine and
supports ES6, the latest Javascript standard.

Run the following commands to install io.js on your machine.

    #! /bin/bash
    curl https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh | bash
    source ~/.nvm/nvm.sh
    
    # Install io.js
    nvm install iojs
    
    # Load nvm and iojs from profile
    echo source ~/.nvm/nvm.sh >> ~/.profile
    echo nvm use iojs >> ~/.profile
    source ~/.profile
    
    # Move to the crowdstudy folder, and install node modules
    cd /path/to/crowdstudy
    npm install

### Database
Data is stored in a Mongo database, which is made accessible through `req.db`. By default, there are no models 
or any other kind of type checking, but feel free to add them as needed. 

#### The Worker Collection
This is implemented by the [Worker App](http://github.com/ncphillips/crowdstudy_worker)
Information about workers from Crowdflower and Mechanical Turk will be stored in a 
MongoDB `workers` collection. They have the following structure:

    {
        _id: "ab1ff14fba2516b0",    // MongoDB _id
        id: 1341235,                // The Crowdflower or mTurk ID.
        platform: 'crowdflower',    // A string containing either "crowdflower" or "mturk"
        experiments: {              // Each sub-object here will have whatever format suits the experiment.
            MyExperiment: {
               data: "Worker Input"
            },
            boopExp: {
                dob: {
                    year: 1992,
                    month: 2,
                    day: 21
                }
            }
        }
    }

## Sub Apps
### Installing Sub Apps
Sub apps are registered in the `INSTALLED_APPS` array in `config.js`.

If your sub app is not loaded using `npm` you should be able to 
use a relative path in `INSTALLED_APPS` instead.

### Mounting Sub Apps to URLs
Sub apps are mounted on a url endpoint matching their name. For example,
a sub app named `foo` will be accessible from `example.com/foo/`. 

Note that sub apps whose name begins with `crowdstudy_` will be
mounted without that prefix. e.g. `crowdstudy_bar` will be 
accessible from `example.com/bar`.

### Sub App Structure

The only real restriction on Sub App design is that the module 
must expose an `app` property. Crowdstudy looks for this app 
property when trying to mount the app on its URL.

e.g. `var barApp = require('crowdstudy_bar').app;`

Current apps use the following structure for their main `js` file:

    var app = require('express')();

    // Tells the application to look for views in `./views` before 
    // looking in the global views folder..
    app.set('views', __dirname+'/views');

    // Static files are in ./public and are available at this route.
    // Example:
    //      <img src="/mole_0.jsx"/>
    app.use(express.static(__dirname + '/public'));

    // Loads this application's routes.
    require('./routes.js')(app);

    module.exports.app = app;
    module.exports.controllers = require('./controllers');

This structure sets some things up for static files and routes, but it
is by no means the only way to write a sub app. As long as the module
exports the `express` app in an `app` property.

* [Pointing Task](http://github.com/ncphillips/crowdstudy_pointing_task)
* [Whack a Mole](http://github.com/ncphillips/crowdstudy_whack_a_mole)
* [Writing Task](http://github.com/ncphillips/crowdstudy_writing_task)

### Crowdstudy React
A single page [React](https://facebook.github.io/react/) application called
`CrowdExperiment` has been created to facilitate running 
crowd experiments. This app does the following things:

 * Registers the Worker using their ID and platform information.
 * Collects consent from the worker.
 * Has the worker complete an entrance demographics survey>
 * Runs the experiment.
     * this.props._exit()
 * Has the worker complete an exit survey.
 * Generates a Confirmation Code for the worker to copy-and-paste back on 
   the crowd work platform they came from.
   
In order to save data collected during the experiment, you will have access to
the `ExperimentActions` and `ExperimentStore`. Your React component will be 
passed a `prop` called `_exit`. This is a function that, when called, tells
the `CrowdExperiment` app that the experiment is over–it then m
   
#### Running your Experiment
In order to take advantage of this, you will need to wrap your experiment in
a React component, and then pass it to the CrowdExperiment application. For example:


    React.render(
      <CrowdExperiment experiment_name="MyExperiment" experiment_app={MyExperiment}/>,
      document.getElementById('experiment');
    );

#### Workers 
The `WorkerStore` and `WorkerActions` objects can be used to interact with
a worker's information.

You can have your React Experiment listen for changes to the Worker model 
by calling `WorkerStore.addChangeListener` inside the `componentDidMount`
function of a component. Remember to stop listening to the component with
`WorkerStore.removeChangeListener` inside the `componentWillUnmount`
function of the component. To get the current Worker object from the
store, use `WorkerStore.get`. For example:

    var MyExperiment = React.createClass({
      render: function () { /* ... */ },
      
      componentDidMount: function () {
        // Start listening for changes to the Worker
        WorkerStore.addChangeListener(this.refreshWorker);
      },
      
      componentWillUnmount: function () {
        // Stop listening for changes to the Worker
        WorkerStore.removeChangeListener(this.refreshWorker);
      },
      
      refreshWorker: function () {
        // Get the worker and update the components State.
        this.setState({worker: WorkerStore.get()});
      }
    });
    
Changes can be made to the Worker object by calling 
`WorkerActions.update`. For example:


    var worker = WorkerStore.get();
    worker.first_name = 'Billy';
    worker.last_name = 'Joel';
    
    /**
     * @params worker_id: String
     * @params worker: object
     */
    WorkerActions.update(worker._id, worker);

This will update the worker object both locally and on the server.

#### Experiments

Experiments can be accessed and modified in a very similar way to Workers, by
using the `ExperimentStore` and `ExperimentActions` objects.

The `ExperimentStore` holds only one experiment at a time. You can get 
that experiment by calling `ExperimentStore.get`.

Experiment objects can be updated using `ExperimentActions.update`. For example:

    var worker = WorkerStore.get();
    var experiment = ExperimentStore.get();
    
    experiment.data = "Some new data";
    
    /**
     * @param worker_id: String
     * @param experiment_name: String
     * @param experiment: object
     */
    ExperimentActions.update(worker._id, 'MyExperiment', experiment);


## Running Crowdstudy
Run the Server: `node server.js`

Crowdstudy names the database it's connected to based off the 
`NODE_ENV` environment variable. If you want to change the database
to use, then run this command: `NODE_ENV=production node server.js`

