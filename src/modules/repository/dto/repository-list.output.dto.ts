import { Field, ObjectType } from '@nestjs/graphql';

import { IRepository } from '@app/common/interfaces';

@ObjectType({ description: 'RepositoryList' })
export class RepositoryListOutputDto
  implements Omit<IRepository, 'private' | 'activeWebhooks'>
{
  @Field()
  name!: NameType;

  @Field()
  owner!: string;

  @Field()
  size!: number;
}
