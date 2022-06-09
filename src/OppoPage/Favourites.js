// JavaScript source code
import NavBar from '../components/NavBar'
import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import Datatable from './Datatable';
import DatatableFav from './DatatableFav';
require('es6-promise').polyfill();
require('isomorphic-fetch');


function Favourites() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const [data, setData] = useState([]);
    const [OppoList, setOppoList] = useState([]);
    const [q, setQ] = useState("");
    const [Name, setName] = useState("");
    const [Description, setDescription] = useState("");
    const [Location, setLocation] = useState("");

    //jobscope
    const [IT, setIT] = useState("");
    const [Healthcare, setHealthcare] = useState("");
    const [Finance, setFinance] = useState("");
    //location
    const [Central, setCentral] = useState("")
    const [North, setNorth] = useState("");
    const [South, setSouth] = useState("");
    const [East, setEast] = useState("");
    const [West, setWest] = useState("")

    const [test, setTest] = useState("kol");
    const [userID, setUserID] = useState(2);
    const columns = data[0] && Object.keys(data[0]);
    const [t, setT] = useState("");
    const [searchColumns, setSearchColumns] = useState([
        'Name'
    ]);


    function search(rows) {
        return rows.filter((row) =>
            searchColumns.some(
                (column) =>
                    row[column]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1,
            ),
        );
    }

    function typeBox(rows) {
        return rows.filter((row) => row.Type.toLowerCase().indexOf(q.toLowerCase()) > -1
        );
    }
    function deleteme() {
        axios.post("http://localhost:3001/deleteFav", {
            OppID: 696969,
            UserID: 2
            
        }).then(() => {
            console.log("deleted sucessfully!");
        });
    };
    useEffect(() => {
        axios.post("http://localhost:3001/FavOppo", {
            
            UserID: userID
            
        }).then((response) => {

            console.log(response);
            setOppoList(response.data);
        });

    });

    //it, finance, healthcare, north, south, east, west, central
    //IT === "" && Finance === "" && Healthcare === "" && North === "" && South === "" && East === "" && West === "" && Central === ""
    function filterType1(rows) {
        if (IT === "" && Finance === "" && Healthcare === "") {
            return rows;
        } else if (IT === "IT" && Finance === "" && Healthcare === "") {
            return testtype(rows, "it");
        } else if (IT === "IT" && Finance === "Finance" && Healthcare === "") {
            return testtype(rows, "it").concat(testtype(rows, "finance"));
        } else if (IT === "IT" && Finance === "Finance" && Healthcare === "Healthcare") {
            return testtype(rows, "it").concat(testtype(rows, "finance")).concat(testtype(rows, "healthcare"));

        } else if (IT === "" && Finance === "Finance" && Healthcare === "Healthcare") {
            return testtype(rows, "finance").concat(testtype(rows, "healthcare"));
        } else if (IT === "" && Finance === "" && Healthcare === "Healthcare") {
            return testtype(rows, "healthcare");
        } else if (IT === "IT" && Finance === "" && Healthcare === "Healthcare") {
            return testtype(rows, "it").concat(testtype(rows, "healthcare"));
        }

        else if (IT === "" && Finance === "Finance" && Healthcare === "") {
            return testtype(rows, "finance");
        } else {
            return rows;
        }

    }
    function smthI(og) {
        if (IT === "") {
            return og;
        } else {

            return og.filter((row) => row.Type.toLowerCase().indexOf("it") > -1);
        }
    }
    function smthF(og, changed) {
        if (og === changed) {
            if (Finance === "Finance") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("finance") > -1);
            } else if (Finance === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Finance === "Finance") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("finance") > -1));
            } else if (Finance === "") {
                return changed;
            }
        }


    }
    function smthH(og, changed) {
        if (og === changed) {
            if (Healthcare === "Healthcare") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("healthcare") > -1);
            } else if (Healthcare === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Healthcare === "Healthcare") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("healthcare") > -1));
            } else if (Healthcare === "") {
                return changed;
            }
        }
    }
    function filterType(row) {
        return search(smthH(row, smthF(row, smthI(row))))
    }
    //location[x]

    //function failed(rows) {


    //    if (North === "" && South === "" && East === "" && West === "" && Central === "") {
    //        return rows;
    //    } else {
    //       var x = 0;
    //       var final = [];
    //       while (x < 5) {
    //           if (returnConst(x) === "") {
    //              x += 1;
    //           } else {
    //              final.concat(testlocation(rows, check[x]))
    //               x += 1;
    //            }
    //       }
    //        return final;
    //    }
    //    
    //  }

    function testtype(rows, filter) {

        return rows.filter((row) => row.Type.toLowerCase().indexOf(filter) > -1
        );
    }

    function testlocation(rows, filter) {

        return rows.filter((row) => row.Location.toLowerCase().indexOf(filter) > -1
        );
    }
    function smthC(og) {
        if (Central === "") {
            return og;
        } else {

            return og.filter((row) => row.Location.toLowerCase().indexOf("central") > -1);
        }

    }
    function smthW(og, changed) {
        if (og === changed) {
            if (West === "West") {
                return og.filter((row) => row.Location.toLowerCase().indexOf("west") > -1);
            } else if (West === "") {
                return og;
            }

        } else if (og !== changed) {
            if (West === "West") {
                return changed.concat(og.filter((row) => row.Location.toLowerCase().indexOf("west") > -1));
            } else if (West === "") {
                return changed;
            }
        }

    }
    function smthE(og, changed) {
        if (og === changed) {
            if (East === "East") {
                return og.filter((row) => row.Location.toLowerCase().indexOf("east") > -1);
            } else if (East === "") {
                return og;
            }

        } else if (og !== changed) {
            if (East === "East") {
                return changed.concat(og.filter((row) => row.Location.toLowerCase().indexOf("east") > -1));
            } else if (East === "") {
                return changed;
            }
        }

    }

    function smthS(og, changed) {
        if (og === changed) {
            if (South === "South") {
                return og.filter((row) => row.Location.toLowerCase().indexOf("south") > -1);
            } else if (South === "") {
                return og;
            }

        } else if (og !== changed) {
            if (South === "South") {
                return changed.concat(og.filter((row) => row.Location.toLowerCase().indexOf("south") > -1));
            } else if (South === "") {
                return changed;
            }
        }

    }
    function smthN(og, changed) {
        if (og === changed) {
            if (North === "North") {
                return og.filter((row) => row.Location.toLowerCase().indexOf("north") > -1);
            } else if (North === "") {
                return og;
            }

        } else if (og !== changed) {
            if (North === "North") {
                return changed.concat(og.filter((row) => row.Location.toLowerCase().indexOf("north") > -1));
            } else if (North === "") {
                return changed;
            }
        }

    }
    function filterLocation(row) {
        return smthN(row, smthS(row, smthE(row, smthW(row, smthC(row)))))
    }
    function filterAll(row) {
        return filterType(filterLocation(row))
    }
    function fun() {
        setTest("pp")
    };
    //return changed.concat(og.filter((row) => row.Location.toLowerCase().indexOf("central") > -1));
    //return changed.concat(og.filter((row) => row.Location.toLowerCase().indexOf("west") > -1));
    function changeState(boo, val) {

        if (val === "Finance") {
            if (boo == true) {
                setFinance(val);
            } else {
                setFinance("");
            }
        } else if (val === "Healthcare") {
            if (boo == true) {
                setHealthcare(val);
            } else {
                setHealthcare("");
            }
        } else if (val === "IT") {
            if (boo == true) {
                setIT(val);
            } else {
                setIT("");
            }
        } else if (val === "Central") {
            if (boo == true) {
                setCentral(val);
            } else {
                setCentral("");
            }
        } else if (val === "North") {
            if (boo == true) {
                setNorth(val);
            } else {
                setNorth("");
            }
        } else if (val === "South") {
            if (boo == true) {
                setSouth(val);
            } else {
                setSouth("");
            }
        } else if (val === "East") {
            if (boo == true) {
                setEast(val);
            } else {
                setEast("");
            }
        } else if (val === "West") {
            if (boo == true) {
                setWest(val);
            } else {
                setWest("");
            }
        }




        return;
    }
    return (
        //onSubmit={ilterdata(OppoList)}

        <div className="App">
            <NavBar />


            <div className="main">
                <h1 class="oppoNFavTitle">Favourites</h1>
                <div class="sidenav">

                    <h2>Filter!</h2>
                    <h4>Filter for Job Categories</h4>
                    <div>

                        <form >
                            <input type="checkbox" id="IT" name="IT" value="IT" onChange={(e) => changeState(e.target.checked, "IT")} />
                            <label for="IT">IT</label><br />
                            <input type="checkbox" id="Finance" name="Finance" value="Finance" onChange={(e) => changeState(e.target.checked, "Finance")} />
                            <label for="Finance"> Finance</label><br />
                            <input type="checkbox" id="Healthcare" name="Healthcare" value="Healthcare" onChange={(e) => changeState(e.target.checked, "Healthcare")} />
                            <label for="Healthcare"> Healthcare</label><br />



                            <h4>Filter for Location</h4>

                            <input type="checkbox" id="North" name="North" value="North" onChange={(e) => changeState(e.target.checked, "North")} />
                            <label for="North"> North</label><br />
                            <input type="checkbox" id="South" name="South" value="South" onChange={(e) => changeState(e.target.checked, "South")} />
                            <label for="South"> South</label><br />
                            <input type="checkbox" id="East" name="East" value="East" onChange={(e) => changeState(e.target.checked, "East")} />
                            <label for="East"> East</label><br />
                            <input type="checkbox" id="West" name="West" value="West" onChange={(e) => changeState(e.target.checked, "West")} />
                            <label for="West"> West</label><br />
                            <input type="checkbox" id="Central" name="Central" value="Central" onChange={(e) => changeState(e.target.checked, "Central")} />
                            <label for="Central"> Central</label><br />
                        </form>

                    </div>
                    




                </div>
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search.." />

                <DatatableFav data={filterAll(OppoList)} />
                

            </div>



        </div>


    );
}



export default Favourites;
