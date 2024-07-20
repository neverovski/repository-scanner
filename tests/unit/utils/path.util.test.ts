import * as nodePath from 'node:path';

import {
  ENV_FILENAME,
  ENV_TEST,
  ENV_TEST_FILENAME,
} from '@app/common/constants';
import { PathUtil } from '@app/utils/path.util';

const mockedEnv = Object.assign({}, process.env);

jest.mock('path', () => ({
  resolve: jest.fn(),
}));

describe('PathUtil class', () => {
  afterEach(() => {
    process.env = mockedEnv;
  });

  describe('getEnvFilePath method', () => {
    it('should return path to .env.testing', () => {
      process.env.NODE_ENV = ENV_TEST;

      const result = PathUtil.getEnvFilePath();
      const expected = nodePath.resolve(process.cwd(), ENV_TEST_FILENAME);

      expect(result).toEqual(expected);
    });

    it('should return path to .env', () => {
      delete process.env.NODE_ENV;

      const result = PathUtil.getEnvFilePath();
      const expected = nodePath.resolve(process.cwd(), ENV_FILENAME);

      expect(result).toEqual(expected);
    });
  });
});
