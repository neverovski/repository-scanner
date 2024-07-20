import {
  ENV_FILENAME,
  ENV_TEST,
  ENV_TEST_FILENAME,
} from '@app/common/constants';

export class PathUtil {
  static getEnvFilePath(): string {
    const envFilename = this.getEnvFileName();

    return `${process.cwd()}/${envFilename}`;
  }

  private static getEnvFileName(): string {
    switch (process?.env?.NODE_ENV) {
      case ENV_TEST:
        return ENV_TEST_FILENAME;
      default:
        return ENV_FILENAME;
    }
  }
}
