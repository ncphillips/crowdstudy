exports.index = function (req, res) {
    res.render('index', {title: 'Crowd Study'});
};

exports.worker_list = function (req, res) {
    req.db.collection('workers').find().toArray(function (err, workers) {
        if (err) return res.status(500).send('Uh oh!');
        res.render('worker_list', {workers: workers});
    });
};

