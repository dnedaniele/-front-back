const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressWinston = require("express-winston");
const winston = require("winston");

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');



const productList = [
  {
    id: "product_1",
    name: "Milk",
    price: 2,
  },
  {
    id: "product_2",
    name: "Muffin",
    price: 7,
  },
];

//Middlewares
app.use(bodyParser.json());

//API Document - Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middleware to check the request Object
/* app.use((req, res, next) => {
  console.info({
    date: new Date(),
    path: req.path,
    host: req.hostname,
    fullRequest: req,
  });
  next();
}); */

//express-winston
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

// Store the product list in memory:
app.get("/productList", (request, response) => {
  response.send(productList);
});

app.get("/products/:productId", (request, response) => {
  // get the product Id from the request object
  const productId = request.params.productId;
  // filter the right product from the product list
  const product = productList.find((prod) => prod.id == productId);
  // return a 404 status if no product is found
  if (!product) {
    response.status(404).end();
  }
  // Send the product object as a JSON response to the client
  response.json(product);
});

//POST

app.post("/products/", (request, response) => {
  const product = request.body; //take the product
  productList.push(product); // add product to product list
  response.json(product); //send the product in the response
});

//PUT

app.put("/products/:productId", (request, response) => {
  const productId = request.params.productId;
  const updatedProduct = request.body;

  let newProduct = null;

  productList.forEach((prod, index) => {
    if (prod.id === productId) {
      newProduct = {
        ...productList[index],
        ...updatedProduct,
      };
      productList[index] = newProduct;
    }
  });
  response.json(newProduct);
});

// DELETE

app.delete("/products/:productId", (request, response) => {
  const productId = request.params.productId;

  productList.forEach((prod, index) => {
    if (prod.id === productId) {
      let newProduct = {};
      productList[index] = newProduct;
    }
  });
  response.json(productList);
});

module.exports = app;
