import React, {useState} from "react";
import {useHistory} from 'react-router-dom'

function ExerciseForm({exercisetoEdit}) {

    const history = useHistory()

    //define starting conditions for the form based on if an exercise was passed in
    
    const [name, setName] = useState(exercisetoEdit != null ? exercisetoEdit.name : '')
    const [reps, setReps] = useState(exercisetoEdit != null ? exercisetoEdit.reps : '')
    const [weight, setWeight] = useState(exercisetoEdit != null ? exercisetoEdit.weight : '')
    const [unit, setUnit] = useState(exercisetoEdit != null ? exercisetoEdit.unit : 'lb')
    const [date, setDate] = useState(exercisetoEdit != null ? exercisetoEdit.date : '')
    
    //set the flag for if a new exercise is being created or if one is being updated
    let newFlag = false
    if (exercisetoEdit == null) {
        newFlag = true
    } 
    
    //define the function to create a new exercise
    const newExercise = async (e) => {
        e.preventDefault()
        const formInfo = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(formInfo),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Exercise successfully created!')
        } else {
            alert(`Failed to create exercise. Response code ${response.status}.`)
        };
        history.push("/");
    };

    //define the function to update an exercise
    const updateExercise = async (e) => {
        
        e.preventDefault()
        const modExercise = {name, reps, weight, unit, date}
        //fetch the PUT route from express server
        const response = await fetch(`/exercises/${exercisetoEdit._id}`, {
            method: 'PUT', 
            body: JSON.stringify(modExercise),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (response.status === 200) {
            alert('Successfully updated exercise!')
        } else {
           alert(`Failed to update the exercise with ID ${exercisetoEdit._id}, status code ${response.status}`)
        }
        history.push('/')
    }

    return (
        <div>
            <form>
                    <div className="inputBox">
                        <label>Name of Exercise:
                            <input 
                                type="text"
                                value={name}
                                placeholder="e.g. Bench Press"
                                onChange={e => setName(e.target.value)}  />
                        </label>
                    </div>
                    
                    <div className="inputBox">
                        <label>Number of Reps:
                            <input 
                                type="number"
                                value={reps}
                                placeholder="e.g. 10"
                                onChange={e => setReps(e.target.value)}  />
                        </label>
                    </div>

                    <div className="inputBox">
                        <label>Weight: 
                            <input 
                                type="number"
                                value={weight}
                                placeholder="e.g. 125"
                                onChange={e => setWeight(e.target.value)}  />
                        </label>
                    </div>

                    <div className="inputBox">
                        <label>Units: 
                            <select value={unit} onChange={e => setUnit(e.target.value)} > 
                                <option value="lb">lb</option>
                                <option value="kg">kg</option>
                            </select> 
                        </label>
                    </div>

                    <div className="inputBox">
                        <label>Date Logged: 
                            <input 
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}  />
                        </label>
                    </div>
                    
                    <button onClick={newFlag ? newExercise : updateExercise}>Submit</button>
            </form>
        </div>
    )
}

export default ExerciseForm