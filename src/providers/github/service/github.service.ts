import { Inject } from '@nestjs/common';

import { HeaderContentTypeEnum } from '@app/common/enums';
import { GitHubConfigType } from '@app/common/types';
import { GitHubConfig } from '@app/config';
import { HttpService } from '@app/core/service';
import {
  API_VERSION_GITHUB,
  TOKEN_KEY_GITHUB,
} from '@app/providers/github/github.constant';
import {
  GitHubInjectEnum,
  GitHubPathEnum,
} from '@app/providers/github/github.enum';
import { GitHubRepositoryType } from '@app/providers/github/github.type';

import { IGitHubMapper, IGitHubService } from '../interface';

export class GitHubService extends HttpService implements IGitHubService {
  constructor(
    @Inject(GitHubConfig.KEY)
    private readonly gitHubConfig: GitHubConfigType,

    @Inject(GitHubInjectEnum.MAPPER)
    private readonly mapper: IGitHubMapper,
  ) {
    super();
  }

  protected get headers() {
    return {
      Accept: HeaderContentTypeEnum.GITHUB,
      Authorization: `${TOKEN_KEY_GITHUB} ${this.gitHubConfig.token}`,
      'X-GitHub-Api-Version': API_VERSION_GITHUB,
    };
  }

  async getRepositoryDetail(name: NameType) {
    const urlPath = `${GitHubPathEnum.REPOSITORY_DETAIL}/${this.gitHubConfig.userName}/${name}`;

    try {
      const res = await this.getRequest<GitHubRepositoryType>(urlPath);

      return this.mapper.mapRepositoryDetail(res);
    } catch {
      return null;
    }
  }

  async getRepositoryList() {
    const urlPath = GitHubPathEnum.REPOSITORY_LIST;

    try {
      const res = await this.getRequest<GitHubRepositoryType[]>(urlPath);

      return this.mapper.mapRepositoryList(res);
    } catch {
      return [];
    }
  }

  protected createUrl(path: string | GitHubPathEnum) {
    return `${this.gitHubConfig.url}/${path}`;
  }
}
