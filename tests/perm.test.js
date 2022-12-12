import { checkFieldPerm } from '../index.mjs';

import fxt from './perm.fxt.mjs';

describe('Perm Check', () => {
  describe('Basic', () => {
    it("_allow - submitted 'foo', perm 'foo' true", () => {
      const { perm, data } = fxt.basic1;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it("REJECT - submitted 'foo', perm 'foo' false", () => {
      const { perm, data } = fxt.basic2;
      const error = new Error("You are not allowed to submit 'foo' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'foo', perm 'foo' not exist, wildcard not exist", () => {
      const { perm, data } = fxt.basic3;
      const error = new Error("You are not allowed to submit 'foo' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'foo', perm 'foo' not exist, wildcard false", () => {
      const { perm, data } = fxt.basic4;
      const error = new Error("You are not allowed to submit 'foo' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("_allow - submitted 'foo', perm 'foo' not exist, wildcard true", () => {
      const { perm, data } = fxt.basic5;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });
  });

  describe('Object', () => {
    it("_allow - submitted 'obj.bar', perm 'obj.bar' true", () => {
      const { perm, data } = fxt.obj1;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it("REJECT - submitted 'obj.bar', perm 'obj.bar' false", () => {
      const { perm, data } = fxt.obj2;
      const error = new Error("You are not allowed to submit 'obj.bar' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'obj.bar', perm 'obj.bar' not exist, wildcard not exist", () => {
      const { perm, data } = fxt.obj3;
      const error = new Error("You are not allowed to submit 'obj.bar' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'obj.bar', perm 'obj.bar' not exist, wildcard false", () => {
      const { perm, data } = fxt.obj4;
      const error = new Error("You are not allowed to submit 'obj.bar' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("_allow - submitted 'obj.bar', perm 'obj.bar' not exist, wildcard true", () => {
      const { perm, data } = fxt.obj5;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it("REJECT - submitted 'obj.bar', perm 'obj' not exist, wildcard not exist", () => {
      const { perm, data } = fxt.obj6;
      const error = new Error("You are not allowed to submit 'obj' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'obj.bar', perm 'obj' not exist, wildcard false", () => {
      const { perm, data } = fxt.obj7;
      const error = new Error("You are not allowed to submit 'obj' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("_allow - submitted 'obj.bar', perm 'obj' not exist, wildcard true", () => {
      const { perm, data } = fxt.obj8;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });
  });

  describe('Object Nested', () => {
    it("_allow - submitted 'obj.foo.bar', perm 'obj.foo.bar' true", () => {
      const { perm, data } = fxt.objNest1;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it("REJECT - submitted 'obj.foo.bar', perm 'obj.foo.bar' false", () => {
      const { perm, data } = fxt.objNest2;
      const error = new Error("You are not allowed to submit 'obj.foo.bar' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'obj.foo.bar', perm 'obj.foo.bar' not exist, wildcard not exist", () => {
      const { perm, data } = fxt.objNest3;
      const error = new Error("You are not allowed to submit 'obj.foo.bar' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'obj.foo.bar', perm 'obj.foo.bar' not exist, wildcard false", () => {
      const { perm, data } = fxt.objNest4;
      const error = new Error("You are not allowed to submit 'obj.foo.bar' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("_allow - submitted 'obj.foo.bar', perm 'obj.foo.bar' not exist, wildcard true", () => {
      const { perm, data } = fxt.objNest5;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it("REJECT - submitted 'obj.foo.bar', perm 'obj.foo' not exist, wildcard not exist", () => {
      const { perm, data } = fxt.objNest6;
      const error = new Error("You are not allowed to submit 'obj.foo' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'obj.foo.bar', perm 'obj.foo' not exist, wildcard false", () => {
      const { perm, data } = fxt.objNest7;
      const error = new Error("You are not allowed to submit 'obj.foo' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("_allow - submitted 'obj.foo.bar', perm 'obj.foo' not exist, wildcard true", () => {
      const { perm, data } = fxt.objNest8;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });

    it("REJECT - submitted 'obj.foo.bar', perm 'obj' not exist, wildcard not exist", () => {
      const { perm, data } = fxt.objNest9;
      const error = new Error("You are not allowed to submit 'obj' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("REJECT - submitted 'obj.foo.bar', perm 'obj' not exist, wildcard false", () => {
      const { perm, data } = fxt.objNest10;
      const error = new Error("You are not allowed to submit 'obj' field.");
      expect(() => checkFieldPerm(perm, data)).toThrow(error);
    });

    it("_allow - submitted 'obj.foo.bar', perm 'obj' not exist, wildcard true", () => {
      const { perm, data } = fxt.objNest11;
      const ret = checkFieldPerm(perm, data);
      expect(ret).toBe(undefined);
    });
  });

  // describe('Basic nesting fields', () => {
  //   it('should capture non primitive - obj', () => {
  //     const { perm, data } = fxt.nonPrimObj;
  //     const error = new Error("You are not allowed to submit 'obj.bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - obj arr obj', () => {
  //     const { perm, data } = fxt.nonPrimObjArrObj;
  //     const error = new Error("You are not allowed to submit 'obj.foo[0].bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - obj nested', () => {
  //     const { perm, data } = fxt.nonPrimObjNest1;
  //     const error = new Error("You are not allowed to submit 'obj.nest1.foo' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - obj nested deep', () => {
  //     const { perm, data } = fxt.nonPrimObjNestDeep;
  //     const error = new Error("You are not allowed to submit 'obj.aa.bb.cc.bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - obj nested deep arr', () => {
  //     const { perm, data } = fxt.nonPrimObjNestDeepArr;
  //     const error = new Error("You are not allowed to submit 'obj.aa.bb.cc.bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - obj nested deep arr drain', () => {
  //     const { perm, data } = fxt.nonPrimObjNestDeepArrDrain;
  //     const error = new Error("You are not allowed to drain array field 'obj.aa.bb.cc.bar'.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr', () => {
  //     const { perm, data } = fxt.nonPrimArr;
  //     const error = new Error("You are not allowed to submit 'arr' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - drain arr', () => {
  //     const { perm, data } = fxt.nonPrimArrDrain;
  //     const error = new Error("You are not allowed to drain array field 'arr'.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr field not in perm', () => {
  //     const { perm, data } = fxt.nonPrimArrX;
  //     const error = new Error("You are not allowed to submit 'arr' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr obj drain', () => {
  //     const { perm, data } = fxt.nonPrimArrObjDrain;
  //     const error = new Error("You are not allowed to drain array field 'arr'.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr obj index 0', () => {
  //     const { perm, data } = fxt.nonPrimArrObj0;
  //     const error = new Error("You are not allowed to submit 'arr[0].foo' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr obj index 1', () => {
  //     const { perm, data } = fxt.nonPrimArrObj1;
  //     const error = new Error("You are not allowed to submit 'arr[1].bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr obj index 0 nest', () => {
  //     const { perm, data } = fxt.nonPrimArrObj0Nest;
  //     const error = new Error("You are not allowed to submit 'arr[0].foo.bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr obj index 0 nest arr', () => {
  //     const { perm, data } = fxt.nonPrimArrObj0NestArr;
  //     const error = new Error("You are not allowed to submit 'arr[0].foo.bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should capture non primitive - arr obj index 0 nest arr drain', () => {
  //     const { perm, data } = fxt.nonPrimArrObj0NestArrDrain;
  //     const error = new Error("You are not allowed to drain array field 'arr[0].foo.bar'.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });
  // });

  // describe('Wildcard field perm', () => {
  //   it('should not allow: field not in perm, no wildcard', () => {
  //     const { perm, data } = fxt.wildcardPrim1;
  //     const error = new Error("You are not allowed to submit 'bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should not allow: field not in perm, wildcard false', () => {
  //     const { perm, data } = fxt.wildcardPrim2;
  //     const error = new Error("You are not allowed to submit 'bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should allow: field not in perm, wildcard true', () => {
  //     const { perm, data } = fxt.wildcardPrim3;
  //     const ret = checkFieldPerm(perm, data);
  //     expect(ret).toBe(undefined);
  //   });
  // });

  // describe('Wildcard field perm - array', () => {
  //   it('should not allow: field not in perm, no wildcard', () => {
  //     const { perm, data } = fxt.wildcardArr1;
  //     const error = new Error("You are not allowed to submit 'bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should not allow: field not in perm, wildcard false', () => {
  //     const { perm, data } = fxt.wildcardArr2;
  //     const error = new Error("You are not allowed to submit 'bar' field.");

  //     expect(() => {
  //       checkFieldPerm(perm, data);
  //     }).toThrow(error);
  //   });

  //   it('should allow: field not in perm, wildcard true', () => {
  //     const { perm, data } = fxt.wildcardArr3;
  //     const ret = checkFieldPerm(perm, data);
  //     expect(ret).toBe(undefined);
  //   });
  // });

  // describe('Comply to coverage', () => {
  //   it('should not process if empty perm provided', () => {
  //     const ret = checkFieldPerm();
  //     expect(ret).toBe(undefined);
  //   });

  //   it('should capture: field not in perm, xxx', () => {
  //     const { perm, data } = fxt.nonPrimArrObj0NestArrX;
  //     const ret = checkFieldPerm(perm, data);
  //     expect(ret).toBe(undefined);
  //   });
  // });
});
