import React from 'react';
import TrainList from './TrainList';

import { useNavigate } from 'react-router-dom';
import "./Styles.css"

import Header from "./Header";

const Home = () => { 
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    if (token === null){
        return navigate("/login")
    }
    return (<>
        <Header/>
        <div className='home-container'>
            <h1>Fastest Train Ticket Booking</h1>
            <h3>Book Your Seats Now!</h3>
            <TrainList />
        </div>
    </>
    );
};

export default Home;
