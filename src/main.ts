import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggerModule } from './logger/logger.module';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true, //to make sure all logs will be buffered until a custom logger is attached (MyLogger in this case) and the application initialisation process either completes or fails
  });
  app.useLogger(app.get(LoggerModule));

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
