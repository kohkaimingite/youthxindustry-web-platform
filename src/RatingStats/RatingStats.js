import React, { useState, useEffect } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { PieChart, Pie, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Label, Legend, Tooltip, Cell, } from 'recharts';
import "./RatingStats.css";
import { Card } from 'react-bootstrap'


const RatingStats = () => {


    Axios.defaults.withCredentials = true;

    const [showData, setShowData] = useState([]);
    const [showDataWithNull, setShowDataWithNull] = useState([]);
    const [success, setSuccess] = useState('');                           //so that if there is no data found no stats will be displayed

    const filteredRating = showData
        .map(dataItem => dataItem.Rating) // get all Ratings
        .filter((companies, index, array) => array.indexOf(companies) === index); // filter out duplicates

    const counts = filteredRating                                                        // Get rating, count and percentage
        .map(companies => ({
            rating: companies,
            count: showData.filter(item => item.Rating === companies).length,
            percentage: (showData.filter(item => item.Rating === companies).length / showData.length) * 100
        }));

    const sum = showData.reduce((accumulator, object) => {  //Total sum of all ratings
        return accumulator + object.Rating;
    }, 0);

    const avr = sum / showData.length;                      //average rating

    const oppWithRating = showData.length / (showData.length + showDataWithNull.length) * 100   //Find out opportunities that has received rating

    const oppWithoutRating = showDataWithNull.length / (showData.length + showDataWithNull.length) * 100  //Find out opportunities that has NOT received rating

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF66FF'];

    let renderLabel = function (entry) {                                     //Label to display counts of rating on chart
        return entry.rating + " star: " + entry.count;
    };

    let renderLabelPercent = function (entry) {                             //Label to display percentage of rating on chart
        return entry.rating + " star: " + entry.percentage.toFixed(2) + "%";
    };


    useEffect(() => {
        Axios.get("http://localhost:3001/getCompanyRatingStats").then((response) => {
            if (response.data.length > 0) {
                setShowData(response.data);
                setSuccess(true);
            } else {
                setSuccess(false);
            }
            
        });
    }, []);
    useEffect(() => {
        Axios.get("http://localhost:3001/getCompanyRatingStatsWithNull").then((response) => {
            setShowDataWithNull(response.data);

        });
    }, []);


    return (

        <div className="DisplayInfoOfCharts">
            <NavBar />
             <>
                {!success ? (                            //If no rating were received, display page informing user that not enough data 
                    <section>

                        <h1>Not enough data to create statistics</h1>
                        <p style={{color:"red"}}>*There are no ratings received for your opportunities</p>     
                    </section>
                ) : (
                    <section>
            <h1 style={{ textAlign: 'left' }}>My Statistics</h1>
            <div style={{ display: 'flex' }}>
                <Card style={{ width: '15%', paddingTop: '50px', paddingBottom: '50px', marginLeft: "50px", marginTop: "50px" }}>
                    <Card.Body>
                        <Card.Title>Total Feedbacks</Card.Title>
                        <Card.Text>
                            {showData.length}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '15%', paddingTop: '50px', paddingBottom: '50px', marginLeft: "50px", marginTop: "50px" }}>
                    <Card.Body>
                        <Card.Title>Average Rating</Card.Title>
                        <Card.Text>
                            {avr.toFixed(2)}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '15%', paddingTop: '50px', paddingBottom: '50px', marginLeft: "50px", marginTop: "50px" }}>
                    <Card.Body>
                        <Card.Title>Users that has given rating</Card.Title>
                        <Card.Text>
                            <p style={{ color: 'limegreen' }}>
                                {Math.round(oppWithRating)}%
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card style={{ width: '15%', paddingTop: '50px', paddingBottom: '50px', marginLeft: "50px", marginTop: "50px" }}>
                    <Card.Body>
                        <Card.Title>Users that has not given rating</Card.Title>
                        <Card.Text>
                            <p style={{ color: 'red' }}>
                                {Math.round(oppWithoutRating)}%
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>




            <div className="Charts">
                <div className="DonutChartShowRating">
                    <h2>Percentage of rating:</h2>
                    <ResponsiveContainer width={600} height={400}>
                        <PieChart >
                            <Pie label={renderLabelPercent} data={counts} dataKey="count" outerRadius={150} innerRadius={100}  >
                                <Label
                                    value="Average Rating" position="centerTop" className='label-top' fontSize='20px'
                                />
                                <Label
                                    value={avr.toFixed(2)} position="centerBottom" className='label' fontSize='30px'
                                />
                                {
                                    counts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                                }

                            </Pie>
                        </PieChart>

                    </ResponsiveContainer>
                </div>

                <div className="DonutChartShowRating2">
                    <h2>Number of feedbacks:</h2>
                    <ResponsiveContainer width={500} height={400}>
                        <PieChart >
                            <Pie label={renderLabel} data={counts} dataKey="count" outerRadius={150} innerRadius={100}  >
                                <Label
                                    value="Feedbacks" position="centerTop" className='label-top' fontSize='20px'
                                />
                                <Label
                                    value={showData.length} position="centerBottom" className='label' fontSize='30px'
                                />
                                {
                                    counts.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                        </PieChart>

                    </ResponsiveContainer>
                </div>
                            </div>
                    </section>
                )}
            </>
        </div>
    );
}

export default RatingStats;