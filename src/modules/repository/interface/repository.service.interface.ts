import { IRepository } from '@app/common/interfaces';

export interface IRepositoryService {
  getList(): Promise<IRepository[]>;
  getOneByName(name: NameType): Promise<IRepository | null>;
}
