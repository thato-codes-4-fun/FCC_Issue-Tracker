
const Issue = require('../model/issue')


const createIssue = async (req, res) => {  
  console.log('creating issue...')
  let { issue_title, issue_text, created_by, assigned_to, status_text} = req.body
  let newIssue = new Issue({
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
  })
  let issue = newIssue.save()
  if (!issue){
    return res.json({error: 'issue not saved'})
  }
  console.log('issue created successfully...')
  return res.json({issue})
} 

const getAllIssues = async(req, res) => {
  console.log('getting all issuess...')
  try {
    let issues = await Issue.find()
    return res.status(200).send(issues)
  } catch (error) {
    console.log(error)
    return res.status(500).json({error})
  }
  return res.status(404)json({data: 'issues goes here'})
}


module.exports = { createIssue, getAllIssues }