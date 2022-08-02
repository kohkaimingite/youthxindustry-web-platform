// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import AdminNavBar from '../../components/AdminNavBar';
import "../Styling/editStyling.css";
import axios from 'axios';

const EditOppo = () => {
    const initialState = { name: "", description: "", location: "", address: "", type: "", qualification: "", pay: 0, oppID: 0 };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const { name, description, location, address, type, qualification, pay, oppID } = formValues;
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
        const txtRegex = /^[a-zA-Z\s]*$/;
        const addRegex = /\b(Singapore)\b/;
        const qRegex = /\b(PSLE|GCE O Level|GCE A Level|Diploma in|Bachelor of|Master of)\b/;
        if (!values.oppID) {
            errors.oppID = "OppID is required";
        } else if (!spRegex.test(values.oppID)) {
            errors.oppID = "OppID cannot contain spacing";
        } else if (values.oppID.length > 6) {
            errors.oppID = "OppID cannot exceed 6 digits";
        }
        if (!values.name) {
            errors.name = "Name is required";
        } else if (!txtRegex.test(values.name)) {
            errors.name = "Enter only in words"
        } else if (values.name.length > 150) {
            errors.name = "Name cannot exceed 150 characters";
        }
        if (!values.description) {
            errors.description = "Description is required";
        } else if (values.description.length > 500) {
            errors.description = "Description cannot exceed 500 characters";
        }
        if (!values.location) {
            errors.location = "Area is required";
        }
        if (!values.address) {
            errors.address = "Address is required";
        } else if (!addRegex.test(values.address)) {
            errors.address = "Only addresses in Singapore are allowed";
        } else if (values.address.length > 255) {
            errors.address = "Address cannot exceed 255 characters";
        }
        if (!values.type) {
            errors.type = "Job category is required";
        } else if (values.type.length > 50) {
            errors.type = "Job category cannot exceed 50 characters";
        }
        if (!values.qualification) {
            errors.qualification = "Qualification is required";
        } else if (!qRegex.test(values.qualification)) {
            errors.qualification = "Qualification must be a valid academic qualification";
        } else if (values.qualification.length > 80) {
            errors.qualification = "Qualification cannot exceed 80 characters";
        }
        if (!values.pay) {
            errors.pay = "Pay is required";
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
        const addRegex = /\b(Singapore)\b/;
        const qRegex = /\b(PSLE|GCE O Level|GCE A Level|Diploma in|Bachelor of|Master of)\b/;
        if (
            !formValues.oppID ||
            !formValues.name ||
            !formValues.description ||
            !formValues.location ||
            !formValues.address ||
            !formValues.type ||
            !formValues.qualification ||
            !formValues.pay ||
            !spRegex.test(formValues.oppID) ||
            !txtRegex.test(formValues.name) ||
            formValues.oppID.length > 6 ||
            formValues.name.length > 150 ||
            formValues.description.length > 500 ||
            !addRegex.test(formValues.address) ||
            formValues.address.length > 255 ||
            formValues.type.length > 50 ||
            !qRegex.test(formValues.qualification) ||
            formValues.qualification.length > 80
        ) {
            console.log("ELSE error");
        }
        else if (check === true) {
            {
                axios.post("http://localhost:3001/apOppo", {
                    OppID: oppID,
                    name: name,
                    description: description,
                    location: location,
                    address: address,
                    type: type,
                    qualification: qualification,
                    pay: pay,
                })
                    .then((response) => {
                        console.log(response);
                        setFormValues({ name: "", description: "", location: "", address: "", type: "", qualification: "", pay: "", oppID: "" })
                        console.log("Successfully updated opportunity information.");
                    })
                    .catch(() => {
                        console.log("Failed to update opportunity information.");
                    });
            }
            console.log("POST success");
            setCheck(false);
            setIsSubmit(false);
        }
        else {
            console.log("POST error");
        }

    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors])

    return (
        <div className="App">
            <AdminNavBar />
            <form
            onSubmit={submitFormData}
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}>
                <label>Job Code</label>
                <input type="text" className="adminInput" name="oppID" placeholder="Job Code ..." value={formValues.oppID} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.oppID}</p>

                <label>Name</label>
                <input type="text" className="adminInput" name="name" placeholder="Name ..." value={formValues.name} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.name}</p>

                <label>Description</label>
                <input type="text" className="adminInput" name="description" placeholder="Description ..." value={formValues.description} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.description}</p>

                <label>Area</label>
                <select type="text" className="adminInput" name="location" value={formValues.location} onChange={handleChange}>
                    <option value="" disabled selected>Area ...</option>
                    <option value="Central">Central</option>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                </select>
                <p className="adminErrorMsg">{formErrors.location}</p>

                <label>Address</label>
                <input type="text" className="adminInput" name="address" placeholder="Address ..." value={formValues.address} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.address}</p>

                <label>Job Category</label>
                <input type="text" className="adminInput" name="type" placeholder="Job Category ..." value={formValues.type} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.type}</p>

                <label>Qualification</label>
                <input type="text" className="adminInput" name="qualification" placeholder="Qualification ..." value={formValues.qualification} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.qualification}</p>

                <label>Pay</label>
                <input type="number" className="adminInput" name="pay" min="1" placeholder="Pay ..." value={formValues.pay} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.pay}</p>

                <button className="btn submitButton">Submit</button>
                <Link to="/ViewOppo">
                    <button className="btn backButton">Go Back to View All Opportunities</button>
                </Link>
            </form>
        </div>
    )
}

export default EditOppo;