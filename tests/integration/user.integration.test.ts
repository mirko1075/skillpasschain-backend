import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockedToken'),
  verify: jest.fn(() => ({ userId: '507f1f77bcf86cd799439011' })),
}));
describe('User API', () => {
  let createdUserId: string;
  let mongoServer: MongoMemoryServer;


  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  });
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdUserId = res.body._id;
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get user by ID', async () => {
    console.log('createdUserId :>> ', createdUserId);
    const res = await request(app).get(`/api/v1/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdUserId);
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${createdUserId}`)
      .send({ name: 'Jane Doe' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Jane Doe');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete(`/api/v1/users/${createdUserId}`);
    expect(res.statusCode).toBe(204);
  });
});
