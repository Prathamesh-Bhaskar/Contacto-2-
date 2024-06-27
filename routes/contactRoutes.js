const express = require('express');
const router = express.Router();
const { createContact, editContact, searchContact } = require('.. /controllers/contactController');

router.post('/create', createContact);
router.put('/edit', editContact);
router.post('/search', searchContact);

module.exports = router;
