// JavaScript source code
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar';

const MngPartner = () => {
    return (
        <div className={classes.MngPartner} id="MngPartner">
            <NavBar/>
            <AdminNavBar/>
            <h1>mng partner</h1>
        </div>
    );
}

export default MngPartner;