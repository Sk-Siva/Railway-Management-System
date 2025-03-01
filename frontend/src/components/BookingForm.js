import React, { useState, useContext } from 'react';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';

import "./Styles.css"

const BookingForm = ({ trainId }) => {
    const [seats, setSeats] = useState(1);
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token")

    const handleBooking = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/book', { train_id: trainId, seats,user_id: user.id}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert('Booking successful!');
        } catch (error) {
            console.error(error);
            alert('Booking failed!');
        }
    };

    return (
        <form onSubmit={handleBooking}>
            <label htmlFor='seat'>No of Seats:</label>
            <input id="seat" type="number" min="1" value={seats} onChange={(e) => setSeats(e.target.value)} required />
            <button className='btn' type="submit">Book Seat</button>
        </form>
    );
};

export default BookingForm;
