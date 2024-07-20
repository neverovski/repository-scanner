import type { Schema } from 'joi';

import { ENV_DEV, ENV_PROD, ENV_TEST } from '@app/common/constants';

import { LogClientEnum } from '../enums';

export type ConfigPropsType = {
  joi: Schema;
  value: unknown;
};

export type JoiConfigType<T> = Record<keyof T, ConfigPropsType>;

export type AppConfigType = {
  env: typeof ENV_DEV | typeof ENV_PROD | typeof ENV_TEST;
  name: string;
  port: number;
};

export type GitHubConfigType = {
  token: string;
  url: string;
  userName: string;
};

export type LoggerConfigType = {
  client: LogClientEnum;
  enabled: boolean;
};
