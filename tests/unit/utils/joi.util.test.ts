import { ENV_DEV } from '@app/common/constants';
import { ConfigTokenEnum } from '@app/common/enums';
import { AppConfigType, JoiConfigType } from '@app/common/types';
import { JoiUtil } from '@app/utils/joi.util';

describe('JoiUtil class', () => {
  const config: JoiConfigType<AppConfigType> = {
    env: {
      value: ENV_DEV,
      joi: JoiUtil.schema.string(),
    },
    name: {
      value: 'APP',
      joi: JoiUtil.schema.string(),
    },
    port: {
      value: 5656,
      joi: JoiUtil.schema.number(),
    },
  };

  describe('extractByPropName method', () => {
    it('Should be correct', () => {
      expect(JoiUtil.extractByPropName(config, 'joi')).toHaveProperty('env');
      expect(JoiUtil.extractByPropName(config, 'joi')).toHaveProperty('name');
      expect(JoiUtil.extractByPropName(config, 'joi')).toHaveProperty('port');

      expect(JoiUtil.extractByPropName(config, 'value')).toEqual({
        env: config.env.value,
        name: config.name.value,
        port: config.port.value,
      });
    });
  });

  describe('validate method', () => {
    it('Should be correct', () => {
      expect(JoiUtil.validate(ConfigTokenEnum.APP, config)).toEqual({
        env: config.env.value,
        name: config.name.value,
        port: config.port.value,
      });
    });
  });
});
