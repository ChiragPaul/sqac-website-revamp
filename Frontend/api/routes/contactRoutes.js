const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');

router.post('/contact', submitContact);
router.get('/contact', getContacts);

module.exports = router;
