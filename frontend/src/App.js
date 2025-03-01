import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Admin from './components/Admin';
import AddTrainForm from './components/AddTrainForm';
import DeleteTrainForm from './components/DeleteTrainForm';


const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/login" element={<LoginForm/>} />
                    <Route exact path="/register" element={<RegistrationForm/>} />
                    <Route exact path="/admin" element={<Admin/>} />
                    <Route exact path="admin/add-train" element={<AddTrainForm/>} />
                    <Route exact path="/admin/delete-train" element={<DeleteTrainForm/>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
