# Exercise-Tracking-App
Website that uses MERN stack to track and display daily exercises

This project is separated into two different directories and requires two terminals in order to operate. The app utilizes a REST API and MongoDB backend to store exercises that are entered. It also utilizes a REACT front end in order to display the data to the user. To launch the app, navigate to the REST directory and type "npm start" in the terminal. This will start the backend on a local port. Then, in a new terminal, navigate to the REACT directory and type "npm start". This will launch the frontend on a local host. 

To add an exercise, click the "Create Exercise" button. You will be directed to a page where you fill out a form with the necessary information. Upon hitting the submit button, the app will send a POST request to the backend server. The controller will handle this request and send back an alert on if the request was successful and will immediately send you back to the homepage. If successful, the homepage updates with the newly created exercise. 

To update an exercise, click one of the pencil icons next to the exercise. This will send a PUT request and operates in a similar manner to the POST request. 

To delete an exercise, simply click on the track icon next to the exercise. This sends a DELETE request followed by a GET request to retrieve the latest saved exercises (thus filtering out the newly deleted exercise). 
