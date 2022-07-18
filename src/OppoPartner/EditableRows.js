import React from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditableRows = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (

        <tr >
            <td>
                <input
                    type="text"
                    disabled="disabled"
                    name="jobcode"
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Name..."
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Description..."
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Location..."
                    name="location"
                    value={editFormData.location}
                    onChange={handleEditFormChange}
                ></input>
            </td>


            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Address..."
                    name="address"
                    value={editFormData.address}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Type..."
                    name="type"
                    value={editFormData.type}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <input
                    type="text"
                    required="required"
                    placeholder="Qualification..."
                    name="qualification"
                    value={editFormData.qualification}
                    onChange={handleEditFormChange}
                ></input>
            </td>


            <td>
                <input
                    type="number"
                    required="required"
                    placeholder="Pay..."
                    name="pay"
                    value={editFormData.pay}
                    onChange={handleEditFormChange}
                ></input>
            </td>

            <td>
                <button style={{ backgroundColor: '#00FF00' }} type="submit">Save<FontAwesomeIcon icon={faCheck} /></button>

            </td>
            <td>
                <button style={{ backgroundColor: '#FF0000' }} type="button" onClick={handleCancelClick}>Cancel<FontAwesomeIcon icon={faTimes} /></button>
            </td>
        </tr>

    )
}

export default EditableRows;