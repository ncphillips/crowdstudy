exports.index = function (req, res) {
    res.render('index', {title: 'Crowd Study'});
};

exports.worker_list = function (req, res) {
    req.db.collection('workers').find().toArray(function (err, workers) {
        if (err) return res.status(500).send('Uh oh!');
        res.render('worker_list', {workers: workers});
    });
};

exports.getBalance = function (req, res) {
    var mturk_clt_bin = require('path').resolve('./mturk-clt/bin');

    var balance = require('child_process').execSync('/bin/bash getBalance.sh', { 'cwd': mturk_clt_bin});

    res.send(balance);

};

