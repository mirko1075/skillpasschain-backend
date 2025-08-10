import request from 'supertest';
import app from '../../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Assessment API', () => {
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
  it('should create an assessment', async () => {

    // Use a valid ObjectId string for createdBy
    const res = await request(app)
      .post('/api/v1/assessments')
      .send({
        title: 'JavaScript Fundamentals',
        score: 95,
        takenBy: 'John Doe',
        createdBy: '507f1f77bcf86cd799439011' // valid ObjectId string
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
  });

  it('should fetch all assessments', async () => {
    const res = await request(app).get('/api/v1/assessments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get assessment by ID', async () => {
    console.log('createdId :>> ', createdId);
    const res = await request(app).get(`/api/v1/assessments/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it('should update assessment', async () => {
    const res = await request(app)
      .put(`/api/v1/assessments/${createdId}`)
      .send({ score: 98 });
    expect(res.statusCode).toBe(200);
    expect(res.body.score).toBe(98);
  });

  it('should delete assessment', async () => {
    const res = await request(app).delete(`/api/v1/assessments/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
});
