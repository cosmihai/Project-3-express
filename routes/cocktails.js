var express = require('express');
var router = express.Router();

const Cocktail = require('../models/cocktail');

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


router.get('/:id', (req, res, next) => {
  Cocktail.findById(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(next)
});

router.post('/create', (req, res, next) => {
  res.json('this is the create route')
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



// router.get / cocktails /? ingredient
// router.put / cocktails /: id



module.exports = router;
