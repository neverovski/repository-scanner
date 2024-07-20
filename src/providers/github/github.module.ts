import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { GitHubConfig } from '@app/config';

import { GitHubMapperProvider, GitHubServiceProvider } from './github.provider';

@Module({
  imports: [ConfigModule.forFeature(GitHubConfig)],
  providers: [GitHubMapperProvider, GitHubServiceProvider],
  exports: [GitHubServiceProvider],
})
export class GitHubModule {}
