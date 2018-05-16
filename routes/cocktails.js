var express = require('express');
var router = express.Router();

const Cocktail = require('../models/cocktail');
const User = require('../models/user');

// router.get('/search/?ingredient', (req, res, next) => {
//   res.json(req.query.ingredient)
// })

router.get('/', (req, res, next) => {
  Cocktail.find({})
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});

router.get('/users/:id', (req, res, next) => {
  Cocktail.find({owner: req.params.id})
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});


router.get('/:id', (req, res, next) => {
  Cocktail.findById(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});

router.post('/create', (req, res, next) => {

  const data = {
    name: req.body.name,
    glass: req.body.glass,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    garnish: req.body.garnish,
    preparation: req.body.preparation,
    ingredients: req.body.ingredients,
    owner: req.body.owner
  }

  const newCocktail = new Cocktail(data);

  newCocktail.save()
    .then((result) => {
      res.status(201).json(result)
    })
    .catch(next)

});

router.put('/:id/edit', (req, res, next) => {
  const newData = {
    name: req.body.name,
    glass: req.body.glass,
    category: req.body.category,
    imageUrl: req.body.imageUrl,
    garnish: req.body.garnish,
    preparation: req.body.preparation,
    ingredients: req.body.ingredients,
    owner: req.body.owner
  }
  // this is for mongoose to automatically update the user -goes as third parameters in findAndUpdate-
  const options = {
    new: true
  }
  // if there is now user with this id???
  Cocktail.findByIdAndUpdate(req.params.id, newData, options)
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});

router.delete('/:id/delete', (req, res, next) => {
  Cocktail.findById(req.params.id)
    .then((result) => {
      result.remove()
        .then(() => {
          res.json(result)
        })
        .catch(next)
    })
    .catch(next)
});






module.exports = router;
