// JavaScript source code
import LoggedNavBar from '../components/LoggedNavBar'
import { React, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap'
import { faGraduationCap, faDollarSign, faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function SubmitApplication() {
    const [ProfList, setProfList] = useState([]);
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
        axios.post("http://localhost:3001/GetOppo1",
            { OppID: id }).then((response) => {
            console.log(response);
            setOppList(response.data);
        });
    }, []);
    return (
        <div className="App">
            <LoggedNavBar />
            <div className="main">
                <h1>Application</h1>
                <div className="AlignLeft">
                    <h3>Details:</h3>
                    <form action="/action_page.php" method="post">
                        <text>Full Name:</text><br />
                        <text>Email:</text><br />
                        <text>Mobile Number:</text><br />
                        <text>Resume: </text><br />
                    </form>
                </div>
            
                <div className="AlignMiddle">
                    <form action="/action_page.php" method="post">
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.Name}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.Email}</text>;
                        })}<br />
                        {ProfList.map((val, key) => {
                            return <text align="Left">{val.ContactNumber}</text>;
                        })}<br />
                            
                        <button onClick={submit}> Confirm </button>
                    </form>
                    <h2>{desc}</h2>
                </div>
                <div className="AlignRight">
                    <Row>
                        {OppList.map((opp, k) => (

                                <Card border="dark" style={{ float: 'right' }}>
                                    <Card.Header style={{ textAlign: 'left' }}>{opp.OppID}</Card.Header>
                                    <Card.Body>
                                        <Card.Title style={{ textAlign: 'left' }}><a href={"/Oppo/" + opp.OppID}>{opp.Name}</a></Card.Title>
                                        <Card.Subtitle style={{ textAlign: 'left', color: 'grey' }} >{opp.Type}</Card.Subtitle>
                                        <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} ><FontAwesomeIcon icon={faGraduationCap} fontSize="11px" /> {opp.Qualification}</Card.Text>
                                        <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} > <FontAwesomeIcon icon={faMapMarkerAlt} /> {opp.Location}</Card.Text>
                                        <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} > <FontAwesomeIcon icon={faDollarSign} /> {opp.Pay}</Card.Text>
                                    </Card.Body>
                                </Card>

                        ))}
                    </Row>
                            
                </div>
            </div>
        </div>
        
        
    )

    function submit() {
        axios.post("http://localhost:3001/SubmitApplication", {
            OppID : id
        }).then(() => {
            console.log("test");
            window.location = "http://localhost:3000/Status";
        });
    }
}

export default SubmitApplication;