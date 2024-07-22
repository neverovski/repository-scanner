import { IRepository, IRepositoryContent } from '@app/common/interfaces';
import { CONTENT_RESPONSE_DEFAULT_GITHUB } from '@app/providers/github/github.constant';

import {
  GitHubRepositoryContentType,
  GitHubRepositoryType,
  GitHubRepositoryWebhookType,
} from '../github.type';
import { IGitHubMapper } from '../interface';

export class GitHubMapper implements IGitHubMapper {
  countFilesAndGetYmlUrlFromRepositoryContent(
    contents?: GitHubRepositoryContentType[],
  ): IRepositoryContent {
    if (!contents?.length) {
      return CONTENT_RESPONSE_DEFAULT_GITHUB;
    }

    return contents.reduce<Required<IRepositoryContent>>(
      this.processContentItem,
      { countFiles: 0, ymlUrl: '' },
    );
  }

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

  mapRepository(repository: GitHubRepositoryType | null): IRepository | null {
    if (!repository?.name || !repository?.owner?.login) {
      return null;
    }

    return {
      name: repository.name,
      owner: repository.owner.login,
      size: repository.size ?? 0,
      private: repository.private,
      activeWebhooks: [],
    };
  }

  mapRepositoryList(repositories: GitHubRepositoryType[]): IRepository[] {
    return repositories.reduce<IRepository[]>((acc, item) => {
      const repository = this.mapRepository(item);

      if (repository) {
        acc.push(repository);
      }

      return acc;
    }, []);
  }

  private processContentItem(
    acc: Required<IRepositoryContent>,
    content: GitHubRepositoryContentType,
  ): Required<IRepositoryContent> {
    if (content.type !== 'file') {
      return acc;
    }

    acc.countFiles += 1;

    if (content.path.includes('.yml') && !acc.ymlUrl) {
      acc.ymlUrl = content.download_url;
    }

    return acc;
  }
}
