import React, { useState, useEffect } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { PieChart, Pie, ResponsiveContainer, Label, Legend, Tooltip, Cell, } from 'recharts';
import "./RatingStats.css";

const RatingStats = () => {


    Axios.defaults.withCredentials = true;

    const [showData, setShowData] = useState([]);
   
    const filteredRating = showData
        .map(dataItem => dataItem.Rating) // get all Ratings
        .filter((companies, index, array) => array.indexOf(companies) === index); // filter out duplicates

    const counts = filteredRating
        .map(companies => ({
            rating:companies,
            count: showData.filter(item => item.Rating === companies).length // Array to store Rating and Count
        }));

    const sum = showData.reduce((accumulator, object) => {  //Total sum of all ratings
        return accumulator + object.Rating;
    }, 0);

    const avr = sum / showData.length;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF66FF'];

    let renderLabel = function (entry) {
        return entry.rating + " star: "+ entry.count;
    };


    useEffect(() => {
        Axios.get("http://localhost:3001/getCompanyRatingStats").then((response) => {
            setShowData(response.data);

        });
    }, []);


    return (

        <div>
            <NavBar />
            <h1 style={{ textAlign: 'left' }}>My Statistics</h1>
            <div className="Charts">
            <div className="DonutChartShowRating">
                    <ResponsiveContainer width={'100%'} height={600}>
                        <PieChart >
                            <Pie label={renderLabel} data={counts} dataKey="count" outerRadius={150} innerRadius={100}  >
                                <Label
                                    value="Rating Score" position="centerTop" className='label-top' fontSize='20px'
                                />
                                <Label
                                    value={avr} position="centerBottom" className='label' fontSize='30px'
                                />
                                {
                                    showData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                            }

                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default RatingStats;