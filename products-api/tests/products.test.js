const request = require('supertest');
const app = require('../src/app');

describe('Products API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .send({ name: 'Product 1', price: 100 });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should fetch all products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should fetch a single product by id', async () => {
    const res = await request(app).get('/products/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a product by id', async () => {
    const res = await request(app)
      .put('/products/1')
      .send({ name: 'Updated Product', price: 150 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual('Updated Product');
  });

  it('should delete a product by id', async () => {
    const res = await request(app).delete('/products/1');
    expect(res.statusCode).toEqual(204);
  });
});
