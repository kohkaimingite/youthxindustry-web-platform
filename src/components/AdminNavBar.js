// JavaScript source code
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import classes from './AdminNavBar.module.css'

const AdminNavBar = () => {
    return (
        <div className={classes.AdminNavBar}>
            <nav>
                <ul>
                    <li>
                        <a href="/AdminPanel">Admin Panel</a>
                    </li>

                    <li>
                        <a href="/EditUser">Edit Users</a>
                    </li>

                    <li>
                        <a href="/EditOppo">Edit Opportunities</a>
                    </li>

                    <li>
                        <a href="/MngPartner">Manage Partners</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNavBar