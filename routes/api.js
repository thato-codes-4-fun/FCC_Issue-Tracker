'use strict';
const Issue = require('../model/issue')
const { createIssue, getAllIssues, deleteIssue, updateIssue } = require('../controller/issueTrack')

module.exports = function(app) {


  app.route('/api/issues/:project')

    .get(getAllIssues)

    .post(createIssue)

    .put(updateIssue)

    .delete(deleteIssue);

};
