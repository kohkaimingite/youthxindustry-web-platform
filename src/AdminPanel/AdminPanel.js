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
                <Link to="/ConfirmPartner1">
                    <div className="btn linkButton">Confirmation</div>
                </Link>
            </form>
        </div>
    );
};

export default AdminPanel;