import { IRepository } from '@app/common/interfaces';

import { GitHubRepositoryType } from '../github.type';
import { IGitHubMapper } from '../interface';

export class GitHubMapper implements IGitHubMapper {
  mapRepositoryDetail(
    repository?: GitHubRepositoryType | null,
  ): IRepository | null {
    if (!repository?.name || !repository?.owner?.login) {
      return null;
    }

    return {
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
