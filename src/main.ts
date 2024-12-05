import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './utils/swaggers/swagger-config';
import { UsersModule } from './users/users.module';
import { ConfigService } from '@nestjs/config';
import {v4 as uuid4} from 'uuid'
const PGK = require('../package.json')

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const configService =  app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe());
  app.use((req: any, res: any, next: any) => {
    const REQUEST_ID = 'X-Request-ID';
    const CORRELATION_ID = 'X-Correlation-ID';
    const CAUSATION_ID = 'X-Causation-ID';
    if (!req.header(REQUEST_ID)) { req.headers[REQUEST_ID] = uuid4(); }
    if (!req.header(CORRELATION_ID)) { req.headers[CORRELATION_ID] = uuid4(); }
    if (!req.header(CAUSATION_ID)) { req.headers[CAUSATION_ID] = uuid4(); }
    res.setHeader(
      REQUEST_ID,
      req.headers[REQUEST_ID] || req.header(REQUEST_ID),
    );
    res.setHeader(
      CORRELATION_ID,
      req.headers[CORRELATION_ID] || req.header(CORRELATION_ID),
    );
    res.setHeader(
      CAUSATION_ID,
      req.headers[CAUSATION_ID] || req.header(CAUSATION_ID),
    );
    next();
  });
  const swaggerService = configService.get<string>('SWAGGER_SERVICE', 'localhost:4001');
  const swaggerGateway = configService.get<string>('SWAGGER_GATEWAY', 'localhost:4000');
  swaggerConfig({app , name:'users',module: UsersModule , server:{
    gateway:swaggerGateway,
    service:swaggerService
  }})
  await app.listen(process.env.PORT ?? 3000);
  logger.verbose(`Users service listening on port ${process.env.PORT ?? 3000}`);
}
bootstrap();
