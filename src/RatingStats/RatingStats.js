import React, { useState, useEffect } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { PieChart, Pie, ResponsiveContainer, Label, Legend, Tooltip, Cell, } from 'recharts';
import "./RatingStats.css";

const RatingStats = () => {


    Axios.defaults.withCredentials = true;

    const [showData, setShowData] = useState([]);
    /* const ratingArray = showData.map(item => {
         return item.Rating
     });
 
     const countOccurrences = ratingArray => ratingArray.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
     const occurrences = ratingArray.reduce(function (acc, curr) {
         return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
     }, {});
         */



    const key = 'Rating';


    const arrayUniqueByKey = [...new Map(showData.map(item =>
        [item[key], item])).values()];



    const ratingCount = showData.map(item => {

        const container = [];

        container.Rating = item.Rating;
        container.Count = showData.filter(e => e.Rating === item.Rating).length;

        return container;

    });


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF66FF'];

    let renderLabel = function (entry) {
        return entry.Rating;
    };




    useEffect(() => {
        Axios.get("http://localhost:3001/getCompanyRatingStats").then((response) => {
            setShowData(response.data);

        });
    }, []);


    return (

        <div className="Charts">

            <NavBar />

            <div className="DonutChartShowRating">

                <div className="try">

                    <ResponsiveContainer width={'100%'} height={600}>
                        <PieChart >
                            <Pie label={renderLabel} data={ratingCount} dataKey="Count" outerRadius={150} innerRadius={100} fill="orange" >
                                <Label
                                    value="Total Ratings" position="centerTop" className='label-top' fontSize='20px'
                                />
                                <Label
                                    value={showData.length} position="centerBottom" className='label' fontSize='30px'
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