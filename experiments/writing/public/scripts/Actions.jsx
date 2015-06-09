var WritingExperimentActions = {
  create: function (text) {
    Dispatcher.handleViewAction({
      actionType: TodoConstants.CREATE,
      text: text
    });
  }
};

module.exports = WritingExperimentActions;