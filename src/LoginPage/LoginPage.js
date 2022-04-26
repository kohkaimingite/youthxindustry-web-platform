// JavaScript source code
import NavBar from '../components/NavBar'
import React, { Component } from 'react';
function LoginPage() {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    return (
        
        <div className="App">
            <NavBar />
            <h1>Login With Username and Password</h1>
            <label>
            Username: 
                <input type='text' id='username'/>
                {'\n'}
            </label>
            <label>
            Password: 
                <input type='password' id='password' />
                <input type='checkbox' onClick='toggleP' />

            </label>
            <input type='submit' value='Login' />
            


        </div>
    );
}
function toggleP() 
{
    var x = document.getElementById("password")
    if (x.type === "password")
    {
        x.type = "text";
    }
    else
    {
        x.type = "password";
    }
}

export default LoginPage;
