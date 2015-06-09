var CrowdExperiment = require('CrowdExperiment');

var WritingView = React.createClass({
});
/**
 * Worker is shown a picture.
 * They write a story about that picture.
 * We track:
 *    # of characters
 *    time start
 *    time end
 *    text
 *
 */

var WritingExperiment = React.createClass({

});

React.render(<CrowdExperiment experiment={WritingExperiment}/>, document.getElementById('app'));