import { IRepository } from '@app/common/interfaces';

import {
  GitHubRepositoryType,
  GitHubRepositoryWebhookType,
} from '../github.type';

export interface IGitHubMapper {
  extractNamesForActiveWebhooks(
    webhooks: GitHubRepositoryWebhookType[],
  ): string[];
  mapRepositoryDetail(
    repository: GitHubRepositoryType | null,
    activeWebhooks?: string[],
  ): IRepository | null;
  mapRepositoryList(repositories: GitHubRepositoryType[]): IRepository[];
}
