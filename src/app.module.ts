import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dbConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { TestBedModule } from './test-bed/test-bed.module';
import { PostModule } from './post/post.module';
import { CategoriesModule } from './categories/categories.module';
import { APP_FILTER } from '@nestjs/core';
import { LogExceptionFilter } from './common/filter/log-exception.filter';
import { UploadModule } from './upload/upload.module';
import { LogRequestModule } from './log-request/log-request.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogRequestInterceptor } from './common/interceptors/log-request.interceptor';
import { LoggerModule } from './logger/logger.module';
import { Management1Module } from './management1/management1.module';
import { Management2Module } from './management2/management2.module';
import { Management3Module } from './management3/management3.module';
import { Management4Module } from './management4/management4.module';
import { Management5Module } from './management5/management5.module';
import { Management6Module } from './management6/management6.module';
import { ExceptionLogModule } from './logger/exception-log.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CrawlModule } from './crawl/crawl.module';

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
            logging: false,
            autoLoadEntities: true,
            ...(dbConfigService.extra && {
              extra: JSON.parse(dbConfigService.extra),
            }),
          };
        }
      },
    }),
    TestBedModule,
    PostModule,
    CategoriesModule,
    LoggerModule,
    UploadModule,
    Management1Module,
    Management2Module,
    Management3Module,
    Management4Module,
    Management5Module,
    Management6Module,
    ExceptionLogModule,
    LogRequestModule,
    LoggerModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LogRequestInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: LogExceptionFilter,
    },
  ],
})
export class AppModule {}
