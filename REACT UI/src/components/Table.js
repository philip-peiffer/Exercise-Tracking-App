import React from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader'

function Table ({exercises, editExercise, deleteExercise}) {
    return (
        <div>
            <table>
                <thead>
                    <TableHeader></TableHeader>
                </thead>
                <tbody>
                    {exercises.map((exercise) => <TableRow exercise={exercise} 
                                                key={exercise._id}
                                                editExercise={editExercise} 
                                                deleteExercise={deleteExercise}></TableRow>)}
                </tbody>
            </table>
        </div>
    )
}

export default Table