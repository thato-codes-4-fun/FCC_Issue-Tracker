const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issue_title: {
    type: String,
    required: true,
  },
  issue_text: {
    type: String,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: String,
    required: false,
  },
  status_text: {
    type: String,
    required: false,
  },
  open: {
    type: Boolean,
    default: true,
  },
},{
  timestamps: {
      createdAt: 'created_on',
      updatedAt: 'updated_on'
  }
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