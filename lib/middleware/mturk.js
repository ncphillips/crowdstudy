exports.getBalance = function (req, res) {
    var mturk_clt_bin = require('path').resolve('../mturk-clt/bin');

    var balance = require('child_process').execSync('/bin/bash getBalance.sh', { 'cwd': mturk_clt_bin});

    res.send(balance);

};