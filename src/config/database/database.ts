import { DataSource } from 'typeorm';
import entities from '../../typeorm/index.typeorm';
import {
  nodeEnv,
  testDatabaseHost,
  databaseHost,
  testDatabasePort,
  databasePort,
  testDatabaseUsername,
  databaseUsername,
  testDatabasePassword,
  databasePassword,
  testDatabaseName,
  databaseName,
} from '../config';

const appDataSource = new DataSource({
  type: 'mysql',
  host: nodeEnv === 'test' ? testDatabaseHost : databaseHost,
  port: nodeEnv === 'test' ? testDatabasePort : databasePort,
  username: nodeEnv === 'test' ? testDatabaseUsername : databaseUsername,
  password: nodeEnv === 'test' ? testDatabasePassword : databasePassword,
  database: nodeEnv === 'test' ? testDatabaseName : databaseName,
  entities,
  synchronize: true,
});

export default appDataSource;
