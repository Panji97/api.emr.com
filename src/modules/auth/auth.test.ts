import request from 'supertest'
import app from '../../app'

describe('AuthController - Login', () => {
  it('should return 400 if email is missing', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/login')
      .send({
        password: 'password123'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Email is required'
    )
  })

  it('should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/login')
      .send({
        email: 'test@example.com'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Password is required'
    )
  })

  it('should return 400 if email format is invalid', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/login')
      .send({
        email: 'invalid-email',
        password: 'password123'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Email must be valid format'
    )
  })

  // ? success case
  it('should return 200 and a token if email and password are valid', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/login')
      .send({
        email: 'superadmin@superadmin.com',
        password: 'NewPassword123!'
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty(
      'message',
      'success login user'
    )
    expect(response.body).toHaveProperty('data')
  })
})

describe('AuthController - Register', () => {
  it('should return 400 if email is missing', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/register') // Sesuaikan endpoint register
      .send({
        password: 'Password123!'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Email is required'
    )
  })

  it('should return 400 if password is missing', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/register')
      .send({
        email: 'user@example.com'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Password is required'
    )
  })

  it('should return 400 if email format is invalid', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/register')
      .send({
        email: 'invalid-email',
        password: 'Password123!'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Email must be valid format'
    )
  })

  it('should return 400 if password does not meet criteria', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/register')
      .send({
        email: 'user@example.com',
        password: 'pass'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Password must be at least 8 characters long'
    )
  })

  // ? success case
  // it('should return 201 and a message if registration is successful', async () => {
  //   const response = await request(app)
  //     .post('/o/oauth/v1/register')
  //     .send({
  //       email: 'newuser3@example.com',
  //       password: 'ValidPassword123!'
  //     })

  //   expect(response.status).toBe(201)
  //   expect(response.body).toHaveProperty(
  //     'message',
  //     'success register new user'
  //   )
  //   expect(response.body).toHaveProperty('data')
  //   // Pastikan data berisi informasi yang benar, seperti user ID atau token
  // })
})

describe('AuthController - Forgot Password', () => {
  it('should return 400 if email is missing', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/forgot-password')
      .send({}) // Email tidak dikirim

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Email is required'
    )
  })

  it('should return 400 if email format is invalid', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/forgot-password')
      .send({
        email: 'invalid-email'
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Email must be valid format'
    )
  })

  it('should return 404 if email is not found', async () => {
    const response = await request(app)
      .post('/o/oauth/v1/forgot-password')
      .send({
        email: 'nonexistent@example.com'
      })

    expect(response.status).toBe(404)
    expect(response.body).toHaveProperty('status', 'failed')
    expect(response.body).toHaveProperty(
      'message',
      'Email is not registered!'
    )
  })

  // ? success case
  // it('should return 200 and send reset password link if email exists', async () => {
  //   const response = await request(app)
  //     .post('/o/oauth/v1/forgot-password')
  //     .send({
  //       email: 'superadmin@superadmin.com'
  //     })

  //   expect(response.status).toBe(200)
  //   expect(response.body).toHaveProperty(
  //     'message',
  //     'success forgot password'
  //   )
  //   expect(response.body).toHaveProperty('data')
  // })
})
