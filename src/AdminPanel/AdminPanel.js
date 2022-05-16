// JavaScript source code
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar';
import classes from './AdminPanel.module.css'

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