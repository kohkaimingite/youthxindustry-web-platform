import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios';
import "./SearchCompanyProfile.css";
import LoggedNavBar from '../components/LoggedNavBar';
import { Container, Row, Col, Card } from 'react-bootstrap'

function SearchCompanyProfile() {

    const [storeUser, setStoreUser] = useState([]);
    const [storeCompanyOpp, setStoreCompanyOpp] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value
        setWordEntered(searchWord);
        const newFilter = storeUser.filter((value) => {
            return value.Name.toLowerCase().includes(searchWord.toLowerCase());

        });
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter);
        }
    };

    /* const clearInput = () => {
         setFilteredData([]);
         setWordEntered("");
     };*/

    useEffect(() => {
        Axios.get("http://localhost:3001/viewCompanyProfile").then((response) => {
            setStoreUser(response.data);

        });
    }, []);

    useEffect(() => {
        Axios.get("http://localhost:3001/findOppForRecommendCompany").then((response) => {
            setStoreCompanyOpp(response.data);
        });
    }, []);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    return (
        <div className="SearchCompanyProfileDiv" >
            <LoggedNavBar />
            <div className="search" >
                <div className="searchInputs" >
                    <p style={{ marginRight: '330px' }}>Search </p>
                    <input type="text" onChange={handleFilter} placeholder="Search Companies" value={wordEntered} style={{ width: "400px" }} />
                    {/* <div className="searchIcon">
                        {filteredData.length === 0 ? <FontAwesomeIcon icon={faSearch} /> : <FontAwesomeIcon icon={faX} id="clearBtn" onClick={clearInput} />}
                    </div>*/}
                    {filteredData.length != 0 && (
                        <div className="dataResult">
                            {filteredData.slice(0, 10).map((user, k) => {
                                return (
                                    <a className="dataItem" key={k} href={'/ViewCompanyProfile/' + user.Name}>
                                        <p>{user.Name}</p>
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>

            <h2 style={{ marginTop: '20px', textAlign: 'left', marginLeft: '120px', marginTop: '100px'}}>Companies that may interest you</h2>
            <Container >
                <Row>
                    {shuffle(storeUser).slice(0, 8).map((opp, k) => (

                        <Col key={k} xs={12} md={4} lg={3}  style={{ paddingTop: "50px"}}  className="popHoverCompany">
                            <Card border="dark" className="CardForCompanyView">
                                <Card.Body>
                                    <p><a href={"/ViewCompanyProfile/" + opp.Name}>{opp.Name}</a></p>
                                    <Fragment>
                                        {storeCompanyOpp.filter(e2 => opp.UserID === e2.UserID).length > 0 ?
                                            (
                                                <Card.Text className="cardTextEffect"style={{ fontSize: '16px' }}>{storeCompanyOpp.filter(e2 => opp.UserID === e2.UserID).length} Opportunities</Card.Text>
                                            ) : (
                                                <Card.Text></Card.Text>
                                            )}
                                    </Fragment>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default SearchCompanyProfile;