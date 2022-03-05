import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { TestBedModule } from './test-bed/test-bed.module';
import { LogRequestModule } from './log-request/log-request.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogRequestInterceptor } from './common/interceptors/log-request.interceptor';

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
    LogRequestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogRequestInterceptor,
    },
  ],
})
export class AppModule { }
