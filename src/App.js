import NavBar from './components/NavBar'
import AboutmeSet from './HomePage/AboutmeSet'
import {Route, Link } from 'react-router-dom';
import './App.css';
import AboutPage from './AboutPage/AboutPage';
// Idea:
//top will be buttons "About" - "opportunities(have sub)" - "contact us" - "login"
// below will be pictures with a text in the center and the button to the page
//EXAMPLE:
//First one will be a picture then a brief description and below the description wil be the about us button
//GRAPHIC EXAMPLE:
//"About" - "opportunities(have sub)" - "contact us" - "login"
//-------------------------------------------------------------
//|                      this is cyc                          |
//|                       About us                            |
//-------------------------------------------------------------
//|               here, we have opporunities                  |
//|                     opporunities                          |
//-------------------------------------------------------------

//mamamamadsadasadsadasda

//<h2 class = 'aboutmepic'>ABOUT US</h2>
function App() {
  return (
      <div className="App">
          <NavBar />
          <h2>Picure of logo with "about us" button</h2>
          <AboutmeSet />
          <h2>Picure of logo with "opportunities" button</h2>
          <h2>Picure of logo with "contact us" button</h2>
          <h2>Picure of logo with "login" button</h2>

          <switch>
              <Route exact path="/aboutus" component={AboutPage} />
              </switch>
    </div>
  );
}

export default App;

