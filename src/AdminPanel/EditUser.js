// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';
import axios from 'axios';

const EditUser = () => {

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            <table>
                <td>
                   Hi
                </td>
            </table>
        </div>
    )
}

export default EditUser;