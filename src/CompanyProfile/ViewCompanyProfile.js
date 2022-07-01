import React, { useEffect, useState } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useParams } from "react-router-dom";

function ViewCompanyProfile() {

    const [storeUser, setStoreUser] = useState([]);
    const [storeOpp, setStoreOpp] = useState([]);
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

        });
    }, []);


    useEffect(() => {
        Axios.post("http://localhost:3001/getOppCards", {
            UserID: parseInt(storeUserID)

        }).then((response) => {
            setStoreOpp(response.data);

        });
    }, [storeOpp]);


    return (

        <div className="App">
            <NavBar />
            <div className="CreateCompanyProfile">
                {
                    storeUser.filter(company => company.Name === Name).map((company) => {
                        storeUserID = company.UserID;

                        return (

                            <h1>{company.Name}</h1>

                        )
                    })
                }
                <Container>
                    <row>
                        <Tabs defaultActiveKey="second">
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
                                                <p style={style2}>Mobile Number: {company.MobileNumber}</p>

                                            </div>
                                        )
                                    })
                                }
                            </Tab>
                            <Tab eventKey="second" title="Opportunities">
                                <h1 style={style1}>Number of Opp: {storeOpp.length}</h1>
                                <Container>
                                    <Row>
                                        {storeOpp.map((opp, k) => (
                                            <Col key={k} xs={12} md={4} lg={4}>
                                                <Card style={{ width: '18rem' }}>


                                                    <Card.Body>
                                                        <Card.Title>{opp.Name}</Card.Title>
                                                        <Card.Subtitle>{opp.Type}</Card.Subtitle>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Container>

                            </Tab>
                            <Tab eventKey="third" title="Reviews" >
                                Hii, I am 3rd tab content
                            </Tab>
                        </Tabs>

                    </row>
                </Container>
            </div>

        </div>


    )
}

export default ViewCompanyProfile;