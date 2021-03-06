import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggerModule } from './logger/logger.module';
import * as hbs from 'hbs';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const myLogger = await app.resolve<LoggerService>(LoggerService);
  app.useLogger(myLogger);

  const options = new DocumentBuilder()
    .setTitle('Our Api Specification')
    .setVersion('1.0.0')
    .setDescription('Our Api Description')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
bootstrap();
