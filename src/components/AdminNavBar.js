// JavaScript source code
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';

const AdminNavBar = () => {
    return (
        <Link to="/EditUser"><button class="button editUserButton">Edit User</button></Link>
        <Link to="/EditOppo"><button class= "button editOppoButton">Edit Oppotunities</button></Link>
        <Link to="/MngPartner"><button class="button editUserButton">Edit User</button></Link>
        
        )
}

export default AdminNavBar