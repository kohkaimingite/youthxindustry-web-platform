// JavaScript source code
import NavBar from '../components/NavBar'
import ListNavBar from '../components/ListNavBar'
import LoggedNavBar from '../components/LoggedNavBar'
//LoggedNavBar
import { React, useState, useEffect } from "react";
import List from "../Some test data/List";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapsible from '../components/Collapsible';
import axios from 'axios';
import StatusDatatable from './StatusDatatable';
import TabsColourActive from './TabsColourActive.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
require('es6-promise').polyfill();
require('isomorphic-fetch');


function ViewOppoStatus() {
    
    const [OppoStatusList, setOppoStatusList] = useState([]);
    const [q, setQ] = useState(""); 

    //jobscope
    const [IT, setIT] = useState("");
    const [Healthcare, setHealthcare] = useState("");
    const [Finance, setFinance] = useState("");
    const [Education, setEducation] = useState("");
    const [cusService, setCusService] = useState("");
    const [Engineering, setEngineering] = useState("");
    const [Art, setArt] = useState("");
    const [Event, setEvent] = useState("");
    const [FNB, setFNB] = useState("");
    const [Tourism, setTourism] = useState("");
    const [Retail, setRetail] = useState("");
    const [Marketing, setMarketing] = useState("");

    
    //location
    const [Central, setCentral] = useState("");
    const [North, setNorth] = useState("");
    const [South, setSouth] = useState("");
    const [East, setEast] = useState("");
    const [West, setWest] = useState("");

    //button to scrol up
    const [showScrollBtn, setShowScrollBtn] = useState("");
    
    //set current status
    const [successCount, setSuccessCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    
    const [active, setActive] = useState("Success");
    const tabs = [
        { name: "Success", count: successCount },
        { name: "Pending", count: pendingCount },
        { name: "Rejected", count: rejectedCount },
    ]

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
        axios.post("http://localhost:3001/getOppoStatus", { active: active }).then((response) => {

            console.log(response);
            setOppoStatusList(response.data);
        });

    });
    useEffect(() => {
        axios.get("http://localhost:3001/getOppoStatusCount").then((response) => {

            console.log(response);
            setSuccessCount(response.data[0].Count);
            setPendingCount(response.data[1].Count);
            setRejectedCount(response.data[2].Count);
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
    function smthCusService(og, changed) {
        if (og === changed) {
            if (cusService === "Customer Service") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("customer service") > -1);
            } else if (cusService === "") {
                return og;
            }

        } else if (og !== changed) {
            if (cusService === "Customer Service") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("Customer service") > -1));
            } else if (cusService === "") {
                return changed;
            }
        }
    }

    function smthEngineer(og, changed) {
        if (og === changed) {
            if (Engineering === "Engineering") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("engineering") > -1);
            } else if (Engineering === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Engineering === "Engineering") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("engineering") > -1));
            } else if (Engineering === "") {
                return changed;
            }
        }
    }
    function smthArt(og, changed) {
        if (og === changed) {
            if (Art === "Art") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("art") > -1);
            } else if (Art === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Art === "Engineering") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("art") > -1));
            } else if (Art === "") {
                return changed;
            }
        }
    }
    function smthEvent(og, changed) {
        if (og === changed) {
            if (Event === "Event") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("event") > -1);
            } else if (Event === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Event === "Event") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("event") > -1));
            } else if (Event === "") {
                return changed;
            }
        }
    }
    function smthFNB(og, changed) {
        if (og === changed) {
            if (FNB === "fnb") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("f&b") > -1);
            } else if (FNB === "") {
                return og;
            }

        } else if (og !== changed) {
            if (FNB === "fnb") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("f&b") > -1));
            } else if (FNB === "") {
                return changed;
            }
        }
    }
    function smthTourism(og, changed) {
        if (og === changed) {
            if (Tourism === "Tourism") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("tourism") > -1);
            } else if (Tourism === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Tourism === "Tourism") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("tourism") > -1));
            } else if (Tourism === "") {
                return changed;
            }
        }
    }
    function smthRetail(og, changed) {
        if (og === changed) {
            if (Retail === "Retail") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("retail") > -1);
            } else if (Tourism === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Retail === "Retail") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("retail") > -1));
            } else if (Retail === "") {
                return changed;
            }
        }
    }
    function smthMarketing(og, changed) {
        if (og === changed) {
            if (Marketing === "Marketing") {
                return og.filter((row) => row.Type.toLowerCase().indexOf("marketing") > -1);
            } else if (Marketing === "") {
                return og;
            }

        } else if (og !== changed) {
            if (Marketing === "Marketing") {
                return changed.concat(og.filter((row) => row.Type.toLowerCase().indexOf("marketing") > -1));
            } else if (Marketing === "") {
                return changed;
            }
        }
    }

    function filterType(row) {
        return search(smthEvent(row, smthMarketing(row, smthRetail(row, smthTourism(row, smthFNB(row, smthArt(row, smthEngineer(row, smthCusService(row, smthEdu(row, smthH(row, smthF(row, smthI(row)))))))))))))
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
        } else if (val === "Customer Service") {
            if (boo == true) {
                setCusService(val);
            } else {
                setCusService("");
            }
        } else if (val === "Engineering") {
            if (boo == true) {
                setEngineering(val);
            } else {
                setEngineering("");
            }
        } else if (val === "Art") {
            if (boo == true) {
                setArt(val);
            } else {
                setArt("");
            }
        } else if (val === "Event") {
            if (boo == true) {
                setEvent(val);
            } else {
                setEvent("");
            }
        } else if (val === "fnb") {
            if (boo == true) {
                setFNB(val);
            } else {
                setFNB("");
            }
        } else if (val === "Tourism") {
            if (boo == true) {
                setTourism(val);
            } else {
                setTourism("");
            }
        } else if (val === "Retail") {
            if (boo == true) {
                setRetail(val);
            } else {
                setRetail("");
            }
        } else if (val === "Marketing") {
            if (boo == true) {
                setMarketing(val);
            } else {
                setMarketing("");
            }
        }else if (val === "Central") {
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
            <LoggedNavBar />

            
            <div className="main">
                <h1>Opportunities</h1>
                
                <div class="sidenav">

                    <h2>Filters</h2>

                    <div>

                        <form>
                            <h4>Job Categories</h4>

                            <input type="checkbox" id="IT" name="IT" value="IT" onChange={(e) => changeState(e.target.checked, "IT")} /> IT<br />
                            <input type="checkbox" id="Finance" name="Finance" value="Finance" onChange={(e) => changeState(e.target.checked, "Finance")} /> Finance<br />
                            <input type="checkbox" id="Healthcare" name="Healthcare" value="Healthcare" onChange={(e) => changeState(e.target.checked, "Healthcare")} /> Healthcare<br />
                            <input type="checkbox" id="Education" name="Education" value="Education" onChange={(e) => changeState(e.target.checked, "Education")} /> Education<br />
                            <input type="checkbox" id="Customer Service" name="Customer Service" value="Customer Service" onChange={(e) => changeState(e.target.checked, "Customer Service")} /> Customer Service<br />
                            <input type="checkbox" id="Engineering" name="Engineering" value="Engineering" onChange={(e) => changeState(e.target.checked, "Engineering")} /> Engineering<br />
                            <input type="checkbox" id="Art" name="Art" value="Art" onChange={(e) => changeState(e.target.checked, "Art")} /> Art<br />
                            <input type="checkbox" id="Event" name="Event" value="Event" onChange={(e) => changeState(e.target.checked, "Event")} /> Event<br />
                            <input type="checkbox" id="fnb" name="fnb" value="fnb" onChange={(e) => changeState(e.target.checked, "fnb")} /> F&B<br />
                            <input type="checkbox" id="Tourism" name="Tourism" value="Tourism" onChange={(e) => changeState(e.target.checked, "Tourism")} /> Tourism<br />
                            <input type="checkbox" id="Retail" name="Retail" value="Retail" onChange={(e) => changeState(e.target.checked, "Retail")} /> Retail<br />
                            <input type="checkbox" id="Marketing" name="Marketing" value="Marketing" onChange={(e) => changeState(e.target.checked, "Marketing")} /> Marketing<br />



                            <h4>Region</h4>

                            <input type="checkbox" id="North" name="North" value="North" onChange={(e) => changeState(e.target.checked, "North")} /> North<br />
                            <input type="checkbox" id="South" name="South" value="South" onChange={(e) => changeState(e.target.checked, "South")} /> South<br />
                            <input type="checkbox" id="East" name="East" value="East" onChange={(e) => changeState(e.target.checked, "East")} /> East<br />
                            <input type="checkbox" id="West" name="West" value="West" onChange={(e) => changeState(e.target.checked, "West")} /> West<br />
                            <input type="checkbox" id="Central" name="Central" value="Central" onChange={(e) => changeState(e.target.checked, "Central")} /> Central<br />

                        </form>

                    </div>

                    <h4>Search by Name:</h4>
                    <input style={{ width: "170px", marginLeft: "28px", marginRight: "30px" }} type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search.." />

                </div>
                
                <div class="viewStatusTabs">
                    {tabs.map((name, index) => {
                        return (
                            <input
                                type="button"
                                className={active === name.name ? name.name+"Active" : name.name}
                                value={name.name+"("+name.count+")"}
                                onClick={() => setActive(name.name)}
                                key={name.name}
                            />
                        );
                    })}
                </div>
                
                <StatusDatatable data={filterAll(OppoStatusList)} />
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
export default ViewOppoStatus;
