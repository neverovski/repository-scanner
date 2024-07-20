import { NestFactory } from '@nestjs/core';

import { AppConfigType } from '@app/common/types';
import { AppConfig } from '@app/config';
import { LoggerService } from '@app/providers/logger/logger.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigType = app.get(AppConfig.KEY);

  app.useLogger(app.get(LoggerService));

  await app.listen(appConfig.port);
}

void bootstrap();
