/* eslint-disable no-sparse-arrays */

import { checkPermAndCompile, stripNilArrItem } from '../index.mjs';

const agnostic = { verbs: 'XRUD' };
const gnostic = { verbs: 'xrud' };
const negate = { verbs: '----' };

const patches = [
  {
    op: 'replace',
    path: '/name',
    value: 'Test Addonx',
  },
];

const fields = [
  '/name',
];

describe('Http Verb Auth', () => {
  describe('Agnostic - succeding verb procedures are not bound to any entity', () => {
    it('should allow POST', () => {
      const { partialPerms } = checkPermAndCompile(agnostic, 'POST');
      expect(partialPerms.executeOwned).toBe(false);
    });

    it('should allow GET', () => {
      const { partialPerms } = checkPermAndCompile(agnostic, 'GET');
      expect(partialPerms.readOwned).toBe(false);
    });

    it('should allow PATCH', () => {
      const { partialPerms } = checkPermAndCompile(agnostic, 'PATCH', patches);
      expect(partialPerms.updateOwned).toBe(false);
    });

    it('should allow DELETE', () => {
      const { partialPerms } = checkPermAndCompile(agnostic, 'DELETE');
      expect(partialPerms.deleteOwned).toBe(false);
    });
  });

  describe('Gnostic - succeding verb procedures are bound to some entity', () => {
    it('should allow POST - owned', () => {
      const { partialPerms } = checkPermAndCompile(gnostic, 'POST');
      expect(partialPerms.executeOwned).toBe(true);
    });

    it('should allow GET - owned', () => {
      const { partialPerms } = checkPermAndCompile(gnostic, 'GET');
      expect(partialPerms.readOwned).toBe(true);
    });

    it('should allow PATCH - owned', () => {
      const { partialPerms } = checkPermAndCompile({ ...gnostic, fields }, 'PATCH', patches);
      expect(partialPerms.updateOwned).toBe(true);
    });

    it('should allow DELETE - owned', () => {
      const { partialPerms } = checkPermAndCompile(gnostic, 'DELETE');
      expect(partialPerms.deleteOwned).toBe(true);
    });
  });

  describe('Negates', () => {
    it('should not allow POST', () => {
      const error = new Error("You are not authorized to perform 'POST' operation.");
      expect(() => checkPermAndCompile(negate, 'POST')).toThrow(error);
    });

    it('should not allow GET', () => {
      const error = new Error("You are not authorized to perform 'GET' operation.");
      expect(() => checkPermAndCompile(negate, 'GET')).toThrow(error);
    });

    it('should not allow PATCH', () => {
      const error = new Error("You are not authorized to perform 'PATCH' operation.");
      expect(() => checkPermAndCompile(negate, 'PATCH')).toThrow(error);
    });

    it('should not allow DELETE', () => {
      const error = new Error("You are not authorized to perform 'DELETE' operation.");
      expect(() => checkPermAndCompile(negate, 'DELETE')).toThrow(error);
    });
  });

  describe('Negate non supported verbs', () => {
    it('should not allow HEAD', () => {
      const error = new Error("You are not authorized to perform 'HEAD' operation.");
      expect(() => checkPermAndCompile(gnostic, 'HEAD')).toThrow(error);
    });

    it('should not allow PUT', () => {
      const error = new Error("You are not authorized to perform 'PUT' operation.");
      expect(() => checkPermAndCompile(gnostic, 'PUT')).toThrow(error);
    });

    it('should not allow CONNECT', () => {
      const error = new Error("You are not authorized to perform 'CONNECT' operation.");
      expect(() => checkPermAndCompile(gnostic, 'CONNECT')).toThrow(error);
    });

    it('should not allow OPTIONS', () => {
      const error = new Error("You are not authorized to perform 'OPTIONS' operation.");
      expect(() => checkPermAndCompile(gnostic, 'OPTIONS')).toThrow(error);
    });

    it('should not allow TRACE', () => {
      const error = new Error("You are not authorized to perform 'TRACE' operation.");
      expect(() => checkPermAndCompile(gnostic, 'TRACE')).toThrow(error);
    });
  });

  describe('Helper Test', () => {
    it('should strip nils', () => {
      const ret = stripNilArrItem({
        arr: [, 'foo'],
        obj: {
          foo: [, 'bar'],
          baz: {
            qux: [, 'bax', , 'qux'],
          },
        },
      });

      expect(ret).toEqual({
        arr: ['foo'],
        obj: {
          foo: ['bar'],
          baz: {
            qux: ['bax', 'qux'],
          },
        },
      });
    });
  });
});
