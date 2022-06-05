// JavaScript source code
import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import classes from '../components/AdminPanel.module.css';

function AdminPanel() {
    return (
        <div className="App">
            <NavBar/>
            <AdminNavBar/>
            <h1>admin</h1>
        </div>
    );
}

export default AdminPanel;