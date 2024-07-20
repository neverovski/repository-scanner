import { InternalServerErrorException } from '@nestjs/common';
import fetchMock from 'jest-fetch-mock';

import { RequestUtil } from '@app/utils/request.util';

import { RequestUtilMock } from '../../__mocks__/utils/request.util.mock';

describe('RequestUtil class', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('GET method', () => {
    const { body, url, headers } = RequestUtilMock.github;

    it('Valid request', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(body), { headers });

      const res = await RequestUtil.get<{ login: string }>(url, { headers });

      expect(fetchMock).toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(url, { headers });
      expect(res).toHaveProperty('login');
      expect(res.login).toEqual('github');
    });

    it('Invalid request', async () => {
      fetchMock.mockReject(new InternalServerErrorException());

      await expect(RequestUtil.get(url, {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('POST method', () => {
    const { body, url, headers } = RequestUtilMock.jsonplaceholder;

    it('Valid request', async () => {
      fetchMock.mockResponseOnce(JSON.stringify(body), { headers });

      const res = await RequestUtil.post<{ userId: number }>(url, body, {
        headers,
      });

      expect(fetchMock).toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(url, {
        body: JSON.stringify(body),
        headers,
        method: 'POST',
      });
      expect(res.userId).toEqual(1);
    });

    it('Invalid request', async () => {
      fetchMock.mockReject(new InternalServerErrorException());

      await expect(RequestUtil.post(url, {})).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
