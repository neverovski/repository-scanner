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
  GitHubQueryEnum,
} from '@app/providers/github/github.enum';
import {
  GitHubRepositoryType,
  GitHubRepositoryWebhookType,
} from '@app/providers/github/github.type';

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
    const urlPath = `${GitHubQueryEnum.REPOSITORY_DETAIL}/${this.gitHubConfig.userName}/${name}`;

    try {
      const [repository, webhooks] = await Promise.all([
        this.getRequest<GitHubRepositoryType>(urlPath),
        this.getActiveWebhooksForRepository(name),
      ]);

      return this.mapper.mapRepositoryDetail(repository, webhooks);
    } catch {
      return null;
    }
  }

  async getRepositoryList() {
    const urlPath = GitHubQueryEnum.REPOSITORY_LIST;

    try {
      const res = await this.getRequest<GitHubRepositoryType[]>(urlPath);

      return this.mapper.mapRepositoryList(res);
    } catch {
      return [];
    }
  }

  protected createUrl(path: string | GitHubQueryEnum) {
    return `${this.gitHubConfig.url}/${path}`;
  }

  private async getActiveWebhooksForRepository(
    name: NameType,
  ): Promise<string[]> {
    const urlPath = `${GitHubQueryEnum.REPOSITORY_DETAIL}/${this.gitHubConfig.userName}/${name}/${GitHubQueryEnum.REPOSITORY_HOOK}`;

    try {
      const res = await this.getRequest<GitHubRepositoryWebhookType[]>(urlPath);

      return this.mapper.extractNamesForActiveWebhooks(res);
    } catch {
      return [];
    }
  }
}
