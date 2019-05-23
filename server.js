const express = require('express');

const server = express();

// your code here


const dbaccount = require('./data/accounts-model.js');

  server.get('/', (req, res) => {
    res.send(`
      <h2>DB TEST</h2>
    `)
  })

  server.get('/api/accounts', (req, res) =>{
    dbaccount.find()
      .then( accounts => {
        res.status(200).json(accounts)
      })
      .catch( err => {
        res.status(500).json({ error: err, message:"Error: Could not upload data!"})
      })
  })

  server.get("/api/accounts/:id", (req, res) =>{
    const id = req.params.id
    dbaccount.findById(id)
      .then( projectaccounts => {
        res.status(200).json(projectaccounts)
      })
      .catch( err => {
        res.status(500).json({ error: err, message:"Error: Could not upload data!"})
      })
  })

  server.post('/api/accounts', (req, res) => {
    const account = req.body
    dbaccount.add(account)
      .then(account => {
        res.status(200).json(account)
      })
      .catch(err => {
        res.status(500).json({error: err, message: "Error: Could not upload data!"})
      })
    })

  server.put('/api/accounts/:id', (req, res) => {
    const updateAccounts = req.body
    const id = req.params.id

    dbaccount.update(id, updateAccounts)
      .then( project => {
        res.status(200).json(project)
      })
      .catch( err => {
        res.status(500).json({ error: err, message:"Error: Could not upload data!"})
      })
  })

  server.delete('/api/accounts/:id', (req, res)=>{
    const accountsid = req.params.id
    dbaccount.remove(accountsid)
      .then( account =>{
        if(account){
          dbaccount.remove(account).then(
            removeaccount => {
              res.status(201).json(removeaccount)
            }
          )
        }else{
          res.status(404).json({ error: err, mesage : "Error: user does not exist!"})
        }
      })
      .catch( err => {
        res.status(500).json({ error: err, message:"Error: Could not upload data!"})
      })
  })



module.exports = server