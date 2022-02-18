import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'public'));
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}
bootstrap();
