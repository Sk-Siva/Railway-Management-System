const Train = require('../models');
const pool = require('../config/db');

//Add Train - user

exports.addTrain = async (req, res) => {
    const { train_name, source, destination, total_seats ,available_seats} = req.body;

    try {

        await pool.query(
            'INSERT INTO trains (trainName, source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?, ?)',
            [train_name, source, destination, total_seats, available_seats]
        );
        res.status(201).json({ message: 'Train added successfully!' });
    } catch (error) {
        console.error('Error adding train:', error);
        res.status(500).json({ message: 'An error occurred while adding the train.' });
    }
};

//Get Availability of seat -user

exports.getSeatAvailability = async (req, res) => {
    const { source, destination } = req.query;
    const [trains] = await pool.query('SELECT * FROM trains WHERE source = ? AND destination = ?', [source, destination]);
    res.status(200).json({trains});
};

//Book Seat -user

exports.bookSeat = async (req, res) => {
    const { train_id, seats, user_id} = req.body;

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        console.log("Checking available seats for train_id:", train_id);
        const [trainRows] = await connection.query('SELECT availableSeats FROM trains WHERE id = ?', [train_id]);

        if (trainRows.length === 0) {
            return res.status(404).json({ message: 'Train not found!' });
        }

        const train = trainRows[0];
        if (train.availableSeats < seats) {return res.status(400).json({ message: 'Not enough seats available!' });
        }
        
        await connection.query('UPDATE trains SET availableSeats = availableSeats - ? WHERE id = ?', [seats, train_id]);

        await connection.query('INSERT INTO bookings (userId, trainId, seatsBooked, bookingDate) VALUES (?, ?, ?, ?)', [user_id, train_id, seats, new Date()]);
        
        await connection.commit();
        console.log("Booking successful");
        res.status(200).json({ message: 'Booking successful!' });
    } catch (error) {
        console.log("Error during booking:", error);
        await connection.rollback();
        res.status(500).json({ message: 'Booking failed!', error: error.message });
    } finally {
        connection.release();
    }
};

// controllers/trainController.js

exports.deleteTrain = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTrain = await Train.findByIdAndDelete(id);
        if (!deletedTrain) return res.status(404).json({ message: 'Train not found' });
        res.status(200).json({ message: 'Train deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting train', error: error.message });
    }
};
