import React from 'react';
import ExerciseForm from '../components/Form';

function EditExercise({exercisetoEdit}) {
    return (
        <div>
            <h1>Update an Exercise</h1>
            <ExerciseForm exercisetoEdit={exercisetoEdit}></ExerciseForm>
        </div>
    )
}

export default EditExercise