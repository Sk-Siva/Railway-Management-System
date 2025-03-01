import React, { useState ,useEffect,useContext} from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

import "./Styles.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isAdmin ? '/admin/login' : '/login';
            const response = await axios.post(endpoint, { username, password });
            alert('Login successful!');
            localStorage.setItem('token', response.data.token);
            const userId = response.data.userId; // Assuming the response contains userId
        localStorage.setItem('userId', userId); // Store user ID
        setUser({ id: userId });
            navigate(isAdmin ? '/admin' : '/');
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
        <div className='home-container'><form onSubmit={handleLogin}>
        <h2>Login to Continue</h2>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />
        <div>
            <label>
                <input
                    type="radio"
                    value="user"
                    checked={!isAdmin}
                    onChange={() => setIsAdmin(false)}
                />
                Login as User
            </label>
            <label>
                <input
                    type="radio"
                    value="admin"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(true)}
                />
                Login as Admin
            </label>
        </div>
        <button className='btn' type="submit">Login</button>
    </form></div>
    );
};

export default Login;