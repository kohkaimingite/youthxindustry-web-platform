// JavaScript source code
import React from 'react';
import { Route, Link } from 'react-router-dom';
import classes from '../components/AdminNavBar.module.css'

const AdminNavBar = () => {
    return (
        <div className={classes.AdminNavBar}>
            <nav>
                <ul>
                    <li>
                        <Link to="/AdminPanel">Admin Panel</Link>
                    </li>

                    <li>
                        <Link to="/ViewUser">Edit Users</Link>
                    </li>

                    <li>
                        <Link to="/EditOppo">Edit Opportunities</Link>
                    </li>

                    <li>
                        <Link to="/MngPartner">Manage Partners</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default AdminNavBar