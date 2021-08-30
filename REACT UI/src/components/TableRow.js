import React from 'react';
import {TiPencil} from 'react-icons/ti'
import {VscTrash} from 'react-icons/vsc'

function TableRow({exercise, editExercise, deleteExercise}) {
    //due to date selector storing the date ino as YYYY-MM-DD, need to reverse the saved string for correct display
    
    function formatDate() {
        //dates are formatted as YYYY-MM-DD, so just need to put YYYY at end
        const year = exercise.date.slice(2, 4)
        const month = exercise.date.slice(5, 7)
        const day = exercise.date.slice(8, 10)
        return month + '/' + day + '/' + year
    }

    const date = formatDate()

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{date}</td>
            <td className="icons"><TiPencil onClick={() => editExercise(exercise)}/> </td>
            <td className="icons"><VscTrash onClick={() => deleteExercise(exercise._id)}/> </td> 
        </tr>
    )
}

export default TableRow