'use strict';

module.exports = function(app) {

  let items = [
    {
      "_id": "5871dda29faedc3491ff93bb",
      "issue_title": "Fix error in posting data",
      "issue_text": "When we post data it has an error.",
      "created_on": "2017-01-08T06:35:14.240Z",
      "updated_on": "2017-01-08T06:35:14.240Z",
      "created_by": "Joe",
      "assigned_to": "Joe",
      "open": true,
      "status_text": "In QA"
    },
  ]

  app.route('/api/issues/:project')

    .get(function(req, res) {
      let project = req.params.project;
      console.log(req.body)
      console.log('hello project', project)
      res.json(items)
    })

    .post(function(req, res) {
      let project = req.params.project;
      console.log(req.body)
      let { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      
      
      res.send('creating post')

    })

    .put(function(req, res) {
      let project = req.params.project;

    })

    .delete(function(req, res) {
      let project = req.params.project;

    });

};
