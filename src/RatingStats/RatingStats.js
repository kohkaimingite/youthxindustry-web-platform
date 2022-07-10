import React, { useState, useEffect } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';


const RatingStats = () => {


    Axios.defaults.withCredentials = true;

    const [showData, setShowData] = ([]);

    const newData = showData.map(d => ({ UserID: d[0], OppID: d[1], Review: d[2], Rating: d[3] }));

    let renderLabel = function (entry) {
        return entry.name;
    };


    const data = [
        { name: 'Geeksforgeeks', students: 400 },
        { name: 'Technical scripter', students: 700 },
        { name: 'Geek-i-knack', students: 200 },
        { name: 'Geek-o-mania', students: 1000 }
    ];



    useEffect(() => {
        Axios.get("http://localhost:3001/getStatsCompany").then((response) => {
            setShowData(response.data);

        });
    }, []);




    return (
        <div>
            <NavBar />
            <ResponsiveContainer width={'100%'} height={600}>
                <PieChart>
                    <Pie label={renderLabel} data={newData} dataKey="Rating" outerRadius={150} innerRadius={100} fill="orange" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RatingStats;