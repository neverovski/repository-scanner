import { IRepositoryContent } from '@app/common/interfaces';

export const TOKEN_KEY_GITHUB = 'Bearer';
export const API_VERSION_GITHUB = '2022-11-28';

export const CONTENT_RESPONSE_DEFAULT_GITHUB: Required<IRepositoryContent> = {
  countFiles: 0,
  ymlUrl: '',
};
