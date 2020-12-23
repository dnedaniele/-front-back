const Joi = require("joi");
const express = require("express");

const app = express(); // Object Express stored in the const app

// the object express (hence the const app)
// have many usefull methods: app.get() , app.post(), app.put(), app.delete()
// they are http methods

app.use(express.json()); //we cann the express method as a middleware to use it in the  request processing

const courses = [
  { id: 1, name: "javascript" },
  { id: 2, name: "nodeJS" },
  { id: 3, name: "SQL" },
];

//ROUTES

//GET

//app.get() // it is the EndPoint responding to an http GET request
app.get("/", (req, res) => {
  res.send("hello world");
});

// api/Courses  // EndPoint responding to an http GET request for api/courses
app.get("/api/courses", (req, res) => {
  res.send(courses); // object returning the courses list [array]
});

//pick a course by the id
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id)); //use the array.find() method - a method of arrays. Parse the result since it is a string you have to convert it to an integer with parseInt()
  if (!course) res.status(404).send("the course with the given ID wasnt found"); // if the course with the given ID is not in the Database
  res.send(course);
});

// query string parameters  -- for non-essential values
app.get("/api/posts/:year", (req, res) => {
  res.send(req.query);
});

//POST

/* app.post('/api/courses', (req, res) => { // a POST Request -  the client wants to post(add) a new element to the array of courses
    const newCourse = { // create a new course object to be added to the array
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.send(newCourse);
});
 */
// input validation

/* app.post('/api/courses', (req, res) => { // a POST Request -  the client wants to post(add) a new element to the array of courses
    if (!req.body.name || req.body.name.length < 3) { //if the name doesnt exist or or the length is less than 3
        res.status(400).send("name is required and should be more than 3 character");
        return; // you return so the rest of the function wont be processed
    }
    const newCourse = { // create a new course object to be added to the array
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.send(newCourse);
});
 */
// input validation with JOI
app.post("/api/courses", (req, res) => {
  const schema = {
    // Schema with Joi
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema); //Joi results
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return; // you return so the rest of the function wont be processed
  }
  const newCourse = {
    // create a new course object to be added to the array
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(newCourse);
  res.send(newCourse);
});

// PUT
// EXISTENCE
app.put("/api/courses/:id", (req, rest) => {
  if (!req.body.name || req.body.name.length < 3) {
    //if the name doesnt exist or or the length is less than 3
    res
      .status(400)
      .send("name is required and should be more than 3 character");
  }

  //const result = validateCourse(req.body);
const {error} = validateCourse(req.body); // Object destructuring result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return; // you return so the rest of the function wont be processed
  }

  //UPDATE
course.name = req.body,name;
res.send(course);

});

// input validation with JOI with destructuring object
app.post("/api/courses", (req, res) => {
    const {error} = validateCourse(req.body); // Object destructuring result.error

  if (error) {
    res.status(400).send(error.details[0].message);
    return; // you return so the rest of the function wont be processed
  }
  
    const newCourse = {
      // create a new course object to be added to the array
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(newCourse);
    res.send(newCourse);
  });


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required(),
      };
      return Joi.validate(course, schema);  
}



//LISTEN TO THE PORT _ Port in the ENVironment variable
// usually the PORT automatically assigned by the hosting environment
const port = process.env.PORT || 3000; // u pick the automatically assigned PORT or 3000

app.listen(port, () => console.log(`Listening on Port ${port}...`));
