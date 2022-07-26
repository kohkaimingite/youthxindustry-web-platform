// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import AdminNavBar from '../../components/AdminNavBar';
import "../Styling/editStyling.css";
import axios from 'axios';

const EditUser = () => {
    const initialState = { roleID: "", name: "", password: "", email: "", age: "", gender: "", userBio: "", contactNumber: "", userID: "" };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const { roleID, name, password, email, age, gender, userBio, contactNumber, userID } = formValues;
    const [isSubmit, setIsSubmit] = useState(false);
    const [check, setCheck] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    }

    const validate = (values) => {
        const errors = {};
        const spRegex = /^\S*$/;
        const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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
        } else if (!isNaN(values.name)) {
            errors.name = "Enter only in words"
        } else if (values.name.length > 50) {
            errors.name = "Name cannot exceed 50 characters";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (!pwRegex.test(values.password)) {
            errors.password = "Password has to be at least 8 characters with at least 1 letter, and 1 number";
        } else if (values.password.length > 50) {
            errors.password = "Password cannot exceed 50 characters";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (values.email.length > 50) {
            errors.email = "Email cannot exceed 50 characters";
        }
        if (!values.age) {
            errors.age = "Age is required";
        }
        if (!values.gender) {
            errors.gender = "Gender is required";
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
            errors.contactNumber = "Contact number must be a valid number";
        } else if (values.contactNumber.length > 8) {
            errors.contactNumber = "Contact number cannot exceed 8 characters";
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
        if (check === true) {
            {
                axios.post("http://localhost:3001/apUserEdit", {
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
                        console.log("Successfully updated user information.");
                    })
                    .catch(() => {
                        console.log("Failed to update user information.");
                    });
            }
            console.log("POST success");
            setCheck(false);
            setIsSubmit(false);
        }
        else {
            console.log("POST error");
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
                <input type="text" className="adminInput" name="userID" placeholder="UserID ..." value={formValues.UserID} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.userID}</p>

                <label>RoleID</label>
                <select type="text" className="adminInput" name="roleID" value={formValues.roleID} onChange={handleChange}>
                    <option value="" disabled selected>RoleID ...</option>
                    <option value="1">User</option>
                    <option value="2">Partner</option>
                    <option value="3">Admin</option>
                </select>
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

                <label>Age</label>
                <input type="number" className="adminInput" name="age" min="1" max="100" placeholder="Age ..." value={formValues.age} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.age}</p>

                <label>Gender</label>
                <select type="text" className="adminInput" name="gender" value={formValues.gender} onChange={handleChange}>
                    <option value="" disabled selected>Gender ...</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <p className="adminErrorMsg">{formErrors.gender}</p>

                <label>UserBio</label>
                <input type="text" className="adminInput" name="userBio" placeholder="User Biography ..." value={formValues.userBio} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.userBio}</p>

                <label>Contact</label>
                <input type="text" className="adminInput" name="contactNumber" placeholder="Contact Number ..." value={formValues.contactNumber} onChange={handleChange}></input>
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