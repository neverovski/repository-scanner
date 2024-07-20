import { registerAs } from '@nestjs/config';

import { GITHUB_URL_DEFAULT } from '@app/common/constants';
import { ConfigTokenEnum } from '@app/common/enums';
import { GitHubConfigType, JoiConfigType } from '@app/common/types';
import { JoiUtil } from '@app/utils';

export const GitHubConfig = registerAs<GitHubConfigType>(
  ConfigTokenEnum.GITHUB,
  () => {
    const configs: JoiConfigType<GitHubConfigType> = {
      token: {
        value: process.env.GITHUB_TOKEN,
        joi: JoiUtil.schema.string(),
      },
      url: {
        value: process.env.GITHUB_URL,
        joi: JoiUtil.schema
          .string()
          .allow(null, '')
          .default(GITHUB_URL_DEFAULT),
      },
      userName: {
        value: process.env.GITHUB_USER_NAME,
        joi: JoiUtil.schema.string(),
      },
    };

    return JoiUtil.validate(ConfigTokenEnum.GITHUB, configs);
  },
);
