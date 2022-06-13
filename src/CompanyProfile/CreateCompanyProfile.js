import NavBar from '../components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


export default function CreateCompanyProfile() {


    const styleP = {
        fontSize: 14,
        paddingTop: "20px",
    };

    const styleH = {
        paddingTop: "50px",
        paddingBottom: "20px",
    };

    
    return (

        <div className="App">
            <NavBar />
            <div className="CreateCompanyProfile">
                <Container>
                <row>
                    <Col><h1>Company Name</h1></Col>
                </row>

                <row>
                        <Tabs defaultActiveKey="second">
                            <Tab eventKey="first" title="Information">
                                <h4 align="left" style={styleH}>Company Overview</h4>
                                <p align="left">Abous Us</p>
                                <p align="left" style={styleP}>

                                    NCS is a leading technology services firm with presence in Asia Pacific and partners with governments and enterprises to advance communities through technology.
                                    Combining the experience and expertise of its 10,000-strong team across 49 specialisations, NCS provides differentiated and end-to-end technology services to clients with its NEXT capabilities in digital, cloud and platform as well as core offerings in application, infrastructure, engineering and cyber security.
                                    NCS also believes in building a strong partner eco-system with leading technology players, research institutions and start-ups to support open innovation and co-creation. For more information, visit ncs.co. </p>

                                <p align="left">Why Join Us?</p>
                                <p align="left" style={styleP}>In NCS, we make IT, win IT, lead IT...

                                    We have developed multiple critical applications and systems that cut across different sectors in Singapore.
                                    Each employee in NCS plays an important role. The success of the company is shared with every single individual in the NCS family. </p>
                                
                            </Tab>
                            <Tab eventKey="second" title="Opportunities">
                                <Row xs={1} md={2} className="g-4">
                                <Card border="dark" style={{ width: '18rem' }}>
                                    <Card.Header>Header</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Dark Card Title</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk
                                            of the card's content.
                                        </Card.Text>
                                    </Card.Body>
                                    </Card>

                                    <Card border="dark" style={{ width: '18rem' }}>
                                        <Card.Header>Header</Card.Header>
                                        <Card.Body>
                                            <Card.Title>Dark Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk
                                                of the card's content.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Tab>
                            <Tab eventKey="third" title="Reviews" >
                                Hii, I am 3rd tab content
                            </Tab>
                        </Tabs>

                    </row>
                    </Container>
            </div>

        </div>
        

        )
}