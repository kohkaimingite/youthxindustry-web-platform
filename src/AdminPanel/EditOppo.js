// JavaScript source code
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
import AdminNavBar from '../components/AdminNavBar';
import Datatable from './Datatable';

const EditOppo = () => {
    return (
        <div className={classes.EditOppo} id="EditOppo">
            <NavBar/>
            <AdminNavBar/>
            <h1 className="page-header text-center">Edit Opportunities</h1>
        </div>
    );
}

export default EditOppo;