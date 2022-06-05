// JavaScript source code
import React from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import AdminNavBar from '../components/AdminNavBar';

function EditOppo() {
    return (
        <div className="App">
            <NavBar/>
            <AdminNavBar/>
            <h1 className="page-header text-center">Edit Opportunities</h1>

            <div className="col-md-4">
                <div className="panel panel-primary">
                    <div className="panel-heading"><span className="glyphicon glyphicon-pencil"></span> Edit Opportunities</div>

                </div>
            </div>

            <div className="col-md-8">
            <h3>Opportunities</h3>
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