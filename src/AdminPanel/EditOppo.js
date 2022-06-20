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

            <div className="col-md-4">
                <div className="panel panel-primary">

                </div>
            </div>

            <div className="col-md-8">
            <table className="table table=bordered table striped">
            <thead>
            <tr>
                <th>Job Code</th>
                <th>Company</th>
                <th>Description</th>
                <th>Location</th>
                <th>Address</th>
                <th>Job Scope</th>
            </tr>
            </thead>
            </table>
            </div>
        </div>
    );
}

export default EditOppo;