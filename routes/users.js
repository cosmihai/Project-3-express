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

router.put('/:id/edit', (req, res, next) => {
  const newData = {
    username: req.body.username,
    password: req.body.password,
    pictureUrl: req.body.pictureUrl,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  // this is for mongoose to automatically update the user -goes as third parameters in findAndUpdate-
  const options = {
    new: true
  }
  // if there is now user with this id???
  User.findByIdAndUpdate(req.params.id, newData, options)
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});

module.exports = router;
