// JavaScript source code
import AdminNavBar from '../../components/AdminNavBar'
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CfmPartnerTable from './ConfirmPartnerDatatable';

function ConfirmPartner() {
    const [userList, setAppList] = useState([]);
    const columns = userList[0] && Object.keys(userList[0]);
    useEffect(() => {
        axios.get("http://localhost:3001/apPartnerConfirm").then((response) => {

            console.log(response);
            setAppList(response.data);

        });
    }, []);
    return (

        <div className="App">
            <AdminNavBar />
            <Link to="/AdminPanel">
                <button className="btn backButton">Go Back to Admin Panel</button>
            </Link>
            <CfmPartnerTable data={userList}/>
        </div>

    )
}

export default ConfirmPartner;