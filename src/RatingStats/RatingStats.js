import React, { useState, useEffect } from "react";
import Axios from 'axios';
import NavBar from '../components/NavBar';
import { PieChart, Pie, ResponsiveContainer, Label, Legend, Tooltip, Cell, } from 'recharts';



const RatingStats = () => {


    Axios.defaults.withCredentials = true;

    const [showData, setShowData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    

  let renderLabel = function (entry) {
        return entry.Rating;
    };


   

    useEffect(() => {
        Axios.get("http://localhost:3001/getStatsCompany").then((response) => {
            setShowData(response.data);
            
        });
    }, []);

   
    return (

        <div className="Charts">
         
            <NavBar />

            <div className="DonutChartShowRating">
                <ResponsiveContainer width={'100%'} height={600}>
                    <PieChart >
                        <Pie label={renderLabel} data={showData} dataKey="Rating" outerRadius={150} innerRadius={100} fill="orange" >
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
    );
}

export default RatingStats;