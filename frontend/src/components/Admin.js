import {Link} from 'react-router-dom'; // Import the delete train component
import Header from "./Header"
import "./Styles.css"
const Admin = () => {
    return (
        <>
        <Header/>
        <div className='home-container'>
            
            <h1>Admin Dashboard</h1>
            <Link to="/admin/add-train"><button className='btn'>ADD TRAIN</button></Link>
            <Link to="/admin/delete-train"><button className='btn'>DELETE TRAIN</button></Link>
        </div>
        </>
    );
};

export default Admin;
