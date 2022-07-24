// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import AdminNavBar from '../../components/AdminNavBar';
import "../Users/EditUser.css";
import axios from 'axios';

const EditUser = () => {
    let { errorCheck } = '';
    const initialState = { roleID: "", name: "", password: "", email: "", age: "", gender: "", userBio: "", contactNumber: "", userID: "" };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const {roleID, name, password, email, age, gender, userBio, contactNumber, userID} = formValues;
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    }
    
    const validate = (values) => {
        const errors = {};
        const spRegex = /^\S*$/;
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const pnumRegex = /(^[689]{1}\d{7}$)/;
        if (!values.userID) {
            errorCheck = 1;
            errors.userID = "UserID is required";
        } else if (!spRegex.test(values.userID)) {
            errorCheck = 1;
            errors.userID = "UserID cannot contain spacing";
        }
        if (!values.roleID) {
            errorCheck = 1;
            errors.roleID = "RoleID is required";
        } else if (values.roleID != 1 || values.roleID != 2 || values.roleID != 3) {
            errorCheck = 1;
            errors.roleID = "Only allow 1 (User), 2 (Partner), or 3 (Admin)";
        }
        if (!values.name) {
            errorCheck = 1;
            errors.name = "Name is required";
        } else if (values.name.length > 50) {
            errorCheck = 1;
            errors.name = "Name cannot exceed 50 characters";
        } 
        if (!values.password) {
            errorCheck = 1;
            errors.password = "Password is required";
        } else if (!spRegex.test(values.password)) {
            errorCheck = 1;
            errors.password = "Password cannot contain spacing";
        } else if (!pwRegex.test(values.password)) {
            errorCheck = 1;
            errors.password = "Password has to be at least 8 characters with at least 1 letter, and 1 number";
        } else if (values.password.length > 50) {
            errorCheck = 1;
            errors.password = "Password cannot exceed 50 characters";
        }
        if (!values.email) {
            errorCheck = 1;
            errors.email = "Email is required";
        } else if (!spRegex.test(values.email)) {
            errorCheck = 1;
            errors.email = "Email cannot contain spacing";
        } else if (!emailRegex.test(values.email)) {
            errorCheck = 1;
            errors.email = "Email must be a valid email address";
        } else if (values.email.length > 50) {
            errorCheck = 1;
            errors.email = "Email cannot exceed 50 characters";
        }
        if (!values.age) {
            errorCheck = 1;
            errors.age = "Age is required";
        } else if (!spRegex.test(values.age)) {
            errorCheck = 1;
            errors.age = "Age cannot contain spacing";
        } else if (values.age > 100) {
            errorCheck = 1;
            errors.age = "Maximum age is 100";
        }
        if (!values.gender) {
            errorCheck = 1;
            errors.gender = "Gender is required";
        } else if (values.gender.length > 1) {
            errorCheck = 1;
            errors.gender = "Gender only accepts 'M' and 'F' characters";
        }
        if (values.userBio.length > 255) {
            errorCheck = 1;
            errors.userBio = "Biography cannot exceed 255 characters";
        }
        if (!values.contactNumber) {
            errorCheck = 1;
            errors.contactNumber = "Contact number is required";
        } else if (!spRegex.test(values.contactNumber)) {
            errorCheck = 1;
            errors.contactNumber = "Contact number cannot contain spacing";
        } else if (isNaN(values.contactNumber)) {
            errorCheck = 1;
            errors.contactNumber = "Enter only in number";
        } else if (values.contactNumber.length > 8) {
            errorCheck = 1;
            errors.contactNumber = "Contact number cannot exceed 8 characters";
        } else if (!pnumRegex.test(values.contactNumber)) {
            errorCheck = 1;
            errors.contactNumber = "Contact number must be a valid number";
        }

        return errors;
    }

    const submitFormData = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        if (errorCheck == 1) {
            console.log(errorCheck);
            console.log("Error");
        } else {
            console.log(errorCheck);
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
                    contactNumber: contactNumber,
                })
                    .then((response) => {
                        console.log(response);
                        setFormValues({ roleID: "", name: "", password: "", email: "", age: "", gender: "", userBio: "", contactNumber: "", userID: "" })
                        console.log("Successfully updated");
                    })
                    .catch(() => {
                        console.log("Failed to update");
                    });
            }
        }
        
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])

    return (
        <div className="App">
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
                <input type="adminInput" name="userID" placeholder="UserID ..." value={formValues.UserID} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.userID}</p>

                <label>RoleID</label>
                <input type="adminInput" name="roleID" placeholder="RoleID ..." value={formValues.RoleID} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.roleID}</p>

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
                <input type="adminInput" name="contactNumber" placeholder="Your Contact Number ..." value={formValues.contactNumber} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.contactNumber}</p>

                <button className="btn submitButton">Submit</button>
                <Link to="/ViewUser">
                    <button className="btn backButton">Go Back to View All Users</button>
                </Link>
            </form>
        </div>
    )
}

export default EditUser;