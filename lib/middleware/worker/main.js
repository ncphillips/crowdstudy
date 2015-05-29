'use strict';

module.exports = {
  list: require('./list'),
  get_or_create: require('./get_or_create'),
  register_for_experiment: require('./register_for_experiment'),
  submit_experiment_results: require('./submit_experiment_results'),
  crowdflower: require('./crowdflower'),
  mturk: require('./mturk')
};
