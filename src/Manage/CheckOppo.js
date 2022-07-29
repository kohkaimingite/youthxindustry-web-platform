import PartnerNavBar from '../components/PartnerNavBar'
import { React, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ApplicationDataTable from './ApplicationDataTable'

function MyApplication() {
    const [OppList, setOppList] = useState([]);
    const columns = AppList[0] && Object.keys(AppList[0]);
    const getApplication = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/CheckOppo").then((response) => {

            console.log(response);
            setOppList(response.data);

        });
    }, []);
    return (

        <div className="App">
            <PartnerNavBar />
            <h1>Pending Opportunities</h1>
            <CheckOppoTable data={OppList} />
        </div>

    )
}

export default MyApplication;