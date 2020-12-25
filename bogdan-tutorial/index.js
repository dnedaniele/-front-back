const express = require('express')
const app = express()
const bodyParser = require("body-parser");

const productList = [
	{
		id: "product_1",
		name: "Milk",
		price: 2
	},
	{
		id: "product_2",
		name: "Muffin",
		price: 7
	}
]



const port = 3000

app.use(bodyParser.json());

// Store the product list in memory:

app.get('/', (request, response) => {
  response.send('This is the HomePage');
});

app.get('/productList', (request, response) => {
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

  app.post('/products', (request, response) => {
    const product = request.body;  //take the product
    productList.push(product); // add product to product list
    response.json(product); //send the product in the response
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})