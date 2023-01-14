const request = require('supertest');
require('dotenv').config();

const app = require('../app');
const {connectDB, disconnectDB} = require('../db/connect');
const User = require('../models/auth');

describe('TEST e-commerce', () => {
    beforeAll(async () => {
        await connectDB(process.env.MONGO_URL);
        jest.setTimeout(40000);
    });

    afterAll( async () => {
       try{
             const testData = await User.findOne().sort('-_id').limit(1);
             await User.deleteOne(testData);
             await disconnectDB(); 
    } catch(error){
        console.error('Unable to disconnect from database', error);
    }finally {
           setTimeout(() => {process.exit(0)}, 20000);
    }
    });

    //Auth test 
    describe('TEST POST/auth/register', () => {
        const responseBody = {
            "name": "Alex",
            "email": "alex@gmail.com",
            "password": "Secret"
    }
    const incompleteResponseBody = {
        "name" : "Alex",
        "password": "Secret"
    }

        test('it should respond with 201 created', async () => {

                            await request(app)
                             .post('/api/v1/auth/register')
                             .send(responseBody)
                             .expect('Content-Type', /json/)
                             .expect(201);

        });

        test('it should respond with 400 bad request ', async () => {
                const response = await request(app)
                                  .post('/api/v1/auth/register')
                                  .send(incompleteResponseBody)
                                  .expect('Content-Type', /json/)
                                  .expect(500);

            expect(response.body).toStrictEqual({'msg': 'User validation failed: email: Email must be filled'});
        });
    });

    describe('TEST POST/auth/login', () => {
       const correctUserLogin = {
            "email": "alex@gmail.com", 
            "password": "Secret"
        };
        const incorrectUserLogin = {
            "email" : "alex@gmail.com", 
            "password": "Secr"
        };
        const incompleteDetails = {
            "passowrd": "Secret"
        }
        test('it should respond with 201 created', async () => {
                        await request(app)
                              .post('/api/v1/auth/login')
                              .send(correctUserLogin)
                              .expect('Content-Type', /json/)
                              .expect(201);
        });

        test('it should respond with 400 bad request', async () => {
                        const response = await request(app)
                                                .post('/api/v1/auth/login')
                                                .send(incompleteDetails)
                                                .expect('Content-Type', /json/)
                                                .expect(400);

                        expect(response.body).toStrictEqual({'msg': 'Please provide all neccessary details'});
        });
        
        test('it should respond with 400 bad request', async () => {
            const response = await request(app)
                                    .post('/api/v1/auth/login')
                                    .send(incorrectUserLogin)
                                    .expect('Content-Type', /json/)
                                    .expect(400);
            expect(response.body).toStrictEqual({'msg': 'Invalid credentials! X'});
        });
    });

    //Product test 

    describe('Test products Endpoint', () => {
        test('it should respond with 200 Ok', async () => {
                    await request(app)
                          .get('/api/v1/products')
                          .expect('Content-Type', /json/)
                          .expect(200);
        });
    });

})