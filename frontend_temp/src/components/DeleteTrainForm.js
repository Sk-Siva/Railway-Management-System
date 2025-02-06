import React, { useState, useContext } from 'react';
import axios from '../axios';
import { AuthContext } from '../context/AuthContext';

import "./Styles.css"

const DeleteTrainForm = () => {
    const [trainId, setTrainId] = useState('');
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem("token")

    const handleDeleteTrain = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`/admin/train/${trainId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Ensure the token is sent in the header
                },
            });
            alert('Train deleted successfully!');
            setTrainId('');
        } catch (error) {
            console.error(error);
            alert('Failed to delete train. Make sure you are logged in as admin and provide a valid train ID.');
        }
    };

    return (
        <div className='home-container'>
            <form onSubmit={handleDeleteTrain}>
            <h2>Delete Train</h2>
            <input type="text" placeholder="Train ID" value={trainId} onChange={(e) => setTrainId(e.target.value)} required />
            <button type="submit">Delete Train</button>
        </form>
        </div>
    );
};

export default DeleteTrainForm;
