// JavaScript source code
import NavBar from './components/NavBar'
import './App.css';
//<h2>Picure of logo with "about us" button</h2>
            //<AboutmeSet />
            //<h2>Picure of logo with "opportunities" button</h2>
            //<h2>Picure of logo with "contact us" button</h2>
            //<h2>Picure of logo with "login" button</h2>
function AboutPage() {
    return (
        <div className="App">
            <NavBar />
            
            <Router>
                <Route path="/Aboutus" component={AboutPage} />
            </Router>

        </div>
    );
}

export default AboutPage;

