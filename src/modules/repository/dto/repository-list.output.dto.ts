import { Field, ObjectType } from '@nestjs/graphql';

import { IRepository } from '../interface';

@ObjectType({ description: 'RepositoryList' })
export class RepositoryListOutputDto implements IRepository {
  @Field()
  name!: NameType;

  @Field()
  owner!: string;

  @Field()
  size!: number;
}
