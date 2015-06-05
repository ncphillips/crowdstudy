exports.index = function (req, res) {
    res.render('index', req.context);
};

exports.worker_list = function (req, res) {
    res.render('worker_list', {workers: req.context.workers});
};

exports.survey = function (req, res) {
  res.render('survey');
};



