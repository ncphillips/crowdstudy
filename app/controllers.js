'use strict';
exports.index = function (req, res) {
    res.render('index', req.context);
};

exports.survey = function (req, res) {
  res.render('survey');
};

exports.no_comparison_survey = function (req, res) {
  res.render('no_comparison_survey');
};

exports.comparison_survey = function (req, res) {
  res.render('comparison_survey');
};

exports.consent = function (req, res) {
  res.render('demographics-consent');
};



