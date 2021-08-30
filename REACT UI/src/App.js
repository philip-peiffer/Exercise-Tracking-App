import './App.css';
import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import CreateExercise from './pages/CreateExercise'
import EditExercise from './pages/EditExercise'

function App() {
  const [exercisetoEdit, setExercisetoEdit] = useState()
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <Homepage setExercisetoEdit={setExercisetoEdit}></Homepage>
          </Route>
          <Route path="/editexercise">
            <EditExercise exercisetoEdit={exercisetoEdit}></EditExercise>
          </Route>
          <Route path="/createexercise">
            <CreateExercise></CreateExercise>
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
