import React, { useState } from 'react';
import axios from '../axios';

import { useNavigate } from 'react-router-dom';

import "./Styles.css"

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', { username, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(`Registration failed: ${error.response.data.message}`);
            } else {
                alert('Registration failed! Please try again.');
            }
        }
    };
    

    return (
        <div className='home-container'>
            <form onSubmit={handleRegister}>
          <h1>Register to Continue</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            <button className='btn' type="submit">Register</button>
        </form>
        </div>
    );
};

export default RegisterForm;
