// JavaScript source code
import { React, useState, useEffect } from "react";
import NavBar from '../components/NavBar';
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

function MakingReview() {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }
    return (
        <div className="App">
            <NavBar />
            <FontAwesomeIcon icon={faStar }></FontAwesomeIcon>
            <div style={styles.stars}>
                {stars.map((_, index) => {
                    return (
                        <FontAwesomeIcon icon={faStar }key={index}
                            size={24}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}></FontAwesomeIcon>
                       
                            
                        
                    )
                })}
            </div>
            <div className="main">
                <h2>Star rating and review</h2>
                <textarea
                    placeholder="What's your experience?"
                   
                />

                <button
                    
                >
                    Submit
                </button>
            </div>
            

        </div>
    );
}
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

};

export default MakingReview;
