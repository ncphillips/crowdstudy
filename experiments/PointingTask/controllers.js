exports.renderPointingTaskApp = function(req, res) {
    context = {
        worker_id: 12345,
        platform: 'crowdflower'
    };

    res.render('pointing', context);
};