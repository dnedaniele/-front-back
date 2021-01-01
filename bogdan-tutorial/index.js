require('dotenv').config()


const app = require('./app');
const database = require('./database'); 

const port = process.env.PORT;

app.get("/", (request, response) => {
    if(process.env.NODE_ENV === 'development'){
        response.send("We are in development");
    } 
    response.send("We are elsewhere")
  });

//Listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
