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




module.exports = router; 