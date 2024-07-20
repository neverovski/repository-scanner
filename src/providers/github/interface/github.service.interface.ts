import { IRepository } from '@app/common/interfaces';

export interface IGitHubService {
  getRepositoryDetail(name: NameType): Promise<IRepository | null>;
  getRepositoryList(): Promise<IRepository[]>;
}
