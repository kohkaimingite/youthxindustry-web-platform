import React from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ReadOnlyRow = ({ opp, handleEditClick, handleDeleteClick }) => {


    return (
        <tr>
            <td style={{ textAlign:"left" }}>{opp.OppID}</td>
            <td style={{ textAlign:"left" }}>{opp.Name}</td>
            <td style={{ textAlign:"left" }}>{opp.Description}</td>
            <td style={{ textAlign:"left" }}> {opp.Location}</td>
            <td style={{ textAlign:"left" }}>{opp.Address}</td>
            <td style={{ textAlign:"left" }}>{opp.Type}</td>
            <td style={{ textAlign:"left" }}>{opp.Qualification}</td>
            <td style={{ textAlign:"left" }}>${opp.Pay}</td>
            <td>
                <div type="button" onClick={(event) => handleEditClick(event, opp)}> <FontAwesomeIcon icon={faPencil} /></div>
            </td>
            <td>
                <div type="button" onClick={() => handleDeleteClick(opp.OppID)}><FontAwesomeIcon icon={faTrash} /></div>
            </td>
        </tr>
    )
}

export default ReadOnlyRow;