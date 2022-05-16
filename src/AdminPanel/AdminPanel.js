// JavaScript source code
import React, { Component } from 'react';
import AdminNavBar from '../components/AdminNavBar';
import NavBar from '../components/NavBar'
function AdminPanel() {
    return (
        <div className={classes.AdminPanel}>
            <NavBar/>
            <AdminNavBar/>
            <div className={classes.Container}>
                <h1 className={classes.Hello}>Hello, world.</h1>
                <h1>Welcome to my website</h1>
            </div>
        </div>
    );
}

export default AdminPanel;