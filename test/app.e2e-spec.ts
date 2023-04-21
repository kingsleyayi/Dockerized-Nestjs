import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { clearDb, dataSource } from './helper/test.helper';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

const SECONDS = 1000;
jest.setTimeout(70 * SECONDS);

describe('App e2e test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await dataSource.initialize();
    await clearDb();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  let userToken, secondUserToken, roomId;

  describe('App api features', () => {
    it('Should Register User first user', async () => {
      return request(app.getHttpServer())
        .post('/user/register')
        .send({
          email: 'test1@gmail.com',
          name: 'test user one',
          password: 'user1234',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('user');
        });
    });

    it('Should Register User second user', async () => {
      return request(app.getHttpServer())
        .post('/user/register')
        .send({
          email: 'test2@gmail.com',
          name: 'test user second',
          password: 'user1234',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('user');
        });
    });

    it('Should Login first user', async () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: 'test1@gmail.com',
          password: 'user1234',
        })
        .expect(200)
        .then((res) => {
          userToken = res.body.token;
        });
    });

    it('Should Login second user', async () => {
      return request(app.getHttpServer())
        .post('/user/login')
        .send({
          email: 'test2@gmail.com',
          password: 'user1234',
        })
        .expect(200)
        .then((res) => {
          secondUserToken = res.body.token;
        });
    });

    it('Should fetch user details', async () => {
      return request(app.getHttpServer())
        .get('/user/fetch-user')
        .set('Authorization', userToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('id');
        });
    });

    it('User One should create and join room', async () => {
      return request(app.getHttpServer())
        .post('/room/create-room')
        .set('Authorization', userToken)
        .send({
          name: 'test room',
          description: 'the test room',
        })
        .expect(200)
        .then((res) => {
          roomId = res.body.id;
        });
    });

    it('User two should join', async () => {
      return request(app.getHttpServer())
        .put(`/room/join-room/${roomId}`)
        .set('Authorization', secondUserToken)
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('id');
        });
    });

    it('Should send message', async () => {
      return request(app.getHttpServer())
        .post('/room/send-message')
        .set('Authorization', userToken)
        .send({
          roomId: roomId,
          message: 'test message',
        })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body).toHaveProperty('message');
        });
    });

    it('Should get room message', async () => {
      return request(app.getHttpServer())
        .get(`/room/room-message/${roomId}`)
        .set('Authorization', userToken)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy();
        });
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
