import request from 'supertest';
import app from '../../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('Certification API', () => {
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
  it('should create a certification', async () => {
    const res = await request(app)
      .post('/api/v1/certifications')
      .send({ title: 'Blockchain Developer', issuedBy: 'MIT', issueDate: '2025-01-01' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
  });

  it('should fetch all certifications', async () => {
    const res = await request(app).get('/api/v1/certifications');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get certification by ID', async () => {
    const res = await request(app).get(`/api/v1/certifications/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(createdId);
  });

  it('should update certification', async () => {
    const res = await request(app)
      .put(`/api/v1/certifications/${createdId}`)
      .send({ title: 'Advanced Blockchain Developer' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Advanced Blockchain Developer');
  });

  it('should delete certification', async () => {
    const res = await request(app).delete(`/api/v1/certifications/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
});
