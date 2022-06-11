import NavBar from '../components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

export default function CreateCompanyProfile() {

    
    return (

        <div className="App">
            <NavBar />
            <div className="CreateCompanyProfile">
                <Container>
                <row>
                    <Col><h1>Company Name</h1></Col>
                </row>

                <row>
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="pill" href="#information">Information</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="pill" href="#jobOffering">Jobs Offering</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="pill" href="#reviews">Reviews</a>
                    </li>
                </ul>

              
                <div class="tab-content">
                    <div class="tab-pane container active" id="information"></div>
                    <div class="tab-pane container fade" id="jobOffering">...</div>
                    <div class="tab-pane container fade" id="reviews">...</div>
                </div>

                    </row>
                    </Container>
            </div>

        </div>
        

        )
}