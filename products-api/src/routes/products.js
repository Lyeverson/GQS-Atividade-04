const express = require('express');
const router = express.Router();

let products = [];
let currentId = 1;


// Cria um novo produto
router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: currentId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});


// Lista todos os produtos
router.get('/', (req, res) => {
  res.json(products);
});


// Pega um produto específico pelo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));
  if (!product) {
    return res.status(404).send('Product not found');
  }
  res.json(product);
});


// Atualiza um produto pelo ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }
  const updatedProduct = { id: parseInt(id), name, price };
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});


// Deleta um produto pelo ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));
  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }
  products.splice(productIndex, 1);
  res.status(204).send();
});

module.exports = router;
