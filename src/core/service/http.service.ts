import { Logger } from '@nestjs/common';

import { HttpExternalException } from '@app/common/exceptions';
import { RequestUtil } from '@app/utils';

export abstract class HttpService {
  private readonly logger = new Logger(this.constructor.name);

  protected get headers() {
    return {};
  }

  async getRequest<T>(urlPath: string) {
    const url = this.createUrl(urlPath);
    const headers = this.headers;

    try {
      this.logger.debug('getRequest', { url, headers });

      const res = await RequestUtil.get<T>(url, { headers });

      return this.handleResponse(res);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  protected handleError(err: unknown) {
    this.logger.error('Error', { err });

    return new HttpExternalException();
  }

  protected handleResponse<T>(res: T): T;
  protected handleResponse<T>(res: T): T | null;
  protected handleResponse<T>(res: T): T | null {
    if (!res) {
      throw new HttpExternalException();
    }

    return (res as unknown as { data: T }).data || res;
  }

  protected abstract createUrl(path: string): string;
}
