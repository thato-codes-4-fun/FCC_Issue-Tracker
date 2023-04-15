const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issue_title: String
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;

// {
    //   "_id": "5871dda29faedc3491ff93bb",
    //   "issue_title": "Fix error in posting data",
    //   "issue_text": "When we post data it has an error.",
    //   "created_on": "2017-01-08T06:35:14.240Z",
    //   "updated_on": "2017-01-08T06:35:14.240Z",
    //   "created_by": "Joe",
    //   "assigned_to": "Joe",
    //   "open": true,
    //   "status_text": "In QA"
    // },