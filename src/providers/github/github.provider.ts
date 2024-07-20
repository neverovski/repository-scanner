import type { Provider } from '@nestjs/common';

import { GitHubInjectEnum } from './github.enum';
import { GitHubMapper, GitHubService } from './service';

export const GitHubMapperProvider: Provider = {
  provide: GitHubInjectEnum.MAPPER,
  useClass: GitHubMapper,
};

export const GitHubServiceProvider: Provider = {
  provide: GitHubInjectEnum.SERVICE,
  useClass: GitHubService,
};
