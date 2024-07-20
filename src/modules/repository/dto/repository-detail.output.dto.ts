import { Field, ObjectType } from '@nestjs/graphql';

import { IRepository } from '../interface';

@ObjectType({ description: 'RepositoryDetail' })
export class RepositoryDetailOutputDto implements IRepository {
  @Field()
  name!: NameType;

  @Field()
  owner!: string;

  @Field()
  private!: boolean;

  @Field()
  size!: number;
}
