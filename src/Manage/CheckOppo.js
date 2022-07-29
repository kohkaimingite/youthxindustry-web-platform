import PartnerNavBar from '../components/PartnerNavBar'
import { React, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CheckOppoTable from './CheckOppoTable'


function MyApplication() {
    const [OppList, setOppList] = useState([]);
    const columns = OppList[0] && Object.keys(OppList[0]);
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