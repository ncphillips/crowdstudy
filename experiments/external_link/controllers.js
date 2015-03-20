'use strict';

/**
 * @description
 * <p>
 *     An example controller function. It renders the view located at "views/index.jsx".
 * </p>
 * @param req
 * @param res
 */
exports.get_form = function (req, res) {
    // Render a JSX view and sent it as a response.
    res.render(
        // Specifies the view, which is located at ./views/index.jsx
        'index',
        // Context object.
        { title: 'External Survey Example'}
    );
};

exports.post_form = function (req, res) {
    var workers_collection = req.db.collection('workers');

    var worker = {
        platform: "crowdflower",
        id: req.body.worker_id,
        yob: req.body.yob,
        name: req.body.name,
        headers: req.headers
    };

    worker.code = generateCode();

    workers_collection.insert(worker, function (err, result) {
        if (err) {
            console.log(err);
            res.render('error_page');
        }
        else {
            res.render('code_page', {code: worker.code});
        }
    });
};

function generateCode() {
    return 12345;
}

exports.webhook = function (req,res) {
    if (req.body.signal === 'unit_complete') {
        var workers_collection = req.db.collection('workers');

        console.log(req.body);
        var payload = JSON.parse(req.body.payload);

        payload.results.judgments.forEach(function(judgment) {

            var worker_id = judgment.worker_id;
            var code = judgment.data.code;

            workers_collection.find({id: worker_id}).toArray(function (err, docs) {
                if (err) {
                    res.status(200).send();
                }
                else if (docs.length === 1) {
                    console.log(docs);
                    var worker = docs[0];
                    if (worker.code === code) {
                        console.log('Code matched – Give worker a bonus!');
                    }
                    else {
                        console.log('Code mismatch – No bonus for that worker!')
                    }
                }
            });

        });
    }
    res.status(200).send();
};
