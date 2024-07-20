import type { Provider } from '@nestjs/common';

import { RepositoryInjectEnum } from './repository.enum';
import { RepositoryService } from './repository.service';

export const RepositoryServiceProvider: Provider = {
  provide: RepositoryInjectEnum.SERVICE,
  useClass: RepositoryService,
};
