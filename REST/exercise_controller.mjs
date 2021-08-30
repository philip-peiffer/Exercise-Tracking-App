import express from 'express';
import * as ex from './exercise_model.mjs'

//initialize express as app
const app = express()
const PORT = 3000

//tell express to use JSON parsing because mongoose will be responding with JSON objects
app.use(express.json())

/**
 * This route retrieves all of the exercises from MongoDB
 */
app.get('/exercises', (req, res) => {
    //run findExercise from model to query the database
    ex.findExercise()
        //if no errors occur, send back the array of JSON objects and set status to 200
        .then(exercises => {
            res.status(200).json(exercises)
            })
        .catch(error => {
            console.error(error)
            res.status(500).send({"Error": "exercise query failed", "Error info": error})
        })
})
        
/**
 * This route creates a new exercise in MongoDB
 */
app.post('/exercises', (req, res) => {
    //request body contains parameters needed to create a new document in MongoDB
    //create a new doc in MDB by running the newExercise function
    ex.newExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({"Error": "Error creating new exercise", "Error Info": error})
        })
})

/**
 * This route deletes an exercise based on the input ID
 */
app.delete('/exercises/:_id', (req, res) => {
    //pull the ID out of the path
    //run deleteExercise
    ex.deleteExercise(req.params)
        .then(countDeleted => {
            if (countDeleted === 1) {
                res.status(204).send()
            } else {
                res.status(404).json({"Error": "Exercise not found"})
            }
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({"Error": "Problem with delete function", "Error Info": error})
        })
})

/**
 * This route updates an exercise based on the input ID and request body
 */
app.put('/exercises/:_id', (req, res) => {
    //request body contains parameters to update, request params contains id
    //run updateExercise function
    ex.updateExercise(req.params, req.body)
        .then(countUpdated => {
            if (countUpdated === 1) {
                res.status(200).json(req.body)
            } else {
                res.status(404).send({"Error": "Exercise not found or parameters not updated by user"})
            }
        })
        .catch(error => {
            console.error(error)
            res.status(500).send({"Error": "Problem with update function", "Error Info": error})
        })
})

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`)
})