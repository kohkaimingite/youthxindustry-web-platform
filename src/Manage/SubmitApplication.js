// JavaScript source code
import PartnerNavBar from '../components/PartnerNavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { faGraduationCap, faDollarSign, faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SubmitApplication() {
    const [ProfList, setProfList] = useState([]);
    const [desc, setdesc] = useState("");
    const [OppID, setOppID] = useState(0);
    const [Chars, setChars] = useState(0);
    const [OppList, setOppList] = useState([]);
    const columns = ProfList[0] && Object.keys(ProfList[0]);
    const { id } = useParams();
    const getProfile = () => {

    };
    useEffect(() => {
        axios.get("http://localhost:3001/profile").then((response) => {

            console.log(response);
            setProfList(response.data);

        });
    });
    useEffect(() => {
        axios.get("http://localhost:3001/getOppCards").then((response) => {
            console.log(response);
            setOppList(response.data);
        });
    });
    return (
        <div className="App">
            <PartnerNavBar />
            <div className="main">
                <h1>Application</h1>
                <div className="AlignLeft">
                    <h3>Details:</h3>
                    <form action="/action_page.php" method="post">
                        <text>Full Name:</text><br />
                        <text>Email:</text><br />
                        <text>Mobile Number:</text><br />
                        <text>Short Description: </text><br />
                        <text>Resume: </text><br />
                    </form>
                </div>
            
                <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        <h3>Testing</h3>
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.Name}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.Email}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.ContactNumber}</text>;
                        })}<br />
                            
                        <textarea placeholder="Briefly Describe Why You Want This Opportunity... (250 characters)" id="desc" name="desc" value={desc} onChange={e => { setdesc(e.target.value); setChars(e.target.value.length) }} /*style={styles.textArea}*/ maxLength="250"> </textarea>
                        <h4>Characters typed: {Chars}</h4>
                        <button onClick={submit}> Confirm </button>
                    </form>
                </div>
                <div className="AlignRight">
                    <Container>
                        <Row>
                            {OppID.map((opp, k) => (

                                <Col key={k} xs={12} md={4} lg={4} style={{ paddingTop: "50px", }}>
                                    <Card border="dark" style={{ width: '18 rem' }}>
                                        <Card.Header style={{ textAlign: 'left' }}>{opp.OppID}</Card.Header>
                                        <Card.Body>
                                            <Card.Title style={{ textAlign: 'left' }}>{opp.Name}</Card.Title>
                                            <Card.Subtitle style={{ textAlign: 'left', color: 'grey' }} >{opp.Type}</Card.Subtitle>
                                            <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} ><FontAwesomeIcon icon={faGraduationCap} /> {opp.Qualification}</Card.Text>
                                            <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} > <FontAwesomeIcon icon={faMapMarkerAlt} /> {opp.Location}</Card.Text>
                                            <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} > <FontAwesomeIcon icon={faDollarSign} /> {opp.Pay}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
        
        
    )

    function submit() {
        axios.post("http://localhost:3001/SubmitApplication", {
            desc: desc,
            OppID : OppID
        }).then(() => {
            console.log("Test");
            /*setCheck(response.data);*/
            window.location = "http://localhost:3000/Status";
        });
    }
}

export default SubmitApplication;