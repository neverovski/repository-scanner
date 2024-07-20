import { Inject } from '@nestjs/common';

import { GitHubInjectEnum, IGitHubService } from '@app/providers/github';

import { IRepository, IRepositoryService } from './interface';

export class RepositoryService implements IRepositoryService {
  constructor(
    @Inject(GitHubInjectEnum.SERVICE)
    private readonly service: IGitHubService,
  ) {}

  getList(): Promise<IRepository[]> {
    return this.service.getRepositoryList();
  }

  getOneByName(name: NameType): Promise<IRepository | null> {
    return this.service.getRepositoryDetail(name);
  }
}
