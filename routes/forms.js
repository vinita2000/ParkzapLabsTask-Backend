var express = require('express');
var router = express.Router();
const { getForms } = require('../controllers/getForm');
const { addForm } = require('../controllers/addForm');

/* GET forms */
router.get('/get-forms', getForms);

/* POST add form */
router.post('/add-form', addForm);

module.exports = router;
