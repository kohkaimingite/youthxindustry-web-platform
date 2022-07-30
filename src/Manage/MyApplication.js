import PartnerNavBar from '../components/PartnerNavBar'
import { React, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ApplicationDataTable from './ApplicationDataTable'

function MyApplication() {
    const [AppList, setAppList] = useState([]);
    const columns = AppList[0] && Object.keys(AppList[0]);
    const getApplication = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/Applications").then((response) => {

            console.log(response);
            setAppList(response.data);

        });
    }, []);
    return (

        <div className="App">
            <PartnerNavBar />
            <h1>Pending Applications</h1>
            <ApplicationDataTable data={AppList}/>
        </div>

    )
}

export default MyApplication;