import { isVerbAuthorized } from '../index.mjs';

/**
 * NOTE: it is highly influenced by File System symbolic notation
 * https://en.wikipedia.org/wiki/File-system_permissions
 *
 * e.g.
 * -rwxr-xr-x
 * crw-rw-r--
 *
 * in Verb Based Auth we do:
 * 'x---' for create/execute access
 * '-r--' for read access
 * '--u-' for update access
 * '---d' for delete access
 *
 * Uppercase (XRUD) represents as a hint for the succeding process that that verb procedure
 * needs a controller level added permission checking. Such as checking if the product
 * belongs to a merchant, or asset belongs to a building, etc.
 */

const verbPerms = {
  agnostic: 'xrud',
  gnostic: 'XRUD',
  negate: '----',
};

describe('Http Verb Auth', () => {
  describe('Agnostic - succeding verb procedures are not bound to any entity', () => {
    it('should allow POST', () => {
      const ret = isVerbAuthorized(verbPerms.agnostic, 'POST');
      expect(ret).toBe(true);
    });

    it('should allow GET', () => {
      const ret = isVerbAuthorized(verbPerms.agnostic, 'GET');
      expect(ret).toBe(true);
    });

    it('should allow PATCH', () => {
      const ret = isVerbAuthorized(verbPerms.agnostic, 'PATCH');
      expect(ret).toBe(true);
    });

    it('should allow DELETE', () => {
      const ret = isVerbAuthorized(verbPerms.agnostic, 'DELETE');
      expect(ret).toBe(true);
    });
  });

  describe('Gnostic - succeding verb procedures are bound to some entity', () => {
    it('should allow POST - owned', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'POST');
      expect(ret).toBe(true);
    });

    it('should allow GET - owned', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'GET');
      expect(ret).toBe(true);
    });

    it('should allow PATCH - owned', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'PATCH');
      expect(ret).toBe(true);
    });

    it('should allow DELETE - owned', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'DELETE');
      expect(ret).toBe(true);
    });
  });

  describe('Negates', () => {
    it('should not allow POST', () => {
      const ret = isVerbAuthorized(verbPerms.negate, 'POST');
      expect(ret).toBe(false);
    });

    it('should not allow GET', () => {
      const ret = isVerbAuthorized(verbPerms.negate, 'GET');
      expect(ret).toBe(false);
    });

    it('should not allow PATCH', () => {
      const ret = isVerbAuthorized(verbPerms.negate, 'PATCH');
      expect(ret).toBe(false);
    });

    it('should not allow DELETE', () => {
      const ret = isVerbAuthorized(verbPerms.negate, 'DELETE');
      expect(ret).toBe(false);
    });
  });

  describe('Negate non supported verbs', () => { // TODO: explain why?
    it('should not allow HEAD', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'HEAD');
      expect(ret).toBe(false);
    });

    it('should not allow PUT', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'PUT');
      expect(ret).toBe(false);
    });

    it('should not allow CONNECT', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'CONNECT');
      expect(ret).toBe(false);
    });

    it('should not allow OPTIONS', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'OPTIONS');
      expect(ret).toBe(false);
    });

    it('should not allow TRACE', () => {
      const ret = isVerbAuthorized(verbPerms.gnostic, 'TRACE');
      expect(ret).toBe(false);
    });
  });
});
