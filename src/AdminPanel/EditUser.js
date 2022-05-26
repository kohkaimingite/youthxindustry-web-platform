// JavaScript source code
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar';

const EditUser = () => {
    return (
        <div className={classes.EditUser} id="EditUser">
            <NavBar/>
            <AdminNavBar/>
            <h1>edit user</h1>
        </div>
    );
}

export default EditUser;