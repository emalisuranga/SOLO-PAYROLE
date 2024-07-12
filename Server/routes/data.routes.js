const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

// Define routes
router.post('/save', dataController.saveData);

module.exports = router;
