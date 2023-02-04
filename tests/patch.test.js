import { checkPermAndCompile } from '../index.mjs';

const fields = [
  '/name',
  '/items/*/soldOut',
];

const patches = [
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
    op: 'remove',
    path: '/items/0',
  },
];

const verb = 'PATCH';

describe('PATCH Check', () => {
  it('should allow add', () => {
    const perms = { fields, verbs: 'x-u-' };
    const patchMap = [{ op: 'add', path: '/name', value: 'foo' }];
    const { patchData } = checkPermAndCompile(perms, verb, patchMap);

    expect(patchData).toEqual({ name: 'foo', patchMap });
  });

  it('should allow update', () => {
    const perms = { fields, verbs: '--u-' };
    const patchMap = [{ op: 'replace', path: '/name', value: 'foo' }];
    const { patchData } = checkPermAndCompile(perms, verb, patchMap);

    expect(patchData).toEqual({ name: 'foo', patchMap });
  });

  it('should allow delete', () => {
    const perms = { fields, verbs: '--ud' };
    const patchMap = [{ op: 'remove', path: '/name' }];
    const { patchData } = checkPermAndCompile(perms, verb, patchMap);

    expect(patchData).toEqual({ patchMap });
  });

  it('should halt update: epmty patch data', () => {
    const perms = { fields, verbs: '--u-' };
    const error = new Error('Empty JSON patch map.');

    expect(() => checkPermAndCompile(perms, verb, [])).toThrow(error);
  });

  it('should halt update: add field', () => {
    const perms = { fields, verbs: '--u-' };
    const patch = [{ op: 'add', path: '/name', value: 'foo' }];
    const error = new Error("You are not allowed to add '/name'.");

    expect(() => checkPermAndCompile(perms, verb, patch)).toThrow(error);
  });

  it('should halt update: field not in perms', () => {
    const perms = { fields, verbs: '--u-' };
    const patch = [{ op: 'replace', path: '/foo', value: 'foo' }];
    const error = new Error("You are not allowed to update field '/foo'.");

    expect(() => checkPermAndCompile(perms, verb, patch)).toThrow(error);
  });

  it('should halt update: delete field', () => {
    const perms = { fields, verbs: '--u-' };
    const patch = [{ op: 'remove', path: '/name' }];
    const error = new Error("You are not allowed to delete '/name'.");

    expect(() => checkPermAndCompile(perms, verb, patch)).toThrow(error);
  });

  it('should halt update: collection field not in perms', () => {
    const perms = { fields, verbs: '--u-' };
    const patch = [{ op: 'replace', path: '/foo/1/bar', value: 'foo' }];
    const error = new Error("You are not allowed to update collection field '/foo/1/bar'.");
    expect(() => checkPermAndCompile(perms, verb, patch)).toThrow(error);
  });

  it('should allow update: collection field', () => {
    const perms = { fields, verbs: '--u-' };
    const patchMap = [{ op: 'replace', path: '/items/1/soldOut', value: true }];
    const { patchData } = checkPermAndCompile(perms, verb, patchMap);

    expect(patchData).toEqual({
      items: [{ soldOut: true }],
      patchMap,
    });
  });

  it('should allow: complex patches', () => {
    const perms = { fields, verbs: 'x-ud' };
    const { patchData } = checkPermAndCompile(perms, verb, patches);

    expect(patchData).toEqual(
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

  it('should accept null', () => {
    const perms = { fields, verbs: '--ud' };
    const patchMap = [{ op: 'replace', path: '/name', value: null }];
    const { patchData } = checkPermAndCompile(perms, verb, patchMap);

    expect(patchData).toEqual({ name: null, patchMap });
  });

  it('should accept empty fields', () => {
    const perms = { verbs: '--ud' };
    const patchMap = [{ op: 'replace', path: '/name', value: null }];
    const { patchData } = checkPermAndCompile(perms, verb, patchMap);

    expect(patchData).toEqual({ name: null, patchMap });
  });
});
