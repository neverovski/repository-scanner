import { Field, ObjectType } from '@nestjs/graphql';

import { IRepository } from '@app/common/interfaces';

@ObjectType({ description: 'RepositoryDetail' })
export class RepositoryDetailOutput implements IRepository {
  @Field(() => [String])
  activeWebhooks!: string[];

  @Field()
  countFiles!: number;

  @Field()
  name!: NameType;

  @Field()
  owner!: string;

  @Field()
  private!: boolean;

  @Field()
  size!: number;

  @Field()
  ymlUrl!: string;
}
