import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ResolverCore } from '@app/core';

import { IRepositoryService } from './interface';
import { RepositoryDetailOutput, RepositoryListOutput } from './output';
import { RepositoryInjectEnum } from './repository.enum';

@Resolver(() => RepositoryListOutput)
export class RepositoryResolver extends ResolverCore {
  constructor(
    @Inject(RepositoryInjectEnum.SERVICE)
    private readonly service: IRepositoryService,
  ) {
    super();
  }

  @Query(() => RepositoryDetailOutput)
  async getRepositoryByName(
    @Args('name', { type: () => String }) name: NameType,
  ) {
    const repository = await this.service.getOneByName(name);

    return this.getEntityOrNotFound(repository);
  }

  @Query(() => [RepositoryListOutput])
  getRepositoryList() {
    return this.service.getList();
  }
}
