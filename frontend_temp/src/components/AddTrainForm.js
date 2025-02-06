import React, { useState, useContext } from 'react';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import "./Styles.css"

const AddTrainForm = () => {
    const [trainName, setTrainName] = useState('');
    const [totalSeats, setTotalSeats] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleAddTrain = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/train', {
                train_name: trainName,
                total_seats:totalSeats,
                available_seats: availableSeats,
                source,
                destination
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.JWT_SECRET}`  // Ensure the token is sent in the header
                },
            });
            alert('Train added successfully!');
            setTrainName('');
            setTotalSeats('');
            setAvailableSeats('');
            setSource('');
            setDestination('');
            navigate("/admin")
        } catch (error) {
            console.error(error);
            alert('Failed to add train.');
        }
    };

    return (
        <div className='home-container'>
            <form onSubmit={handleAddTrain}>
            <h2>Add New Train</h2>
            <input type="text" placeholder="Train Name" value={trainName} onChange={(e) => setTrainName(e.target.value)} required />
            <input type="number" placeholder="Total Seats" value={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} required />
            <input type="number" placeholder="Available Seats" value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} required />
            <input type="text" placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)} required />
            <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
            <button className='btn' type="submit">Add Train</button>
        </form>
        </div>
    );
};

export default AddTrainForm;