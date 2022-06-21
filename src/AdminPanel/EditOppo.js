// JavaScript source code
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

function EditOppo() {
    const [searchInput, setSearchInput] = useState('');

    const searchItems = () => {

    }

    return (
        <div className="App">
            <NavBar/>
            <h1 className="page-header text-center">Edit Opportunities</h1>
            <input type="text" placeholder="Search..." onChange={event => {setSearchInput(event.target.value)}}/>
            <input type="submit" value="Edit" class="btn btn-primary"/>

            <table class="table table-hover" className="opportunitiesTable">
            <thead>
            <tr>
                <th>Job Code</th>
                <th>Job Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Address</th>
                <th>Job Categories</th>
            </tr>
            </thead>
            <tbody>
                <td>123456</td>
                <td>Nurse</td>
                <td>Admission, transfer and discharge of patients</td>
                <td>Central</td>
                <td>5 Lower Kent Ridge RD, Singapore 119074</td>
                <td>Healthcare</td>
            </tbody>
            </table>
        </div>
    );
}

export default EditOppo;