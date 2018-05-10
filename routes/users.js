var express = require('express');
var router = express.Router();

const User = require('../models/user');



router.get('/', (req, res, next) => {
  User.find({})
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});

module.exports = router;
