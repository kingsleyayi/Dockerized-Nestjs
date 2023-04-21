import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appDataSource from './config/database/database';
import { RoomModule } from './room/room.module';
import entities from './typeorm/index.typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        entities,
        synchronize: true,
      }),
      dataSourceFactory: async () => {
        const dataSource = appDataSource.initialize();
        return dataSource;
      },
    }),
    UserModule,
    RoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
