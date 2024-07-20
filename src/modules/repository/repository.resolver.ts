import { Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ResolverCore } from '@app/core';

import { RepositoryDetailOutputDto, RepositoryListOutputDto } from './dto';
import { IRepositoryService } from './interface';
import { RepositoryInjectEnum } from './repository.enum';

@Resolver(() => RepositoryListOutputDto)
export class RepositoryResolver extends ResolverCore {
  constructor(
    @Inject(RepositoryInjectEnum.SERVICE)
    private readonly service: IRepositoryService,
  ) {
    super();
  }

  @Query(() => RepositoryDetailOutputDto)
  async getRepositoryByName(
    @Args('name', { type: () => String }) name: NameType,
  ) {
    const repository = await this.service.getOneByName(name);

    return this.getEntityOrNotFound(repository);
  }

  @Query(() => [RepositoryListOutputDto])
  getRepositoryList() {
    return this.service.getList();
  }
}
