import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { bodyParser: false },
    );
  // await app.listen(3020);
  const config=app.get(ConfigService)
  if (config.get('NODE_ENV') === 'development') {
    const options = new DocumentBuilder()
      .setTitle('medium-backend-api')
      .setDescription('medium backend apis')
      .setVersion('1.0')
      // .addServer(config.get('SERVER'))
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  await app.listen(config.get('PORT')||3020);
  console.log(`app is running on the port:${config.get('PORT')}`);
}
bootstrap();
