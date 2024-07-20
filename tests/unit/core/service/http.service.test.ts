import { HttpExternalException } from '@app/common/exceptions';
import { HttpService } from '@app/core/service';
import { RequestUtil } from '@app/utils/request.util';

import mocked = jest.mocked;

jest.mock('@app/utils/request.util');

describe('HttpService class', () => {
  let httpService: HttpService;

  class HttpServiceTestImpl extends HttpService {
    protected createUrl(url: string): string {
      return url;
    }
  }

  const mockedGet = mocked(RequestUtil.get);

  beforeEach(() => {
    mockedGet.mockClear();
    httpService = new HttpServiceTestImpl();
  });

  describe('getRequest method', () => {
    it('should handle response', async () => {
      const urlPath = 'https://github.com';
      const expectedResult = { data: 'login' };

      mockedGet.mockResolvedValue(expectedResult);

      const result = await httpService.getRequest(urlPath);

      expect(result).toEqual(expectedResult.data);
      expect(mockedGet).toHaveBeenCalledTimes(1);
      expect(mockedGet).toHaveBeenCalledWith(urlPath, { headers: {} });
    });

    it('should handle error', async () => {
      const urlPath = 'https://github.com';
      const errorMock = new Error('some error');

      mockedGet.mockRejectedValue(errorMock);

      await expect(httpService.getRequest(urlPath)).rejects.toThrow(
        HttpExternalException,
      );
      expect(mockedGet).toHaveBeenCalledTimes(1);
      expect(mockedGet).toHaveBeenCalledWith(urlPath, { headers: {} });
    });
  });
});
