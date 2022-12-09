import ApiError from '../ApiError.mjs';
import { checkFieldPerm } from '../index.mjs';

import fxt from './perm.fxt.mjs';

describe('Perm Check', () => {
  describe('Basic nesting fields', () => {
    it('should capture basic primitive', () => {
      const { perm, data } = fxt.primitive;
      const error = new ApiError(403, "You are not allowed to update 'foo' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - obj', () => {
      const { perm, data } = fxt.nonPrimObj;
      const error = new ApiError(403, "You are not allowed to update 'obj.bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - obj arr obj', () => {
      const { perm, data } = fxt.nonPrimObjArrObj;
      const error = new ApiError(403, "You are not allowed to update 'obj.foo[0].bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - obj nested', () => {
      const { perm, data } = fxt.nonPrimObjNest1;
      const error = new ApiError(403, "You are not allowed to update 'obj.nest1.foo' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - obj nested deep', () => {
      const { perm, data } = fxt.nonPrimObjNestDeep;
      const error = new ApiError(403, "You are not allowed to update 'obj.aa.bb.cc.bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - obj nested deep arr', () => {
      const { perm, data } = fxt.nonPrimObjNestDeepArr;
      const error = new ApiError(403, "You are not allowed to update 'obj.aa.bb.cc.bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - obj nested deep arr drain', () => {
      const { perm, data } = fxt.nonPrimObjNestDeepArrDrain;
      const error = new ApiError(403, "You are not allowed to drain array field 'obj.aa.bb.cc.bar'.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - arr', () => {
      const { perm, data } = fxt.nonPrimArr;
      const error = new ApiError(403, "You are not allowed to update 'arr' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - drain arr', () => {
      const { perm, data } = fxt.nonPrimArrDrain;
      const error = new ApiError(403, "You are not allowed to drain array field 'arr'.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - arr obj drain', () => {
      const { perm, data } = fxt.nonPrimArrObjDrain;
      const error = new ApiError(403, "You are not allowed to drain array field 'arr'.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - arr obj index 0', () => {
      const { perm, data } = fxt.nonPrimArrObj0;
      const error = new ApiError(403, "You are not allowed to update 'arr[0].foo' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - arr obj index 1', () => {
      const { perm, data } = fxt.nonPrimArrObj1;
      const error = new ApiError(403, "You are not allowed to update 'arr[1].bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - arr obj index 0 nest', () => {
      const { perm, data } = fxt.nonPrimArrObj0Nest;
      const error = new ApiError(403, "You are not allowed to update 'arr[0].foo.bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - arr obj index 0 nest arr', () => {
      const { perm, data } = fxt.nonPrimArrObj0NestArr;
      const error = new ApiError(403, "You are not allowed to update 'arr[0].foo.bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture non primitive - arr obj index 0 nest arr drain', () => {
      const { perm, data } = fxt.nonPrimArrObj0NestArrDrain;
      const error = new ApiError(403, "You are not allowed to drain array field 'arr[0].foo.bar'.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });
  });

  describe('Wildcard field perm', () => {
    it('should capture: field not in perm, no wildcard perm - must allow', () => {
      // to reduce perm contents we treated undefined or non existing field
      // as ALLOWED and it will pass down to controller (silence means yes)

      const { perm, data } = fxt.wildcardPrim1;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it('should capture: field not in perm, wildcard false', () => {
      const { perm, data } = fxt.wildcardPrim2;
      const error = new ApiError(403, "You are not allowed to update 'bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture: field not in perm, wildcard true', () => {
      const { perm, data } = fxt.wildcardPrim3;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });
  });

  describe('Wildcard field perm - array', () => {
    it('should capture: field not in perm, no wildcard perm - must allow', () => {
      const { perm, data } = fxt.wildcardPrim1Arr;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it('should capture: field not in perm, wildcard false', () => {
      const { perm, data } = fxt.wildcardPrim2Arr;
      const error = new ApiError(403, "You are not allowed to update 'bar' field.");

      expect(() => {
        checkFieldPerm(perm, data);
      }).toThrow(error);
    });

    it('should capture: field not in perm, wildcard true', () => {
      const { perm, data } = fxt.wildcardPrim3Arr;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });
  });

  describe('Comply to coverage', () => {
    it('should not process if empty perm provided', () => {
      const ret = checkFieldPerm();
      expect(ret).toBe(undefined);
    });

    it('should capture non primitive - arr', () => {
      const { perm, data } = fxt.nonPrimArrX;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });
  });
});
