import { registerAs } from '@nestjs/config';

import {
  ENV_DEV,
  ENV_PROD,
  ENV_TEST,
  PORT_DEFAULT,
} from '@app/common/constants';
import { ConfigTokenEnum } from '@app/common/enums';
import { AppConfigType, JoiConfigType } from '@app/common/types';
import { JoiUtil } from '@app/utils';

export const AppConfig = registerAs<AppConfigType>(ConfigTokenEnum.APP, () => {
  const configs: JoiConfigType<AppConfigType> = {
    env: {
      value: process.env.NODE_ENV,
      joi: JoiUtil.schema
        .string()
        .valid(ENV_DEV, ENV_PROD, ENV_TEST)
        .allow(null, '')
        .default(ENV_DEV),
    },
    name: {
      value: process.env.APP_NAME,
      joi: JoiUtil.schema.string().allow(null, '').default(''),
    },
    port: {
      value: process.env.APP_PORT,
      joi: JoiUtil.schema.number().allow(null, '').default(PORT_DEFAULT),
    },
  };

  return JoiUtil.validate(ConfigTokenEnum.APP, configs);
});
