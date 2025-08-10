import request from 'supertest';
import app from '../../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Institution API', () => {
  let createdId: string;
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
  it('should create a new institution', async () => {
    const res = await request(app)
      .post('/api/v1/institutions')
      .send({ name: 'Harvard University', country: 'USA', website: 'https://harvard.edu', email: 'harvard@example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
  });

  it('should fetch all institutions', async () => {
    const res = await request(app).get('/api/v1/institutions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get institution by ID', async () => {
    const res = await request(app).get(`/api/v1/institutions/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it('should update institution', async () => {
    const res = await request(app)
      .put(`/api/v1/institutions/${createdId}`)
      .send({ name: 'MIT' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('MIT');
  });

  it('should delete institution', async () => {
    const res = await request(app).delete(`/api/v1/institutions/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
});
