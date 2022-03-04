import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Our Api Specification')
    .setVersion('1.0.0')
    .setDescription('Our Api Description')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  app.useStaticAssets(join(__dirname, 'public'));
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
bootstrap();
