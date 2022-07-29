// JavaScript source code
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from '../../components/AdminNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import LogConfirmPartner from './ConfirmPartnerDatatable';

function ConfirmPartner() {
    const [partnerList, setPartnerList] = useState([]);
    const columns = partnerList[0] && Object.keys(partnerList[0]);
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
            <LogConfirmPartner data={partnerList}/>
        </div>

    )
}

export default ConfirmPartner;