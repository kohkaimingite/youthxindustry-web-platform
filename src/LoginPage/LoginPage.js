// JavaScript source code
import NavBar from '../components/NavBar'
import React, { Component } from 'react';
function LoginPage() {
        
    return (
        
        <div className="App">
            <NavBar />
            <h1>Login With Username and Password</h1>
            <div className="App">
                <label>
                Username: 
                    <input type='text' id='username'/>
                    {'\n'}
                </label>
            </div>
            <div className="App">
                <label>
                Password: 
                <input type='password' id='pass1'/>
                </label>
            </div>
            <div className="App">
                <label>
                Show Password
                    <input type='checkbox' id='cb1' onClick="toggleP()"/>
                </label>
                </div>
            <input type='submit' value='Login' />
        </div>
       
    );
}


function toggleP() {
    var x = document.getElementById('pass1');
    if (x) {
        if (x.type === 'password') {
            x.type = 'text';
        }
        else {
            x.type = 'password';
        }
    }
}



export default LoginPage;
