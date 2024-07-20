import joi, { SchemaMap } from 'joi';

import { ConfigTokenEnum } from '@app/common/enums';
import { ConfigPropsType, JoiConfigType } from '@app/common/types';

export class JoiUtil {
  static get schema() {
    return joi;
  }

  static extractByPropName<T, R = T>(
    config: JoiConfigType<T>,
    propName: keyof ConfigPropsType,
  ): R {
    return Object.keys(config).reduce((prop, key) => {
      if (config?.[key]?.[propName]) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        prop[key] = config?.[key]?.[propName];
      }

      return prop;
    }, {} as R);
  }

  // NOTE: may be change type for name?
  static validate<T>(name: ConfigTokenEnum, config: JoiConfigType<T>): T {
    const schemaObj = JoiUtil.extractByPropName<T, SchemaMap<T>>(config, 'joi');
    const values = JoiUtil.extractByPropName(config, 'value');
    const schema = JoiUtil.schema.object(schemaObj);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error, value } = schema.validate(values, { abortEarly: false });

    if (error) {
      throw new Error(JoiUtil.transformError(name, error));
    }

    return value as T;
  }

  private static transformError(
    name: ConfigTokenEnum,
    error?: joi.ValidationError,
  ) {
    const key = error?.details?.[0]?.context?.key || '';
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = error?.details?.[0]?.context?.value || '';
    const message = error?.message || '';

    if (key) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      return `Wrong "${name}.${key}" variable; Value: "${value}" is invalid. ${message}`;
    }

    return `Validation failed - Is there an environment variable missing? ${message}`;
  }
}
