import { Inject } from '@nestjs/common';
import pLimit from 'p-limit';

import { CONCURRENCY_LIMIT } from '@app/common/constants';
import { HeaderContentTypeEnum } from '@app/common/enums';
import { IRepository } from '@app/common/interfaces';
import { GitHubConfigType } from '@app/common/types';
import { GitHubConfig } from '@app/config';
import { HttpService } from '@app/core/service';
import {
  API_VERSION_GITHUB,
  CONTENT_RESPONSE_DEFAULT_GITHUB,
  TOKEN_KEY_GITHUB,
} from '@app/providers/github/github.constant';
import {
  GitHubInjectEnum,
  GitHubQueryEnum,
} from '@app/providers/github/github.enum';
import {
  GitHubRepositoryContentType,
  GitHubRepositoryType,
  GitHubRepositoryWebhookType,
} from '@app/providers/github/github.type';

import { IGitHubMapper, IGitHubService } from '../interface';

export class GitHubService extends HttpService implements IGitHubService {
  private readonly limit: pLimit.Limit = pLimit(5);

  constructor(
    @Inject(GitHubConfig.KEY)
    private readonly gitHubConfig: GitHubConfigType,

    @Inject(GitHubInjectEnum.MAPPER)
    private readonly mapper: IGitHubMapper,
  ) {
    super();

    this.limit = pLimit(CONCURRENCY_LIMIT);
  }

  protected get headers() {
    return {
      Accept: HeaderContentTypeEnum.GITHUB,
      Authorization: `${TOKEN_KEY_GITHUB} ${this.gitHubConfig.token}`,
      'X-GitHub-Api-Version': API_VERSION_GITHUB,
    };
  }

  async getRepositoryDetail(name: NameType): Promise<IRepository | null> {
    try {
      const [repository, activeWebhooks, content] = await Promise.all([
        this.limit(() => this.getRepository(name)),
        this.limit(() => this.getActiveWebhooksForRepository(name)),
        this.limit(() => this.getCountFilesAndGetYmlUrlForRepository(name)),
      ]);

      if (!repository) {
        return null;
      }

      return { ...repository, ...content, activeWebhooks };
    } catch {
      return null;
    }
  }

  async getRepositoryList(): Promise<IRepository[]> {
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

  //TODO: I'm only using the top level, for deep scanning we need to use a tree https://docs.github.com/en/rest/git/trees?apiVersion=2022-11-28#get-a-tree
  private async getCountFilesAndGetYmlUrlForRepository(
    name: NameType,
  ): Promise<Pick<IRepository, 'countFiles' | 'ymlUrl'>> {
    const urlPath = `${GitHubQueryEnum.REPOSITORY_DETAIL}/${this.gitHubConfig.userName}/${name}/${GitHubQueryEnum.REPOSITORY_CONTENT}`;

    try {
      const res = await this.getRequest<GitHubRepositoryContentType[]>(urlPath);

      return this.mapper.countFilesAndGetYmlUrlFromRepositoryContent(res);
    } catch {
      return CONTENT_RESPONSE_DEFAULT_GITHUB;
    }
  }

  private async getRepository(name: NameType) {
    const urlPath = `${GitHubQueryEnum.REPOSITORY_DETAIL}/${this.gitHubConfig.userName}/${name}`;

    try {
      const res = await this.getRequest<GitHubRepositoryType>(urlPath);

      return this.mapper.mapRepository(res);
    } catch {
      return null;
    }
  }
}
