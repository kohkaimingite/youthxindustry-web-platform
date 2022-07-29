// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import AdminNavBar from '../../components/AdminNavBar';
import "../Styling/editStyling.css";
import axios from 'axios';

const EditPartner = () => {
    const initialState = { roleID: 0, name: "", password: "", email: "", userBio: "", contactNumber: 0, userID: 0 };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const { roleID, name, password, email, userBio, contactNumber, userID } = formValues;
    const [isSubmit, setIsSubmit] = useState(false);
    const [check, setCheck] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    }

    const validate = (values) => {
        const errors = {}
        const spRegex = /^\S*$/;
        const txtRegex = /^[a-zA-Z\s]*$/;
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*?[!?`~;:@#$%^&*+=])[A-Za-z\d]{8,}$/;
        const pnumRegex = /(^[689]{1}\d{7}$)/;
        if (!values.userID) {
            errors.userID = "UserID is required";
        } else if (!spRegex.test(values.userID)) {
            errors.userID = "UserID cannot contain spacing";
        }
        if (!values.roleID) {
            errors.roleID = "RoleID is required";
        }
        if (!values.name) {
            errors.name = "Name is required";
        } else if (!txtRegex.test(values.name)) {
            errors.name = "Enter only in words"
        } else if (values.name.length > 50) {
            errors.name = "Name cannot exceed 50 characters";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (!pwRegex.test(values.password)) {
            errors.password = "Password has to be at least 8 characters with at least 1 letter and 1 number";
        } else if (values.password.length > 50) {
            errors.password = "Password cannot exceed 50 characters";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (values.email.length > 50) {
            errors.email = "Email cannot exceed 50 characters";
        }
        if (values.userBio.length > 255) {
            errors.userBio = "Biography cannot exceed 255 characters";
        }
        if (!values.contactNumber) {
            errors.contactNumber = "Contact number is required";
        } else if (!spRegex.test(values.contactNumber)) {
            errors.contactNumber = "Contact number cannot contain spacing";
        } else if (isNaN(values.contactNumber)) {
            errors.contactNumber = "Enter only in number";
        } else if (!pnumRegex.test(values.contactNumber)) {
            errors.contactNumber = "Contact number must be a valid number and cannot exceed 8 characters";
        }
        else {
            setCheck(true);
        }

        return errors;
    }

    const submitFormData = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormErrors(validate(formValues));
        const spRegex = /^\S*$/;
        const txtRegex = /^[a-zA-Z\s]*$/;
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*?[!?`~;:@#$%^&*+=])[A-Za-z\d]{8,}$/;
        const pnumRegex = /(^[689]{1}\d{7}$)/;
        if (
            !formValues.userID ||
            !formValues.roleID ||
            !formValues.name ||
            !formValues.password ||
            !formValues.email ||
            !formValues.contactNumber ||
            !spRegex.test(formValues.userID) ||
            !txtRegex.test(formValues.name) ||
            formValues.name.length > 50 ||
            !pwRegex.test(formValues.password) ||
            formValues.password.length > 50 ||
            formValues.email.length > 50 ||
            formValues.userBio.length > 255 ||
            !spRegex.test(formValues.contactNumber) ||
            isNaN(formValues.contactNumber) ||
            !pnumRegex.test(formValues.contactNumber)
        ) {
            console.log("POST error");
        }
        else if (check === true) {
            {
                axios.post("http://localhost:3001/apPartner", {
                    UserID: userID,
                    RoleID: roleID,
                    name: name,
                    password: password,
                    email: email,
                    userBio: userBio,
                    contactNumber: contactNumber,
                })
                    .then((response) => {
                        console.log(response);
                        setFormValues({ roleID: "", name: "", password: "", email: "", userBio: "", contactNumber: "", userID: "" })
                        console.log("Successfully updated partner information.");
                    })
                    .catch(() => {
                        console.log("Failed to update partner information.");
                    });
            }
            console.log("POST success");
            setCheck(false);
            setIsSubmit(false);
        }
        else {
            console.log("ELSE error");
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
                <input type="text" className="adminInput" name="userID" placeholder="UserID" value={formValues.userID} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.userID}</p>

                <label>RoleID</label>
                <input type="number" className="adminInput" name="roleID" placeholder="Role 1 = User, Role 2 = Partner, Role 3 = Admin" 
                value={formValues.roleID} onChange={handleChange} min="1" max="3"></input>
                <p className="adminErrorMsg">{formErrors.roleID}</p>

                <label>Name</label>
                <input type="text" className="adminInput" name="name" placeholder="Name ..." value={formValues.name} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.name}</p>

                <label>Password</label>
                <input type="password" className="adminInput" name="password" placeholder="Password ..." value={formValues.password} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.password}</p>

                <label>Email</label>
                <input type="email" className="adminInput" name="email" placeholder="Email ..." value={formValues.email} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.email}</p>

                <label>UserBio</label>
                <input type="text" className="adminInput" name="userBio" placeholder="User Biography ..." value={formValues.userBio} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.userBio}</p>

                <label>Contact</label>
                <input type="text" className="adminInput" name="contactNumber" placeholder="Contact Number ..." value={formValues.contactNumber} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.contactNumber}</p>

                <button className="btn submitButton">Submit</button>
                <Link to="/ViewPartner">
                    <button className="btn backButton">Go Back to View All Partners</button>
                </Link>
            </form>
        </div>
    )
}

export default EditPartner;