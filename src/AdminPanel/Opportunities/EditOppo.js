// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import "../Opportunities/EditOppo.css";
import axios from 'axios';

const EditOppo = () => {
    const initialState = { name: "", description: "", location: "", address: "", type: "", qualification: "", pay: "", oppID: "" };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const {name, description, location, address, type, qualification, pay, oppID} = formValues;

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
            axios.post("http://localhost:3001/oppoEdit", {
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
                    console.log("Successfully updated");
                })
                .catch(() => {
                    console.log("Failed to update");
                });
        }
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    })

    const validate = (values) => {
        const errors = {}
        if (!values.name) {
            errors.name = "Name required";
        } else if (values.name.length > 50) {
            errors.name = "Name cannot exceed 50 characters";
        }
        if (!values.description) {
            errors.description = "Description required";
        } else if (values.description.length > 255) {
            errors.description = "Description cannot exceed 255 characters";
        }
        if (!values.location) {
            errors.location = "Area required";
        } else if (values.location.length > 255) {
            errors.location = "Area cannot exceed 255 characters";
        }
        if (!values.address) {
            errors.address = "Address required";
        } else if (values.address.length > 255) {
            errors.address = "Address cannot exceed 255 characters";
        }
        if (!values.type) {
            errors.type = "Job Category required";
        } else if (values.type.length > 50) {
            errors.type = "Job category cannot exceed 50 characters";
        }
        if (!values.qualification) {
            errors.qualification = "Qualification required";
        } else if (values.qualification.length > 50) {
            errors.qualification = "Qualification cannot exceed 50 characters";
        }
        if (!values.pay) {
            errors.pay = "Pay required";
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
                <label>Job Code</label>
                <input type="adminInput" name="oppID" placeholder="Job Code ..." value={formValues.OppID} onChange={handleChange}></input>
              

                <label>Name</label>
                <input type="adminInput" name="name" placeholder="Name ..." value={formValues.name} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.name}</p>

                <label>Description</label>
                <input type="adminInput" name="description" placeholder="Description ..." value={formValues.description} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.description}</p>

                <label>Area</label>
                <input type="adminInput" name="location" placeholder="Area ..." value={formValues.location} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.location}</p>

                <label>Address</label>
                <input type="adminInput" name="address" placeholder="Address ..." value={formValues.address} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.address}</p>

                <label>Job Category</label>
                <input type="adminInput" name="type" placeholder="Job Category ..." value={formValues.type} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.type}</p>

                <label>Qualification</label>
                <input type="adminInput" name="qualification" placeholder="Qualification ..." value={formValues.qualification} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.qualification}</p>

                <label>Pay</label>
                <input type="adminInput" name="pay" placeholder="Pay ..." value={formValues.pay} onChange={handleChange}></input>
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