const express = require('express');
const router = express.Router();
const { getTeam } = require('../controllers/teamController');

router.get('/team', getTeam);

module.exports = router;
