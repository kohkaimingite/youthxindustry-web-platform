import React, { useEffect, useState } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useParams } from "react-router-dom";
import { faGraduationCap, faDollarSign, faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoggedNavBar from "../components/LoggedNavBar";


function ViewCompanyProfile() {

    const [storeUser, setStoreUser] = useState([]);
    const [storeOpp, setStoreOpp] = useState([]);
    const [storeReviewRating, setStoreReviewRating] = useState([]);
    let { storeUserID } = '';
    let { Name } = useParams();


    const style1 = {
        textAlign: "left",
        paddingTop: "50px",
        paddingBottom: "20px",
    };

    const style2 = {
        textAlign: "left",
        fontSize: 14,
    };


    useEffect(() => {
        Axios.get("http://localhost:3001/viewCompanyProfile").then((response) => {
            setStoreUser(response.data);
            console.log(response.data);
        });
    }, []);


    useEffect(() => {
        Axios.post("http://localhost:3001/getOppCards", {
            UserID: parseInt(storeUserID)

        }).then((response) => {
            setStoreOpp(response.data);
            console.log(response.data);

        });
    }, [storeUser]);

    useEffect(() => {
        Axios.post("http://localhost:3001/getReviewRatingForCompany", {
            UserID: parseInt(storeUserID)

        }).then((response) => {
            setStoreReviewRating(response.data);
            console.log(response.data);

        });
    }, [storeUser]);

    const filteredRR = storeReviewRating.filter(reviewRating => {                 //Store the data that has ratings so that it can be displayer ltr
        return reviewRating.Rating !== null;
    });

    return (

        <div className="App">
            <LoggedNavBar />
            <div className="CreateCompanyProfile" style={{ marginTop: '20px' }}>
                {
                    storeUser.filter(company => company.Name === Name).map((company) => {
                        storeUserID = company.UserID;

                        return (

                            <h1>{company.Name}</h1>

                        )
                    })
                }
                <Container>
                    <Row>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="Information">
                                <h4 align="left" style={style1}>Company Overview</h4>
                                {
                                    storeUser.filter(company => company.Name === Name).map((company) => {
                                        return (

                                            <div>
                                                <p style={style2}>About {company.Name}</p>
                                                <p style={style2}>{company.UserBio}</p>
                                                <h4 style={style1}>Contact Us</h4>
                                                <p style={style2}>Email: {company.Email} </p>
                                                <p style={style2}>Number: {company.ContactNumber}</p>

                                            </div>
                                        )
                                    })
                                }
                            </Tab>
                            <Tab eventKey="second" title="Opportunities "  >
                                <Container>
                                    <h1 style={{
                                        textAlign: "left",
                                        paddingTop: "40px",
                                        fontSize: "26px",
                                    }}>Number of jobs: {storeOpp.length}</h1>
                                    <Row>
                                        {storeOpp.map((opp, k) => (

                                            <Col key={k} xs={12} md={4} lg={4} style={{ paddingTop: "50px", }}>
                                                <Card border="dark" style={{ width: '18 rem' }}>
                                                    <Card.Header style={{ textAlign: 'left' }}>{opp.OppID}</Card.Header>
                                                    <Card.Body>
                                                        <Card.Title style={{ textAlign: 'left' }}><a href={"/Oppo/" + opp.OppID}>{opp.Name}</a></Card.Title>
                                                        <Card.Subtitle style={{ textAlign: 'left', color: 'grey' }} >{opp.Type}</Card.Subtitle>
                                                        <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} ><FontAwesomeIcon icon={faGraduationCap} fontSize="11px" /> {opp.Qualification}</Card.Text>
                                                        <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} > <FontAwesomeIcon icon={faMapMarkerAlt} /> {opp.Location}</Card.Text>
                                                        <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} > <FontAwesomeIcon icon={faDollarSign} /> {opp.Pay}</Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>

                            </Tab>
                            <Tab eventKey="third" title="Reviews" >

                                <Container>
                                    <h1 style={{
                                        textAlign: "left",
                                        paddingTop: "40px",
                                        fontSize: "26px",
                                    }}>Number of Review/Rating: {filteredRR.length}</h1>
                                    <Row>
                                        {
                                            filteredRR.map((rr, k) => {
                                                return (
                                                    <Col key={k} xs={12} md={4} lg={8} style={{ paddingTop: '50px' }}>
                                                        <Card border="dark" style={{ width: '18 rem', height: '200px' }}>

                                                            <Card.Header style={{ textAlign: 'left' }}>
                                                                {new Array(rr.Rating).fill(null).map(() => (
                                                                    <FontAwesomeIcon icon={faStar} style={{ color: "orange" }} />
                                                                ))}

                                                            </Card.Header>

                                                            <Card.Body>
                                                                <Card.Text style={{ textAlign: 'left', fontSize: "16px" }} >{rr.Review}</Card.Text>

                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </Container>
                            </Tab>
                        </Tabs>

                    </Row>
                </Container>
            </div>

        </div>

    )
}

export default ViewCompanyProfile;