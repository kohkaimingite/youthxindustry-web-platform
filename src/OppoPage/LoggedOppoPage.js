// JavaScript source code
import NavBar from '../components/NavBar'
import ListNavBar from '../components/ListNavBar'
import { React, useState, useEffect } from "react";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import LoggedDatatable from './LoggedDatatable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
require('es6-promise').polyfill();
require('isomorphic-fetch');


function LoggedOppoPage() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };
    const [data, setData] = useState([]);
    const [OppoList, setOppoList] = useState([]);
    const [q, setQ] = useState("");

    //jobscope
    const [IT, setIT] = useState("");
    const [Healthcare, setHealthcare] = useState("");
    const [Finance, setFinance] = useState("");
    const [Education, setEducation] = useState("");

    
    //location
    const [Central, setCentral] = useState("")
    const [North, setNorth] = useState("");
    const [South, setSouth] = useState("");
    const [East, setEast] = useState("");
    const [West, setWest] = useState("")

    //button to scrol up
    const [showScrollBtn, setShowScrollBtn] = useState("");
    
    
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
        return rows.filter((row) => row.Type.toLowerCase().indexOf(q.toLowerCase())>-1
        );
    }

    useEffect(() => {
        axios.get("http://localhost:3001/Oppo").then((response) => {

            console.log(response);
            setOppoList(response.data);
        });

    });
    useEffect(() => {
        window.addEventListener('scroll', scrollAppear );
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const scrollAppear = () => {
        if (window.pageYOffset  > 100) {

            setShowScrollBtn(true);
        } else {

            setShowScrollBtn(false);
        }
    }
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
    function smthEdu(og, changed) {
        if (og === changed) {
            if (Education === "Education") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("education") > -1);
            } else if (Healthcare === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Education === "Education") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("education") > -1));
            } else if (Education === "") {
                return changed;
            }
        }
    }
    //Education
    //smthH(row,smthF(row,smthI(row)))
    function filterType(row) {
        return search(smthEdu(row, smthH(row, smthF(row, smthI(row)))))
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
    
    function testtype(rows,filter) {

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
    function smthW(og,changed) {
        if (og === changed) {
            if (West==="West") {
                return og.filter((row) => row.Location.toLowerCase().indexOf("west") > -1);
            } else if (West==="") {
                return og;
            }
            
        } else if (og!==changed) {
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
        return smthN(row,smthS(row,smthE(row, smthW(row, smthC(row)))))
    }
    function filterAll(row) {
        return filterType(filterLocation(row))
    }
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
        } else if (val === "Education") {
            if (boo == true) {
                setEducation(val);
            } else {
                setEducation("");
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

           
            
       
        return ;
    }
    return (
        //onSubmit={ilterdata(OppoList)}
        //
         //class="oppoNFavTitle"
        <div className="App">
            <ListNavBar />

            
            <div className="main">
                <h1>Opportunities</h1>
                
                <div class="sidenav">

                    <h2>Filter!</h2>
                    <h4>Filter for Job Categories</h4>
                    <div>

                        <form >
                            <input type="checkbox" id="IT" name="IT" value="IT" onChange={(e) => changeState(e.target.checked, "IT")} />
                            <label for="IT">IT</label><br/>
                            <input type="checkbox" id="Finance" name="Finance" value="Finance" onChange={(e) => changeState(e.target.checked,"Finance")}/>
                            <label for="Finance"> Finance</label><br />
                            <input type="checkbox" id="Healthcare" name="Healthcare" value="Healthcare" onChange={(e) => changeState(e.target.checked, "Healthcare")}/>
                            <label for="Healthcare"> Healthcare</label><br />
                            <input type="checkbox" id="Education" name="Education" value="Education" onChange={(e) => changeState(e.target.checked, "Education")} />
                            <label for="Education"> Education</label><br />
                     

                    
                    <h4>Filter for Location</h4>
                    
                            <input type="checkbox" id="North" name="North" value="North" onChange={(e) => changeState(e.target.checked, "North")}/>
                            <label for="North"> North</label><br />
                            <input type="checkbox" id="South" name="South" value="South" onChange={(e) => changeState(e.target.checked, "South")}/>
                            <label for="South"> South</label><br />
                            <input type="checkbox" id="East" name="East" value="East" onChange={(e) => changeState(e.target.checked, "East")}/>
                            <label for="East"> East</label><br />
                            <input type="checkbox" id="West" name="West" value="West" onChange={(e) => changeState(e.target.checked, "West")}/>
                            <label for="West"> West</label><br />
                            <input type="checkbox" id="Central" name="Central" value="Central" onChange={(e) => changeState(e.target.checked, "Central")} />
                            <label for="Central"> Central</label><br />
                        </form>

                    </div>
                    
                    
                    <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search.." />
                   
                </div>
                
                <LoggedDatatable data={filterAll(OppoList)} />
                <button id="scrollUp" class="scrollToTop" onClick={scrollToTop} style={{ opacity: showScrollBtn ? 100 : 0 }}><FontAwesomeIcon icon={faArrowUpLong} class="arrowUp" /></button>
            </div>
            
            
            
        </div>


    );
}
//isVisible ? 'opacity-100' : 'opacity-0'
                //opacity: showScrollBtn ? 100 : 0 
                //opacity: showScrollBtn ? 100 : 0 
//<Datatable data={search(OppoList)} />
//<Datatable data={typeBox(search(OppoList))} />
export default LoggedOppoPage;
