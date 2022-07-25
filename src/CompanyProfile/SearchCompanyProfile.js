import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import "./SearchCompanyProfile.css";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from '../components/NavBar';

function SearchCompanyProfile() {

    const [storeUser, setStoreUser] = useState([]);
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

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/viewCompanyProfile").then((response) => {
            setStoreUser(response.data);

        });
    }, []);


    return (
        <div className="SearchCompanyProfileDiv" >
            <NavBar />
            <div className="search" >
                <div className="searchInputs" >
                    <p style={{ marginRight: '330px' }}>Search</p>
                    <input type="text" onChange={handleFilter} placeholder="Search Companies" value={wordEntered} style={{ width: "400px" }} />
                    <div className="searchIcon">
                        {filteredData.length === 0 ? <FontAwesomeIcon icon={faSearch} /> : <FontAwesomeIcon icon={faX} id="clearBtn" onClick={clearInput} />}
                    </div>
                    {filteredData.length != 0 && (
                        <div className="dataResult">
                            {filteredData.slice(0, 10).map((user, k) => {
                                return (
                                    <a className="dataItem" href={'/ViewCompanyProfile/' + user.Name}>
                                        <p>{user.Name}</p>
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default SearchCompanyProfile;