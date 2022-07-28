import React, { useState, useEffect, Fragment } from "react";
import Axios from 'axios';
import PartnerNavBar from '../components/PartnerNavBar';
import "./AddOppoPartnerApproved.css";



export default function AddOppoPartnerApproved() {

	Axios.defaults.withCredentials = true;

	const [oppList, setOppList] = useState([]);
	
	useEffect(() => {
		Axios.get("http://localhost:3001/oppListingWithStatus").then((response) => {

			setOppList(response.data);
			console.log(response.data);
			
			
		});
	}, []);

	const submitApprovedOppo = (OppID) => {
		Axios.post("http://localhost:3001/postApprovedOppo", {
			OppID: OppID
		}).then(() => {
			console.log("Posted");
			window.location.reload();
	
		})
			.catch(() => {
				console.log("Not posted");
			});

    }
	
	return (
			<div>
			<PartnerNavBar />
			<h1 style={{ textAlign: "left" }}>Post Approved Opportunities </h1>
			<p style={{ textAlign: "left", marginLeft: '12px', fontSize: '16px', color: 'blue' }}>*Opportunities have to be approved by admin before you are allowed to post</p>
			<p style={{ textAlign: "left", marginLeft: '12px', fontSize: '16px', color: 'red' }}>*Unapproved post will not show up</p>
			<div className="ApprovedTableDiv" >								
				<table className="AddOppoPartnerApprovedTable">
				<tr>
					<th>Job Code</th>
					<th>Job Name</th>
					<th>Status</th>
					<th>Action</th>

				</tr>
			{oppList.map((opp) => (
			<tr>
		
                <td>{opp.OppID}</td>
					<td>{opp.Name}</td>
					
					<td>
					<Fragment>
							{opp.Confirmed === 1?
								(
									<span style={{ color: 'limegreen' }}>Approved</span>
								) : (
										<span >Pending</span>)}
							</Fragment>
			
					</td>
					<td>
						<Fragment>
							{opp.Confirmed === 1 ?
								(
									<button type="button" class="btn btn-primary" onClick={() =>submitApprovedOppo(opp.OppID)}>Post</button>
								) : (
									<button disabled type="button" class="btn btn-primary">Post</button>)}
						</Fragment>
					</td>
				</tr>
			))}
				</table>
			
			</div>
			</div>
		)

}