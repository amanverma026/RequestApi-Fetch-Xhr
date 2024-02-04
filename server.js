const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const dummyData = {
    "products": [
        {
            "id": 1,
            "title": "Product 1",
            "description": "Description for Product 1",
            "price": 19.99,
            "stock": 100
        },
        {
            "id": 2,
            "title": "Product 2",
            "description": "Description for Product 2",
            "price": 29.99,
            "stock": 50
        },
        {
            "id": 3,
            "title": "Product 3",
            "description": "Description for Product 3",
            "price": 39.99,
            "stock": 75
        }
    ]
};

// Enable CORS (for development purposes)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// GET request to fetch dummy data
app.get('/dummy', (req, res) => {
    res.json(dummyData);
});

// POST request to update dummy data
app.post('/dummy', (req, res) => {
    const newData = req.body;
    dummyData.products.push(newData);
    res.json(newData);
});

// PUT request to update a specific product in dummy data
app.put('/dummy/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedData = req.body;

    // Update the product with the given ID
    const productIndex = dummyData.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        dummyData.products[productIndex] = { id: productId, ...updatedData };
        res.json(dummyData.products[productIndex]);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// DELETE request to delete a specific product from dummy data
app.delete('/dummy/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    // Remove the product with the given ID
    const removedProduct = dummyData.products.find(product => product.id === productId);
    dummyData.products = dummyData.products.filter(product => product.id !== productId);

    if (removedProduct) {
        res.json(removedProduct);
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
