const express = require('express')
const app = express()
const port = 3000

// Store the product list in memory:
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

app.get('/', (request, response) => {
  response.send('Hello World!')
});

app.get('/productList', (request, response) => {
    response.send(productList); 
  });

app.get("/product/:productId", (request, response) => {
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



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})