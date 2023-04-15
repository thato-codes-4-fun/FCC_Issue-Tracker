'use strict';
const Issue = require('../model/issue')
const { createIssue, getAllIssues, deleteIssue } = require('../controller/issueTrack')

module.exports = function(app) {


  app.route('/api/issues/:project')

    .get(getAllIssues)

    .post(createIssue)

    .put(function(req, res) {
      let project = req.params.project;

    })

    .delete(deleteIssue);

};
