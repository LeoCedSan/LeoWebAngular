const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

const PORT = 3000;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    database: 'angular',
    user: 'root',
    password: ''
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('API');
});

// Get all products
app.get('/products', async (req, res) => {
    try {
        const query = `SELECT * FROM products;`;
        const products = await executeQuery(query);
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM products WHERE id = ?;`;
        const product = await executeQuery(query, [id]);
        if (product.length > 0) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new product
app.post('/products', async (req, res) => {
    try {
        const { name, description, categoria, price, image, onSale } = req.body;
        const query = `INSERT INTO products (name, description, categoria, price, image, onSale) VALUES (?, ?, ?, ?, ?, ?);`;
        await executeQuery(query, [name, description, categoria, price, image, onSale]);
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, categoria, price, image, onSale } = req.body;
        const query = `UPDATE products SET name = ?, description = ?, categoria = ?, price = ?, image = ?, onSale = ? WHERE id = ?;`;
        await executeQuery(query, [name, description, categoria, price, image, onSale, id]);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM products WHERE id = ?;`;
        await executeQuery(query, [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


