import { NotFoundException } from '@nestjs/common';

export class ResolverCore {
  getEntityOrNotFound<T>(entity: T | null): T {
    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
