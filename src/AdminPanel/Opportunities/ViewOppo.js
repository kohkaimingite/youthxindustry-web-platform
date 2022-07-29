// JavaScript source code
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from '../../components/AdminNavBar';
import "../Opportunities/ViewOppo.css";
import axios from 'axios';

const ViewOppo = () => {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const [oppList, setOppList] = useState([]);
    const [order, setOrder] = useState("ascending");
    const sortWord = (col) => {
        if (order === "ascending") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase ? 1 : -1
            );
            setData(sorted);
            setOrder("descending");
        }
        if (order === "descending") {
            const sorted = [...data].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase ? 1 : -1
            );
            setData(sorted);
            setOrder("ascending");
        }
    }

    const sortNum = (col) => {
        if (order === "ascending") {
            const sorted = [...data].sort((a, b) =>
                a[col] - b[col]
            );
            setData(sorted);
            setOrder("descending");
        }
        if (order === "descending") {
            const sorted = [...data].sort((a, b) =>
                b[col] - a[col]
            );
            setData(sorted);
            setOrder("ascending");
        }
    }
    
    let { storeOppID } = '';

    useEffect(() => {
        axios.get("http://localhost:3001/apOppo").then((response) => {

            console.log(response);
            setData(response.data);
            
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const deleteOppo = (OppID) => {
        const newOppo = [...oppList];
        const index = oppList.findIndex((User) => User.OppID === OppID);
        newOppo.splice(index, 1);
        setOppList(newOppo);

        if (
            window.confirm("Are you sure you want to delete this opportunity?")
        ) {
            axios.post("http://localhost:3001/apOppoDelete", {
                OppID: OppID,
                adminOppID: parseInt(storeOppID)
            }).then(() => {
                console.log("Successfully Deleted.");
                window.location.reload();
            })
            .catch(() => {
                console.log("Failed to delete.");
            });
        }
    };

    return (
        <div className="App">
            <AdminNavBar />
            <Link to="/AdminPanel">
                <button className="btn backButton">Go Back to Admin Panel</button>
            </Link>
            <input type="search" placeholder="Search..." onChange={event => {setSearchInput(event.target.value)}}/>
            <table className="User-Table">
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}} onClick={()=>sortNum("OppID")}> Job Code </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Name")}> Job Name </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Description")}> Description </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Location")}> Area </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Address")}> Address </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Type")}> Category(-ies) </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortWord("Qualification")}> Qualification </th>
                        <th style={{textAlign: "center"}} onClick={()=>sortNum("Pay")}> Pay </th>
                        <th style={{textAlign: "center"}}> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter((User) => {
                        var strOppID = '' + User.OppID;
                        var strPay = '' + User.Pay;

                        if (searchInput == "") {
                            return User
                        } else if (strOppID.includes(searchInput)) {
                            return User
                        } else if (User.Name.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (User.Description.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (User.Location.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (User.Address.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (User.Type.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (User.Qualification.toLowerCase().includes(searchInput.toLowerCase())) {
                            return User
                        } else if (strPay.includes(searchInput)) {
                            return User
                        }
                    }).map((User, key) => {
                        storeOppID = User.OppID;
                        return (
                            <tr key={key}>
                                <td> {User.OppID} </td>
                                <td> {User.Name} </td>
                                <td> {User.Description} </td>
                                <td> {User.Location} </td>
                                <td> {User.Address} </td>
                                <td> {User.Type} </td>
                                <td> {User.Qualification} </td>
                                <td> {User.Pay} </td>
                                <td>
                                    <Link to={"/EditOppo/"+User.OppID}>
                                        <button className="btn editButton">Edit</button>
                                    </Link>

                                    <button className="btn deleteButton" onClick={() => deleteOppo(User.OppID)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    );
}

export default ViewOppo;