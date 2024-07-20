import { HeaderContentTypeEnum, HeaderKeyEnum } from '@app/common/enums';
import { RequestCtxType } from '@app/common/types';

export class RequestUtil {
  static get<T>(url: string, ctx?: RequestCtxType): Promise<T> {
    return this.send<T>(url, HeaderContentTypeEnum.JSON, ctx) as Promise<T>;
  }

  static post<T>(url: string, data: any, ctx?: RequestCtxType): Promise<T> {
    return this.send<T>(url, HeaderContentTypeEnum.JSON, {
      ...ctx,
      method: 'POST',
      body: JSON.stringify(data),
    }) as Promise<T>;
  }

  private static async getError<T>(response: Response): Promise<Error> {
    const message = {
      status: response.status,
      text: await this.parseResponse<T>(response),
    };

    return new Error(JSON.stringify(message));
  }

  private static parseResponse<T>(response: Response): Promise<string | T> {
    const contentType = response.headers
      .get(HeaderKeyEnum.CONTENT_TYPE)
      ?.toLowerCase();

    if (contentType?.includes(HeaderContentTypeEnum.JSON)) {
      return response.json() as Promise<T>;
    }

    return response.text();
  }

  private static async send<T>(
    url: string,
    contentType: HeaderContentTypeEnum,
    ctx?: RequestCtxType,
  ): Promise<string | T> {
    const res = await fetch(url, {
      ...ctx,
      headers: { 'Content-Type': contentType, ...ctx?.headers },
    });

    if (!res.ok) {
      throw await this.getError<T>(res);
    }

    return this.parseResponse<T>(res);
  }
}
