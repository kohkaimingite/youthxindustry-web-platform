// JavaScript source code
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar';

const EditOppo = () => {
    return (
        <div className={classes.EditOppo} id="EditOppo">
            <NavBar/>
            <AdminNavBar/>
            <h1>edit oppo</h1>
        </div>
    );
}

export default EditOppo;