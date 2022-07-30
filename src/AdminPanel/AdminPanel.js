// JavaScript source code
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminNavBar from '../components/AdminNavBar';
import "../AdminPanel/AdminPanel.css";

function AdminPanel() {
    return (
        <div className="App">
            <AdminNavBar />
            <form>
                <h1>Admin Panel</h1>
                <h1>^ navigate by clicking the links on top ^</h1>
            </form>
        </div>
    );
};

export default AdminPanel;