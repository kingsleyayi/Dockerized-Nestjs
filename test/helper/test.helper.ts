import {
  testDatabaseHost,
  testDatabasePort,
  testDatabaseUsername,
  testDatabasePassword,
  testDatabaseName,
  nodeEnv,
} from '../../src/config/config';
import entities, {
  Room,
  RoomMembers,
  RoomMessage,
  Users,
} from '../../src/typeorm/index.typeorm';
import { DataSource, Not } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: testDatabaseHost,
  port: Number(testDatabasePort),
  username: testDatabaseUsername,
  password: testDatabasePassword,
  database: testDatabaseName,
  entities,
  synchronize: true,
});

export const clearDb = async () => {
  if (nodeEnv == 'test') {
    await dataSource.getRepository(RoomMembers).delete({ id: Not(0) });
    await dataSource.getRepository(RoomMessage).delete({ id: Not(0) });
    await dataSource.getRepository(Room).delete({ id: Not(0) });
    await dataSource.getRepository(Users).delete({ id: Not(0) });
  }
};
