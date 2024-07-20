import { Module } from '@nestjs/common';

import { GitHubModule } from '@app/providers/github/github.module';

import { RepositoryServiceProvider } from './repository.provider';
import { RepositoryResolver } from './repository.resolver';

@Module({
  imports: [GitHubModule],
  providers: [RepositoryServiceProvider, RepositoryResolver],
})
export class RepositoryModule {}
