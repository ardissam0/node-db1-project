const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();


//select * from accounts
router.get("/", (req, res) => {
    db.select("*")
    .from("accounts")
    .then((accounts) => {
        res.status(200).json({data: accounts });
    })
    .catch((error) => {
        res.status(500).json({error: error.message})
    })
})


//find by id
router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first()
      .then((account) => {
        res.status(200).json({ data: account });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });


//Add account
router.post('/', (req, res) => {
    const accData = req.body
    db('accounts')
    .insert(accData, 'id')
    .then(newId => {
        const id = newId[0];
        db('accounts')
        .where({id})
        .first()
        .then(newAcc => {
            res.status(200).json(newAcc)
        })
        .catch(error => {
            res.status(500).json({error: 'error'})
        })
    }) 

});


//updating accounts using patch
router.patch('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params
    db('accounts')
    .where({id})
    .update(changes)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: 'update success'})
        } else {
            res.status(404).json({message: 'error, update unsuccessful'})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'error'})
    })
})


//



module.exports = router; 