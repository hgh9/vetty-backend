declare const module: any;
import { NestFactory } from '@nestjs/core';
import { RedisIoAdapter } from '../adapters/redis.adapter';
import { AppModule } from './app.module';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { winstonSetting } from '../config/winston.config';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { swaggerSetting } from '../config/swagger.config';
import config from '@configs';

async function nestFactoryCreate() {
  const server = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    winstonSetting,
  );

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  app.useWebSocketAdapter(redisIoAdapter);

  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  return app;
}

async function bootstrap() {
  const logger = new Logger();

  const app = await nestFactoryCreate();

  if (1) {
    swaggerSetting(app);
  }

  const port = config().NEST.PORT;
  await app.listen(port || 3002);
  logger.log(`Application running on port:: ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
