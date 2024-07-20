import { join } from 'node:path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule } from '@app/config/config.module';
import { RepositoryModule } from '@app/modules/repository/repository.module';
import { LoggerModule } from '@app/providers/logger/logger.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

    RepositoryModule,
  ],
})
export class AppModule {}
