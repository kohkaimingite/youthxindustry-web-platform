import NavBar from '../components/NavBar';
import { Link } from "react-router-dom";

export default function Register() {

    const styleDiv = {
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        height: '70vh'


        
    };

    return (
        <div className="App">
            <NavBar />
            <div style={styleDiv}>
                <Link to="/RegisterUser" className="btn btn-primary" style={{ width: '10%'}}>User</Link>
                <Link to="/RegisterPartner" className="btn btn-success" style={{ width: '10%'}}>Partner</Link>
                </div>
        </div>
        )
}