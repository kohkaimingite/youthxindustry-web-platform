// JavaScript source code
import { React } from "react";
import "../Partners/ConfirmPartner.css";
import axios from 'axios';
import emailjs from '@emailjs/browser';

export default function LogConfirmPartner({ data }) {
    const columns = data[0] && Object.keys(data[0]);

    const emailInfo = {
        userID: '',
        name: '',
        email: ''
    };

    function confirmAccount(UserID) {
        if (window.confirm("Are you sure you want to confirm registration for this partner?")) {

            axios.post("http://localhost:3001/apConfirmRegistration", {
                UserID: parseInt(UserID),
            }).then((response) => {
                console.log("Successfully Registered");
                emailInfo.userID = data[0].UserID;
                emailInfo.name = data[0].Name;
                emailInfo.email = data[0].Email;
                console.log(emailInfo)
                emailjs.send('service_nqak4rb', 'template_035bo0i', emailInfo, 'EOze04zGTBzzoGFXp')
                    .then((result) => {
                        console.log(result.text);
                    }, (error) => {
                        console.log(error.text);
                    });
                alert("Registered");
            });
        } else {
            alert("Failed to register")
        }
    }

    return (
        <table className="User-Table">
            <thead>
                <tr>
                    <th> ID </th>
                    <th> Name </th>
                    <th> Email </th>
                    <th> UserBio </th>
                    <th> Contact </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {data.map(row => <tr>
                    {
                        columns.map(column => <td style={{ textAlign: 'center' }}>{row[column]}</td>)

                    }
                    <td>
                        <button className="btn confirmButton" onClick={() => confirmAccount(row[columns[0]])}>
                            Confirm
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    );
}