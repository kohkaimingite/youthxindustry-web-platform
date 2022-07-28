import React, { useState, useEffect } from "react";
import Axios from 'axios';
import PartnerNavBar from '../components/PartnerNavBar';




export default function AddOppoPartnerApproved() {

	Axios.defaults.withCredentials = true;

	const [oppList, setOppList] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:3001/oppListingWithStatus").then((response) => {

			setOppList(response.data);
			console.log(response.data);


		});
	}, []);


	return (
		<div>
			<PartnerNavBar />
			<h1 style={{ textAlign: "left" }}>Post Approved Opportunities </h1>
			<p style={{ textAlign: "left", marginLeft: '12px', fontSize: '16px', color: 'blue' }}>*Opportunities have to be approved by admin before you are allowed to post</p>

			<div >
				<div className="TableApprovedOppo" style={{ display: 'flex', margin: 'auto' }}>

					<table className="oppoTable">
						<tr>
							<th>Job Code</th>
							<th>Job Name</th>
							<th>Approval</th>
							<th>Post</th>

						</tr>
						{oppList.map((opp) => (
							<tr>

								<td>{opp.OppID}</td>
								<td>{opp.Name}</td>
								<td>{opp.Confirmed}</td>
								<td>{opp.Posted}</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</div>
	)

}