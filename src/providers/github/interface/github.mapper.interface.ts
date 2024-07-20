import { IRepository } from '@app/common/interfaces';

import { GitHubRepositoryType } from '../github.type';

export interface IGitHubMapper {
  mapRepositoryDetail(
    repository?: GitHubRepositoryType | null,
  ): IRepository | null;
  mapRepositoryList(repositories: GitHubRepositoryType[]): IRepository[];
}
