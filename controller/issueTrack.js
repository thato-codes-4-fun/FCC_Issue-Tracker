
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

module.exports = { createIssue }