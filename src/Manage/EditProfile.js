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
                        <label>Name:</label><br />
                        <text align="Left">timmy@xqc.com</text><br />
                        <text align="Left">12345678</text><br />
                    </form>

                </div>
                <div className="AlignMiddle">
                    <form action="/action_page.php" id="manageform">
                        

                    </form>
                    <form action="/action_page.php" method="post">
                        <h3>Testing</h3>
                        <label>New Name:</label>
                        <input type="text" placeholder="Enter A Name..."></input>
                        <label>New Email:</label>
                        <textarea name="Email" form="manageform"></textarea>
                        <label>New Mobile Number:</label><br />
                        <textarea></textarea>
                    </form>
                </div>
            </div>
        </div>
    )


}
export default UserProfile;