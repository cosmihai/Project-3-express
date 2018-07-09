var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({welcome: 'hello i am backend of mihai'});
});

module.exports = router;
