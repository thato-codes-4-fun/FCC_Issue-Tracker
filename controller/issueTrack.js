const mongoose = require('mongoose')
const Issue = require('../model/issue')


const createIssue = async (req, res) => {
  let { project } = req.params
  
  console.log('creating issue...')
  console.log(req.body)
  let { issue_title, issue_text, created_by, assigned_to, status_text, open} = req.body
  
  if (!issue_title){
    return res.json({ error: 'required field(s) missing' })
  }
  
  if (!issue_text){
    return res.json({ error: 'required field(s) missing' })
  }
  if(!created_by){
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
    project,
    assigned_to,
    status_text,
    open,
    issue_title,
    issue_text,
    created_by,
  })
  let issue = await newIssue.save()
  if (!issue){
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
  let { project } = req.params;
  console.log(project)
  console.log('getting all issuess...')
  const query = req.query
  console.log(Object.keys(query).length)
  if(Object.keys(query).length > 0){
      try {
        let querydata = Object.assign(req.params, query)
      
    let issues = await Issue.find(querydata).select('assigned_to status_text open _id issue_title issue_text created_by created_on updated_on')
    return res.status(200).send(issues)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
  }
  try {
    let issues = await Issue.find({project}).select('assigned_to status_text open _id issue_title issue_text created_by created_on updated_on')
    return res.status(200).send(issues)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
}

const deleteIssue = async (req, res) => {
  const { _id } = req.body

  if(!_id) {
    return res.send({ error: 'missing _id' })
  }
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
    console.log('error occurred deleting')
    return res.json({ error: 'could not delete', '_id': _id })
  }
  return res.send('default delete ')
}

const updateIssue = async (req, res) => {
  console.log('updating issue...')
  let {project} = req.params

  if(!project){
    return res.json({error: 'missing project name'})
  }
  let { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body

  if(!_id){
    return res.json({ error: 'missing _id' })
  }
  if(!issue_title  && !issue_text && !created_by  && !assigned_to  && !status_text  && !open){
    return res.json({ error: 'no update field(s) sent', '_id': _id })
  }
  try{
    let updated = await Issue.updateOne({_id, project}, req.body)
    if (updated.modifiedCount == 0) {
      await updated.save();
      return res.json({ error: 'could not update', '_id': _id })
    }
    return res.json({  result: 'successfully updated', '_id': _id })
  }catch(e){
    console.log('some error')
    return res.json({ error: 'could not update', '_id': _id })
  }
}


module.exports = { createIssue, getAllIssues, deleteIssue, updateIssue }