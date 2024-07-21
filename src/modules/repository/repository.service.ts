import { Inject } from '@nestjs/common';

import { IRepository } from '@app/common/interfaces';
import { GitHubInjectEnum, IGitHubService } from '@app/providers/github';

import { IRepositoryService } from './interface';

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
