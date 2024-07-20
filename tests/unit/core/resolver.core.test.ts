import { NotFoundException } from '@nestjs/common';

import { ResolverCore } from '@app/core/resolver.core';

describe('ResolverCore class', () => {
  let resolverCore: ResolverCore;

  beforeEach(() => {
    resolverCore = new ResolverCore();
  });

  describe('getEntityOrNotFound method', () => {
    it('should return an entity', () => {
      const data = 'entity';

      expect(resolverCore.getEntityOrNotFound(data)).toBe(data);
    });

    it('should throw a NotFoundException', () => {
      expect(() => resolverCore.getEntityOrNotFound(null)).toThrow(
        NotFoundException,
      );
    });
  });
});
