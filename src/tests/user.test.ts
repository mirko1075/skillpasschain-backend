import request from 'supertest';
import app from '../app';

describe('User API', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
