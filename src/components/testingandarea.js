// JavaScript source code
import { Route, Link } from 'react-router-dom';
import React, { Component } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import '../components/OppoBarStyle.css'

// <button>About Us</button> 
//

const SearchOppoBar = () => {
    return (
        

        <header class='header'>
            <button type="button" class="collapsible">Open Collapsible</button>
            <div class="content">
               
            <a class="active" href="#home">Home</a>
            <a href="#about">Job</a>

            <div class="dropdown">
                <button onclick="myFunction()" class="dropbtn">Select job filter</button>
                <div id="myDropdown" class="dropdown-content">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                </div>
            </div>
            <a href="#contact">Location</a>
            <div class="search-container">
                <form action="/action_page.php">
                <input type="text" placeholder="Filter..." name="search"></input>
                    <button type="submit">Search!</button>
                    </form>
                </div>
            </div>
            
        </header>

    )
}

const brandName = {
    color: "white",
    backgroundColor: 'red'
}
class collapsible extends React.Component  {
    render() {
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
        return {};
    }
}
function Car() {
    return <h2>Hi, I am a Car!</h2>;
}


export default SearchOppoBar