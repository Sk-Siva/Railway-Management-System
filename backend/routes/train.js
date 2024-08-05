const express = require('express');
const router = express.Router();
const { bookSeat, getSeatAvailability } = require('../controllers/trainController');
const { verifyToken } = require('../middleware/authMiddleware');


router.post('/book', bookSeat);
router.get('/availability', getSeatAvailability);

module.exports = router;