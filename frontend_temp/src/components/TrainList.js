import React, { useState } from 'react';
import axios from '../axios';
import BookingForm from './BookingForm';

import "./Styles.css"

const TrainList = () => {
    const [trains, setTrains] = useState([]);
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    const fetchTrains = async () => {
        try {
            const response = await axios.get('/availability', {
                params: { source, destination },
            });
            setTrains(response.data.trains);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTrains();
    };

    return (
        <>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="FROM" onChange={(e) => setSource(e.target.value)} required />
                <input type="text" placeholder="TO" onChange={(e) => setDestination(e.target.value)} required />
                <button className='btn' type="submit">Search Trains</button>
            </form>
            {trains.length === 0 ? (<p>No Trains Available!</p>) 
        : (<ul>
            {trains.map((train) => (
                <li key={train.train_id}>
                    {train.trainName} - Available Seats: {train.availableSeats}
                    {train.availableSeats <= 0 ?(<p>No Seats Available!</p>) : (<BookingForm trainId={train.id} />)}
                </li>
            ))}
        </ul>)    
        }
        </>
    );
};

export default TrainList;
