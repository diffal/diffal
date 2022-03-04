import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { TestBedModule } from './test-bed/test-bed.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [dbConfig.KEY],
      useFactory: (dbConfigService: ConfigType<typeof dbConfig>) => {
        if (dbConfigService.databaseUrl) {
          return {
            type: dbConfigService.type as any,
            url: dbConfigService.databaseUrl,
          };
        } else {
          return {
            type: dbConfigService.type as any,
            host: dbConfigService.host,
            port: dbConfigService.port,
            username: dbConfigService.userName,
            password: dbConfigService.password,
            database: dbConfigService.database,
            synchronize: true,
            autoLoadEntities: true,
            ...(dbConfigService.extra && {
              extra: JSON.parse(dbConfigService.extra),
            }),
          };
        }
      },
    }),
    TestBedModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
