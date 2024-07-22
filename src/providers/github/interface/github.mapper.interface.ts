import { IRepository, IRepositoryContent } from '@app/common/interfaces';

import {
  GitHubRepositoryContentType,
  GitHubRepositoryType,
  GitHubRepositoryWebhookType,
} from '../github.type';

export interface IGitHubMapper {
  countFilesAndGetYmlUrlFromRepositoryContent(
    contents?: GitHubRepositoryContentType[],
  ): IRepositoryContent;
  extractNamesForActiveWebhooks(
    webhooks: GitHubRepositoryWebhookType[],
  ): string[];
  mapRepository(repository: GitHubRepositoryType | null): IRepository | null;
  mapRepositoryList(repositories: GitHubRepositoryType[]): IRepository[];
}
