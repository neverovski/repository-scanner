export interface IRepositoryContent {
  countFiles?: number;
  ymlUrl?: string | null;
}

export interface IRepository extends IRepositoryContent {
  activeWebhooks: string[];
  name: string;
  owner: string;
  private: boolean;
  size: number;
}
