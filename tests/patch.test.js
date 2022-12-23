import { checkPermAndCompile } from '../index.mjs';

const perms = [
  '/name',
  '/items/*/soldOut',
];

const patches = [
  {
    op: 'replace',
    path: '/name',
    value: 'Test Addonx',
  },
  {
    op: 'replace',
    path: '/items/1/soldOut',
    value: true,
  },
  {
    op: 'add',
    path: '/items/2',
    value: {
      active: true,
      name: 'abc',
      price: 3,
      soldOut: false,
    },
  },
  {
    op: 'remove',
    path: '/items/0',
  },
];

describe('Perm Check', () => {
  it('should halt add', () => {
    const patch = [{ op: 'add', path: '/name', value: 'foo' }];
    const error = new Error("You are not allowed to add '/name'.");
    expect(() => checkPermAndCompile(perms, patch, '-r--')).toThrow(error);
  });

  it('should halt update', () => {
    const patch = [{ op: 'replace', path: '/name', value: 'foo' }];
    const error = new Error("You are not allowed to update '/name'.");
    expect(() => checkPermAndCompile(perms, patch, '-r--')).toThrow(error);
  });

  it('should halt delete', () => {
    const patch = [{ op: 'remove', path: '/name' }];
    const error = new Error("You are not allowed to delete '/name'.");
    expect(() => checkPermAndCompile(perms, patch, '-r--')).toThrow(error);
  });

  it('should allow add', () => {
    const patchMap = [{ op: 'add', path: '/name', value: 'foo' }];
    expect(checkPermAndCompile(perms, patchMap, 'xr--'))
      .toEqual({ name: 'foo', patchMap });
  });

  it('should allow update', () => {
    const patchMap = [{ op: 'replace', path: '/name', value: 'foo' }];
    expect(checkPermAndCompile(perms, patchMap, 'xru-'))
      .toEqual({ name: 'foo', patchMap });
  });

  it('should allow delete', () => {
    const patchMap = [{ op: 'remove', path: '/name' }];
    expect(checkPermAndCompile(perms, patchMap, 'xrud'))
      .toEqual({ patchMap });
  });

  it('should halt update: field not in perms', () => {
    const patch = [{ op: 'replace', path: '/foo', value: 'foo' }];
    const error = new Error("You are not allowed to update field '/foo'.");
    expect(() => checkPermAndCompile(perms, patch, '-ru-')).toThrow(error);
  });

  it('should halt update: collection field not in perms', () => {
    const patch = [{ op: 'replace', path: '/foo/1/bar', value: 'foo' }];
    const error = new Error("You are not allowed to update collection field '/foo/1/bar'.");
    expect(() => checkPermAndCompile(perms, patch, '-ru-')).toThrow(error);
  });

  it('should allow update: collection field', () => {
    const patchMap = [{ op: 'replace', path: '/items/1/soldOut', value: true }];
    expect(checkPermAndCompile(perms, patchMap, 'xru-'))
      .toEqual({
        items: [{ soldOut: true }],
        patchMap,
      });
  });

  it('should allow:', () => {
    expect(checkPermAndCompile(perms, patches, 'xrud')).toEqual(
      {
        name: 'Test Addonx',
        items: [
          { soldOut: true },
          {
            active: true, name: 'abc', price: 3, soldOut: false,
          },
        ],
        patchMap: patches,
      },
    );
  });
});
