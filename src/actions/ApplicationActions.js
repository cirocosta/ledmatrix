var ApplicationDispatcher = require('../dispatcher/AppDispatcher.js');

var ApplicationActions = {
  toggleMaximization () {
    ApplicationDispatcher.handleViewAction({
      actionType: 'toggleMaximization'      
    });
  }
};

module.exports = ApplicationActions;
