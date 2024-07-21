import { IRepository } from '@app/common/interfaces';

import {
  GitHubRepositoryType,
  GitHubRepositoryWebhookType,
} from '../github.type';
import { IGitHubMapper } from '../interface';

export class GitHubMapper implements IGitHubMapper {
  extractNamesForActiveWebhooks(
    webhooks: GitHubRepositoryWebhookType[],
  ): string[] {
    return webhooks.reduce<string[]>((acc, item) => {
      if (item.active) {
        acc.push(item.name);
      }

      return acc;
    }, []);
  }

  mapRepositoryDetail(
    repository: GitHubRepositoryType | null,
    activeWebhooks?: string[],
  ): IRepository | null {
    if (!repository?.name || !repository?.owner?.login) {
      return null;
    }

    return {
      activeWebhooks: activeWebhooks || [],
      name: repository.name,
      owner: repository.owner.login,
      size: repository.size ?? 0,
      private: repository.private,
    };
  }

  mapRepositoryList(repositories: GitHubRepositoryType[]): IRepository[] {
    return repositories.reduce<IRepository[]>((acc, item) => {
      const repository = this.mapRepositoryDetail(item);

      if (repository) {
        acc.push(repository);
      }

      return acc;
    }, []);
  }
}
