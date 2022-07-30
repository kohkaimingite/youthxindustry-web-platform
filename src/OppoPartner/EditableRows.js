import React from "react";

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
                <button type="submit" style={{border:'none', background:'none', color: 'limegreen'}}>Save</button>

            </td>
            <td>
                <button type="button" style={{ border: 'none', background: 'none', color: 'orangered' }} onClick={handleCancelClick}>Cancel</button>
            </td>
        </tr>

    )
}

export default EditableRows;