// JavaScript source code
import { React } from "react";
import axios from 'axios';

const AdminNavBar = () => {
    return (
        <header class='header' style={test}>
            <h1 style={brandName}>CYC</h1>
            <div class="containerNavBar borderYtoX">
                <a href="/ViewUser">Users</a>
                <a href="/ViewOppo">Opportunities</a>
                <a href="/ViewPartner">Partners</a>
                <a href="/ConfirmPartner">Confirmation</a>
                <a onClick={logout}>Logout</a>



            </div>

        </header>

    )
}
const logout = () => {
    axios.get("http://localhost:3001/logout")
    setTimeout(function () {
        window.location.reload();
    }, 1000);
};

const brandName = {
    color: "white",

}

const test = {

    backgroundColor: '#FFD700'
}

export default AdminNavBar