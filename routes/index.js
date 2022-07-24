var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Expressssssssss' });
});

router.get('/sms', function(req, res, next) {
	res.render('sms', { title: 'SMS' });
});

module.exports = router;
