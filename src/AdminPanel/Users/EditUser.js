// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import AdminNavBar from '../../components/AdminNavBar';
import "../Users/EditUser.css";
import axios from 'axios';

const EditUser = () => {
    const initialState = { name: "", password: "", email: "", age: "", gender: "", userBio: "", mobileNumber: "", userID: "", roleID: "" };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const {name, password, email, age, gender, userBio, mobileNumber, userID, roleID} = formValues;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    }
    
    const submitFormData = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        {
            axios.post("http://localhost:3001/userEdit", {
                UserID: userID,
                RoleID: roleID,
                name: name,
                password: password,
                email: email,
                age: age,
                gender: gender,
                userBio: userBio,
                mobileNumber: mobileNumber,
            })
                .then((response) => {
                    console.log(response);
                    setFormValues({ roleID: "", name: "", password: "", email: "", age: "", gender: "", userBio: "", mobileNumber: "", userID: "" })
                    console.log("Successfully updated");
                })
                .catch(() => {
                    console.log("Failed to update");
                });
        }
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    })

    const validate = (values) => {
        const errors = {}
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Name required!";
        }
        if (!values.password) {
            errors.password = "Password required!";
        } else if(!pwRegex.test(values.password)) {
            errors.password = "Password has to be at least 8 characters, at least 1 letter, and 1 number";
        }
        if (!values.email) {
            errors.email = "Email required!";
        } else if(!emailRegex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        } else if (!values.age) {
            errors.age = "Age required!";
        } else if (!values.gender) {
            errors.gender = "Gender required!";
        } else if (!values.userBio) {
            errors.userBio = "User Biography required!";
        } else if (!values.mobileNumber) {
            errors.mobileNumber = "Contact Number required!";
        }

        return errors;
    }

    return (
        <div className="App">
            <NavBar />
            <AdminNavBar />
            {Object.keys(formErrors).length === 0 && isSubmit ? (<div className="ui-message-success">Signed in successfully</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}
            <form
            onSubmit={submitFormData}
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}>
                <label>UserID</label>
                <input type="adminInput" name="userID" placeholder="UserID" value={formValues.UserID} onChange={handleChange}></input>

                <label>RoleID</label>
                <input type="adminInput" name="roleID" placeholder="Your RoleID ..." value={formValues.RoleID} onChange={handleChange}></input>

                <label>Name</label>
                <input type="adminInput" name="name" placeholder="Your Name ..." value={formValues.name} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.name}</p>

                <label>Password</label>
                <input className="aPassword" type="password" name="password" placeholder="Your Password ..." value={formValues.password} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.password}</p>

                <label>Email</label>
                <input type="adminInput" name="email" placeholder="Your Email ..." value={formValues.email} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.email}</p>

                <label>Age</label>
                <input type="adminInput" name="age" placeholder="Your Age ..." value={formValues.age} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.age}</p>

                <label>Gender</label>
                <input type="adminInput" name="gender" placeholder="Your Gender ..." value={formValues.gender} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.gender}</p>

                <label>UserBio</label>
                <input type="adminInput" name="userBio" placeholder="Your User Biography ..." value={formValues.userBio} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.userBio}</p>

                <label>Contact</label>
                <input type="adminInput" name="mobileNumber" placeholder="Your Contact Number ..." value={formValues.mobileNumber} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.mobileNumber}</p>

                <button className="btn submitButton">Submit</button>
                <Link to="/ViewUser">
                    <button className="btn backButton">Go Back to View All Users</button>
                </Link>
            </form>
        </div>
    )
}

export default EditUser;