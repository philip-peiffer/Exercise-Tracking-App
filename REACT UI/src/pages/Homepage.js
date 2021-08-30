import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Table from '../components/Table'
import { useHistory } from 'react-router-dom';

function Homepage({setExercisetoEdit}) {
    const [exercises, setExercises] = useState([])
    const history = useHistory()

    //define the function to load the database data
    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const exercises = await response.json()
        setExercises(exercises)
    }

    //define the function to delete a database document
    const deleteExercise = async (id) => {
        const response = await fetch(`/exercises/${id}`, {method: 'DELETE'})
        if (response.status === 204) {
            const getExercises = await fetch(`/exercises`)
            const exercises = await getExercises.json()
            setExercises(exercises)
        } else {
            console.error(`Error deleting exercise with id ${id}, status code ${response.status}`)
        }
    }

    const editExercise = (exercisetoEdit) => {
        //set the exercise to edit by calling setExercisetoEdit that was passed down from the APP page
        // this will push the exercise to edit up to APP so that the EditExercise page can use it
        setExercisetoEdit(exercisetoEdit)
        history.push('/editexercise')
    }

    //call loadExercises during the mounting stage of the page
    useEffect(() => {
        loadExercises();
    }, [])

    return (
        <div>
            <h2>Let the GAINS Begin!</h2>
            <p>Recent exercises are in the table below.</p>
            <p>Click the pencil to edit, the trash to delete.</p>
            <Table exercises={exercises} editExercise={editExercise} deleteExercise={deleteExercise}></Table>
            <Link to="/createexercise">Create an Exercise</Link>
        </div>
    )
}

export default Homepage