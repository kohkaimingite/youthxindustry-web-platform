// JavaScript source code
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import "./AdminPanel.css";
import '../components/AdminPanel.module.css';

function AdminPanel() {
    return (
        <div className="App">
            <NavBar/>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px"
            }}>
                <Link to="/ViewUser">
                    <div className="btn linkButton">Users</div>
                </Link>
                <Link to="/ViewOppo">
                    <div className="btn linkButton">Opportunities</div>
                </Link>
                <Link to="/ViewPartner">
                    <div className="btn linkButton">Partners</div>
                </Link>
                <Link to="/MakingReview">
                    <div className="btn linkButton">Reviews</div>
                </Link>
            </form>
        </div>
    );
};

export default AdminPanel;