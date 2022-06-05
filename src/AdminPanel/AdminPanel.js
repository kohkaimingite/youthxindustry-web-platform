// JavaScript source code
import React from 'react';
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import '../components/AdminPanel.module.css';

function AdminPanel() {
    return (
        <div className="App">
            <NavBar/>
            <AdminNavBar/>
            <h1>admin page</h1>
        </div>
    );
};

export default AdminPanel;