import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes  } from 'react-router-dom';
import AddEmployee from './Components/AddEmployee/AddEmployee';
import EditEmployee from './Components/EditEmployee/EditEmployee';
import ListEmployee from './Components/ListEmployee/ListEmployee';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul className='nav'>
              <li>
                <Link to= "/add" >Add Employee</Link>
              </li>
              <li>
              <Link to="/list">Employees</Link>
              </li>
            </ul>
          </nav>

          <hr/>

          <div className="routes">
          <Routes>
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<EditEmployee />} />
            <Route path="/list" element={<ListEmployee />} />
          </Routes>
          </div>
          
        </div>
      </Router>
    </div>
  );
}

export default App;
