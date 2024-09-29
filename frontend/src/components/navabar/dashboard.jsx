import React from 'react';
import { Link } from "react-router-dom";
import './dashboard.css'

const dashboard = () => {
    return (
        <div className="menu-bar">
            <div className="menu-item">
            <Link to="/admin-portal" >Home</Link>
            <Link to="/admin-portal/Employee-List" >Employee List</Link>
            <Link to="/" className="out">Logout</Link>
            </div>
        </div>
    );
}

export default dashboard;  