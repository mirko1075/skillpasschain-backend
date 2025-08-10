import request from 'supertest';
import app from '../../app';
jest.setTimeout(30000); // Set a longer timeout for the tests
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mockedToken'),
  verify: jest.fn(() => ({ userId: '507f1f77bcf86cd799439011' })),
}));
describe('Auth API', () => {
  let token: string;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Auth User', email: 'auth@example.com', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'auth@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should access a protected route', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('auth@example.com');
  });
});
