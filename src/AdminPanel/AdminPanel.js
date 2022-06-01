// JavaScript source code
import React from 'react';
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import AdminNavBar from './AdminNavBar';
import classes from '../components/AdminPanel.module.css'

const AdminPanel = () => {
    return (
        <div className={classes.AdminPanel} id="AdminPanel">
            <NavBar/>
            <AdminNavBar/>
            <h1>admin</h1>
        </div>
        );
}

export default AdminPanel;