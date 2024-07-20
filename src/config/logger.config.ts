import { registerAs } from '@nestjs/config';

import { LOG_ENABLED_DEFAULT } from '@app/common/constants';
import { ConfigTokenEnum, LogClientEnum } from '@app/common/enums';
import { JoiConfigType, LoggerConfigType } from '@app/common/types';
import { JoiUtil } from '@app/utils';

export const LoggerConfig = registerAs<LoggerConfigType>(
  ConfigTokenEnum.LOGGER,
  () => {
    const configs: JoiConfigType<LoggerConfigType> = {
      client: {
        value: process.env.LOG_CLIENT,
        joi: JoiUtil.schema
          .string()
          .valid(LogClientEnum.CONSOLE)
          .allow(null, '')
          .default(LogClientEnum.CONSOLE),
      },
      enabled: {
        value: process.env.LOG_ENABLED,
        joi: JoiUtil.schema
          .boolean()
          .allow(null, '')
          .default(LOG_ENABLED_DEFAULT),
      },
    };

    return JoiUtil.validate(ConfigTokenEnum.LOGGER, configs);
  },
);
