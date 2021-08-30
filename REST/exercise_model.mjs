import mongoose from 'mongoose';

//connect to the database (using local port 27017)
mongoose.connect(
    "mongodb://localhost:27017/movies_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

//save mongoose connection to variable
const db = mongoose.connection;

//send connection message to user
db.once('open', () => {
    console.log('Successfully connected to mongo database using Mongoose.')
});

// Tell mongoose to create indexes, which help with faster querying
mongoose.set("useCreateIndex", true);

//define the schema for a new exercise
/**
 * Defines a schema for a new exercise.
 */
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

//create the model class from the schema
const Exercise = mongoose.model("Exercise", exerciseSchema)

//create a new exercise
/**
 * Creates a new exercise document in the database.
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight 
 * @param {String} unit allowed values are kg or lb
 * @param {String} date entered in MM-DD-YY format
 * @returns a JSON object of the new exercise
 */
const newExercise = async (name, reps, weight, unit, date) => {
    //create new instance of exercise class
    const newExercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date})
    //save the instance to persist it in database
    return newExercise.save()
}

//find all exercises
/**
 * This function finds all of the exercises currently in the database. No filters applied by default, but 
 * function does have the ability to filter if desired with the filter parameter.
 * @param {Object} filter 
 * @returns A query object with the results
 */
const findExercise = async (filter=null) => {
    //create a query object with find
    const query = Exercise.find(filter)
    // return the executed query
    return query.exec()
}

//update an existing exercise based on ID
/**
 * This function finds the exercise document with the given ID and updates the parameters given in properties.
 * @param {String} id 
 * @param {Object} properties a JSON object containing the properties you wish to update in the document 
 * @returns a JSON object with number of modified documents as a value
 */
const updateExercise = async (id, properties) => {
    const result = await Exercise.updateOne(id, properties)
    return result.nModified
}

//delete an existing exercise based on ID
/**
 * This function deletes an exercise that matches the input ID
 * @param {String} id ID of the exercise document you wish to delete 
 * @returns a JSON object with the number of deleted documents
 */
const deleteExercise = async (id) => {
    const result = await Exercise.deleteOne(id)
    return result.deletedCount
}

export {newExercise, updateExercise, findExercise, deleteExercise}
