const mongoose = require('mongoose')
const Issue = require('../model/issue')


const createIssue = async (req, res) => {  
  console.log('creating issue...')
  let { issue_title, issue_text, created_by, assigned_to, status_text, open} = req.body
  
  if (!issue_title){
    console.log('missing title')
    return res.json({ error: 'required field(s) missing' })
  }
  
  if (!issue_text){
    console.log('missing issue text')
    return res.json({ error: 'required field(s) missing' })
  }
  if(!created_by){
    console.log('missing created by')
    return res.json({ error: 'required field(s) missing' })
  }
  if (!assigned_to){
    assigned_to = ''
  }
  if(!status_text){
    status_text = ''
  }
  if(!open){
    open = true
  }
  let newIssue = new Issue({
    assigned_to,
    status_text,
    open,
    issue_title,
    issue_text,
    created_by,
  })
  let issue = await newIssue.save()
  console.log(issue)
  if (!issue){
    console.log('error issue not created')
    return res.json({error: 'issue not saved'})
  }
  console.log('issue created successfully...')
  return res.send({
    assigned_to: issue.assigned_to,
    status_text: issue.status_text,
    open: issue.open,
    _id: issue._id,
    issue_title: issue.issue_title,
    issue_text: issue.issue_text,
    created_by: issue.created_by,
    created_on: issue.created_on,
    updated_on: issue.updated_on
  })
} 

const getAllIssues = async(req, res) => {
  console.log('getting all issuess...')
  console.log('the query is ...',req.query)
  const query = req.query
  try {
    let issues = await Issue.find().select('assigned_to status_text open _id issue_title issue_text created_by created_on updated_on')
    return res.status(200).send([issues])
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
}

const deleteIssue = async (req, res) => {
  console.log('deleting issue...')
  console.log(req.body._id)
  const { _id } = req.body

  if(!_id) {
    return res.send({ error: 'missing _id' })
  }
  // if(!mongoose.isValidObjectId(_id)){
  //   return 
  // }
  try {
    let deleted = await Issue.deleteOne({_id})
    console.log('the item ',deleted)
    if(deleted.deletedCount === 0){
      console.log('failed to delete')
      return res.json({ error: 'could not delete', '_id': _id })
    }
    else if (deleted.deletedCount === 1) {
      console.log('item deleted')
      return res.json({ result: 'successfully deleted', '_id': _id })
    }
      
  } catch (error) {
    console.log('error occurred')
    return res.json({ error: 'could not delete', '_id': _id })
  }
  return res.send('deleting issue')
}

const updateIssue = async (req, res) => {
  console.log('updating issue')
  res.send('updating issue')
}


module.exports = { createIssue, getAllIssues, deleteIssue, updateIssue }