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
                        <text>Full Name:</text><br />
                        <text>Email:</text><br />
                        <text>Mobile Number:</text>
                    </form>

                    </div>
                    <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        <h3>Testing</h3>
                        <text align="Left">Example Lee</text><br />
                        <text align="Left">timmy@xqc.com</text><br />
                        <text align="Left">12345678</text><br />
                    </form> 
                    </div>
                </div>
        </div>
    )


}
export default UserProfile;