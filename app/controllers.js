exports.index = function (req, res) {
    res.render('index', req.context);
};

exports.survey = function (req, res) {
  res.render('survey');
};

exports.consent = function (req, res) {
  res.render('demographics-consent');
};



