// JavaScript source code
import React, { Component } from 'react';
import NavBar from '../components/NavBar'
function UserProfile() {
    return (
        <div className="App">
            <NavBar />
            <div className="main">
                <h1>Profile</h1>
                <div className="AlignLeft">
                    <h3>Details:</h3>
                    <form action="/action_page.php" method="post">
                        <text>Company Name:</text><br />
                        <text>Email:</text><br />
                        <text>Contact Number:</text>
                    </form>

                </div>
                <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        <h3>Testing</h3>
                        <text align="Left">Swing Pte Ltd</text><br />
                        <text align="Left">Swing123@gmail.com</text><br />
                        <text align="Left">12345678</text><br />
                    </form>
                </div>
            </div>
        </div>
    )


}

    //SQL statement = "SELECT name, email, ContactNumber FROM partners WHERE PartnerID = "id";
    //SQL Update Statement ="UPDATE partners SET name = newname, email = newEmail, ContactNumber = newNumber WHERE PartnerID = "id";

export default UserProfile;