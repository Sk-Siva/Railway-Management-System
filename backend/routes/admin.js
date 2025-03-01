const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

const {registerAdmin,loginAdmin} = require("../controllers/userController")
const {addTrain, deleteTrain } = require('../controllers/trainController');
const { verifyAdmin ,checkApiKey} = require('../middleware/adminMiddleware');
const { verifyToken} = require('../middleware/authMiddleware');

// Route for admin login
router.post('/admin/login', loginAdmin);

// Route to add a new train
router.post('/train', addTrain);

// Route to delete a train
router.delete('/train/:id',deleteTrain);

module.exports = router;