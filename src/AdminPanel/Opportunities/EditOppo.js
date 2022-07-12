// JavaScript source code
import React, { useState, useEffect } from "react";
import { Route, Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import AdminNavBar from '../../components/AdminNavBar';
import "../Opportunities/EditOppo.css";
import axios from 'axios';

// const initialState = {
//     Email: "",
//     Name: "",
//     Description: "",
//     Location: "",
//     Address: "",
//     Type: "",
//     Qualification: "",
//     Pay: 0
// }


const EditOppo = () => {
    const initialState = { name: "", description: "", location: "", address: "", type: "", qualification: "", pay: 0, oppID:0 };
    const [formValues, setFormValues] = useState(initialState);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const {name, description, location, address, type, qualification, pay, oppID} = formValues;

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
        console.log(formValues);
    }
    
    // const handleName= (e) => {
    //     const {name, value} = e.target;
    //     setFormValues({...formValues, [name]: value})
    // }

    // const handleDescription= (e) => {
    //     const {description, value} = e.target;
    //     setFormValues({...formValues, [description]: value})
    // }

    // const handleLocation = (e) => {
    //     const {location, value} = e.target;
    //     setFormValues({...formValues, [location]: value})
    // }

    // const handleAddress= (e) => {
    //     const {address, value} = e.target;
    //     setFormValues({...formValues, [address]: value})
    // }

    // const handleType= (e) => {
    //     const {type, value} = e.target;
    //     setFormValues({...formValues, [type]: value})
    // }

    // const handleQualification= (e) => {
    //     const {qualification, value} = e.target;
    //     setFormValues({...formValues, [qualification]: value})
    // }

    // const handlePay = (e) => {
    //     const {pay, value} = e.target;
    //     setFormValues({...formValues, [pay]: value})
    // }
    
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
                    setFormValues({ name: "", description: "", location: "", address: "", type: "", qualification: "", pay: 0, oppID: 0 })
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
            errors.name = "Name required!";
        }
        if (!values.description) {
            errors.description = "Description required!";
        }
        if (!values.location) {
            errors.location = "Location required!";
        }
        if (!values.address) {
            errors.address = "Address required!";
        }
        if (!values.type) {
            errors.type = "Job Category required!";
        }
        if (!values.qualification) {
            errors.qualification = "Qualification required!";
        }
        if (!values.pay) {
            errors.pay = "Pay required!";
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
                <label>OppID</label>
                <input type="adminInput" name="oppID" placeholder="oppID ..." value={formValues.OppID} onChange={handleChange}></input>
              

                <label>Name</label>
                <input type="adminInput" name="name" placeholder="Name ..." value={formValues.name} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.name}</p>

                <label>Description</label>
                <input type="adminInput" name="description" placeholder="Description ..." value={formValues.description} onChange={handleChange}></input>
                <p className="adminErrorMsg">{formErrors.description}</p>

                <label>Location</label>
                <input type="adminInput" name="location" placeholder="Location ..." value={formValues.location} onChange={handleChange}></input>
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