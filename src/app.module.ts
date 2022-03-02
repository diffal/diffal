import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { TestBedModule } from './test-bed/test-bed.module';
import { Management1Module } from './management1/management1.module';
import { Management2Module } from './management2/management2.module';
import { Management3Module } from './management3/management3.module';
import { Management4Module } from './management4/management4.module';
import { Management5Module } from './management5/management5.module';
import { Management6Module } from './management6/management6.module';

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
    Management1Module,
    Management2Module,
    Management3Module,
    Management4Module,
    Management5Module,
    Management6Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
