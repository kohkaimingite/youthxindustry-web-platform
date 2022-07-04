import React from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ReadOnlyRow = ({ opp, handleEditClick, handleDeleteClick }) => {


    return (
        <tr>
            <td>{opp.OppID}</td>
            <td >{opp.Name}</td>
            <td>{opp.Description}</td>
            <td>{opp.Location}</td>
            <td>{opp.Address}</td>
            <td>{opp.Type}</td>
            <td>{opp.Qualification}</td>
            <td>${opp.Pay}</td>
            <td>
                <button style={{ color: '#FFFFFF', backgroundColor: '#008000' }} type="button" onClick={(event) => handleEditClick(event, opp)}> <FontAwesomeIcon icon={faPencil} /></button>
            </td>
            <td>
                <button style={{ color: '#FFFFFF', backgroundColor: '#B22222' }} type="button" onClick={() => handleDeleteClick(opp.OppID)}><FontAwesomeIcon icon={faTrash} /></button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow;