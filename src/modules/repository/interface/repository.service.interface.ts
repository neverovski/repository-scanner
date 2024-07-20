import { IRepository } from './repository.interface';

export interface IRepositoryService {
  getList(): Promise<IRepository[]>;
  getOneByName(name: NameType): Promise<IRepository | null>;
}
