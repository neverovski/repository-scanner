import { Inject, LoggerService as LoggerServiceNestJs } from '@nestjs/common';
import { DestinationStream, Level, TransportSingleOptions, pino } from 'pino';

import { ENV_PROD, ENV_TEST } from '@app/common/constants';
import { LogLevelEnum } from '@app/common/enums';
import { AppConfigType, LoggerConfigType } from '@app/common/types';
import { AppConfig, LoggerConfig } from '@app/config';

import { PRETTY_PRINT, SETTING_PINO } from './logger.constant';

export class LoggerService implements LoggerServiceNestJs {
  private readonly logger: pino.Logger;

  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: AppConfigType,
    @Inject(LoggerConfig.KEY)
    private readonly loggerConfig: LoggerConfigType,
  ) {
    this.logger = this.init();
  }

  private get options() {
    const transport: TransportSingleOptions = this.getTransportConsole();
    const stream: DestinationStream | null = null;

    return { transport, stream };
  }

  debug?(message: string, ...optionalParams: any[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(LogLevelEnum.DEBUG, message, optionalParams);
    }
  }

  error(message: string, ...optionalParams: any[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(LogLevelEnum.ERROR, message, optionalParams);
    }
  }

  log(message: string, ...optionalParams: any[]) {
    if (this.appConfig.env !== ENV_TEST && this.appConfig.env !== ENV_PROD) {
      this.call(LogLevelEnum.INFO, message, optionalParams);
    }
  }

  verbose?(message: string, ...optionalParams: any[]) {
    if (this.appConfig.env !== ENV_TEST && this.appConfig.env !== ENV_PROD) {
      this.call(LogLevelEnum.TRACE, message, optionalParams);
    }
  }

  warn(message: string, ...optionalParams: any[]) {
    if (this.appConfig.env !== ENV_TEST) {
      this.call(LogLevelEnum.WARN, message, optionalParams);
    }
  }

  protected init(): pino.Logger {
    const { stream, transport } = this.options;

    if (stream) {
      return pino(
        {
          ...SETTING_PINO,
          level: LogLevelEnum.TRACE,
          name: this.appConfig.name,
          enabled: this.loggerConfig.enabled,
        },
        stream,
      );
    }

    return pino({
      ...SETTING_PINO,
      level: LogLevelEnum.TRACE,
      name: this.appConfig.name,
      enabled: this.loggerConfig.enabled,
      transport,
    });
  }

  private call(level: Level, message: string, ...optionalParams: any[]) {
    let params: Record<string, any> = {};
    let args: any[] = [];
    const context: string[] = [];

    if (optionalParams.length !== 0) {
      optionalParams[optionalParams.length - 1]?.forEach(
        (item: string | object) => {
          if (typeof item === 'string') {
            context.push(item);
          } else if (typeof item === 'object') {
            params = { ...params, ...item };
          }
        },
      );

      args = optionalParams.slice(0, -1);
    }

    this.logger[level](
      { levelName: level, context, ...params },
      message,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...args,
    );
  }

  private getTransportConsole(): TransportSingleOptions {
    return {
      target: 'pino-pretty',
      options: { destination: 1, ...PRETTY_PRINT },
    };
  }
}
