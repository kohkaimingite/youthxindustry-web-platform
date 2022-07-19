// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import "../Partners/EditPartner.css";
import axios from 'axios';

const EditPartner = () => {
    const initialState = { roleID: "", name: "", password: "", email: "", userBio: "", mobileNumber: "", userID: "" };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const {roleID, name, password, email, userBio, mobileNumber, userID} = formValues;

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
            axios.post("http://localhost:3001/partnerEdit", {
                UserID: userID,
                RoleID: roleID,
                name: name,
                password: password,
                email: email,
                userBio: userBio,
                mobileNumber: mobileNumber,
            })
                .then((response) => {
                    console.log(response);
                    setFormValues({ roleID: "", name: "", password: "", email: "", userBio: "", mobileNumber: "", userID: "" })
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

                <label>UserBio</label>
                <input type="adminInput" name="userBio" placeholder="Your User Biography ..." value={formValues.userBio} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.userBio}</p>

                <label>Contact</label>
                <input type="adminInput" name="mobileNumber" placeholder="Your Contact Number ..." value={formValues.mobileNumber} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.mobileNumber}</p>

                <button className="btn submitButton">Submit</button>
                <Link to="/ViewUser">
                    <button className="btn backButton">Go Back to View All Partners</button>
                </Link>
            </form>
        </div>
    )
}

export default EditPartner;