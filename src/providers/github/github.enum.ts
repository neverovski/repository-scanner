export enum GitHubInjectEnum {
  MAPPER = 'GitHubMapper',
  SERVICE = 'GitHubService',
}

export enum GitHubQueryEnum {
  REPOSITORY_DETAIL = 'repos',
  REPOSITORY_HOOK = 'hooks',
  REPOSITORY_LIST = 'user/repos?sort=created&affiliation=owner',
}
