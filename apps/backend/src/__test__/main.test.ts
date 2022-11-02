import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import helmet from 'helmet';

import config from '../app/config/config';

import AppExceptionsFilter from '@app/utils/app.exceptions.filter';
import ResponseInterceptor from '@app/utils/app.response.interceptor';
import AppValidationPipe from '@app/utils/app.validation.pipe';

import AppModule from '../app/app.module';

export default async function ApplicationTestModule() {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();

  const adapter = app.get(HttpAdapterHost);
  const exceptionFilter = new AppExceptionsFilter(adapter, {
    isDebug: config.app.debug,
  });

  app.useGlobalFilters(exceptionFilter);
  app.enableShutdownHooks();
  app.setGlobalPrefix(config.server.route_prefix);

  const defaultValidatorPipe = new ValidationPipe({ transform: true });
  const customValidatorPipe = new AppValidationPipe();

  app.useGlobalPipes(defaultValidatorPipe, customValidatorPipe);

  const responseInterceptor = new ResponseInterceptor();
  app.useGlobalInterceptors(responseInterceptor);

  app.enableCors(config.server.cors);
  app.use(helmet());

  await app.init();
  return app;
}
