import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';

import { PathUtil } from '@app/utils';

import { AppConfig } from './app.config';
import { LoggerConfig } from './logger.config';

@Module({
  imports: [
    ConfigModuleNest.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: PathUtil.getEnvFilePath(),
      load: [AppConfig, LoggerConfig],
    }),
  ],
})
export class ConfigModule {}
