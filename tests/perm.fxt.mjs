export default {
  basic1: {
    perm: { foo: true },
    data: { foo: 'foo' },
  },
  basic2: {
    perm: { foo: false },
    data: { foo: 'foo' },
  },
  basic3: {
    perm: {},
    data: { foo: 'foo' },
  },
  basic4: {
    perm: { _others: false },
    data: { foo: 'foo' },
  },
  basic5: {
    perm: { _others: true },
    data: { foo: 'foo' },
  },

  // --

  obj1: {
    perm: { obj: { bar: true } },
    data: { obj: { bar: 'bar' } },
  },
  obj2: {
    perm: { obj: { bar: false } },
    data: { obj: { bar: 'bar' } },
  },
  obj3: {
    perm: { obj: {} },
    data: { obj: { bar: 'bar' } },
  },
  obj4: {
    perm: { obj: { _others: false } },
    data: { obj: { bar: 'bar' } },
  },
  obj5: {
    perm: { obj: { _others: true } },
    data: { obj: { bar: 'bar' } },
  },
  obj6: {
    perm: {},
    data: { obj: { bar: 'bar' } },
  },
  obj7: {
    perm: { _others: false },
    data: { obj: { bar: 'bar' } },
  },
  obj8: {
    perm: { _others: true },
    data: { obj: { bar: 'bar' } },
  },

  // --

  objNest1: {
    perm: { obj: { foo: { bar: true } } },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest2: {
    perm: { obj: { foo: { bar: false } } },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest3: {
    perm: { obj: { foo: {} } },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest4: {
    perm: { obj: { foo: { _others: false } } },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest5: {
    perm: { obj: { foo: { _others: true } } },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest6: {
    perm: { obj: {} },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest7: {
    perm: { obj: { _others: false } },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest8: {
    perm: { obj: { _others: true } },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest9: {
    perm: {},
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest10: {
    perm: { _others: false },
    data: { obj: { foo: { bar: 123 } } },
  },
  objNest11: {
    perm: { _others: true },
    data: { obj: { foo: { bar: 123 } } },
  },

  // --

  // arrBasic
  // arrObj
  // arrObjNest
  // arrObjArrObj
  // arrObjArrObjNest

  // --

  nonPrimObj: {
    perm: { obj: { bar: false } },
    data: { obj: { bar: 'bar' } },
  },

  nonPrimObjArrObj: {
    perm: { obj: { foo: [{ bar: false }] } },
    data: { obj: { foo: [{ bar: 'bar' }] } },
  },

  nonPrimObjNest1: {
    perm: { obj: { nest1: { foo: false } } },
    data: { obj: { nest1: { foo: 123 } } },
  },

  nonPrimObjNestDeep: {
    perm: { obj: { aa: { bb: { cc: { bar: false } } } } },
    data: { obj: { aa: { bb: { cc: { bar: 'bar' } } } } },
  },

  nonPrimObjNestDeepArr: {
    perm: { obj: { aa: { bb: { cc: { bar: false } } } } },
    data: { obj: { aa: { bb: { cc: { bar: ['bar'] } } } } },
  },

  nonPrimObjNestDeepArrDrain: {
    perm: { obj: { aa: { bb: { cc: { bar: false } } } } },
    data: { obj: { aa: { bb: { cc: { bar: [] } } } } },
  },

  nonPrimArr: {
    perm: { arr: false },
    data: { arr: ['foo'] },
  },

  nonPrimArrDrain: {
    perm: { arr: false },
    data: { arr: [] },
  },

  nonPrimArrX: {
    perm: {},
    data: { arr: ['arr field not in perm'] },
  },

  nonPrimArrObjDrain: {
    perm: { arr: [{ foo: false }] },
    data: { arr: [] },
  },
  nonPrimArrObj0: {
    perm: { arr: [{ foo: false }] },
    data: { arr: [{ foo: 'foo' }] },
  },
  nonPrimArrObj1: {
    perm: { arr: [{ foo: true, bar: false }] },
    data: { arr: [{ foo: 'foo' }, { bar: 'bar' }] },
  },
  nonPrimArrObj0Nest: {
    perm: { arr: [{ foo: { bar: false } }] },
    data: { arr: [{ foo: { bar: 'bar' } }] },
  },
  nonPrimArrObj0NestArr: {
    perm: { arr: [{ foo: { bar: false } }] },
    data: { arr: [{ foo: { bar: ['bar'] } }] },
  },
  nonPrimArrObj0NestArrX: {
    perm: { _others: true },
    data: { items: [{ name: 'foo' }] },
  },
  nonPrimArrObj0NestArrDrain: {
    perm: { arr: [{ foo: { bar: false } }] },
    data: { arr: [{ foo: { bar: [] } }] },
  },

  wildcardPrim1: {
    perm: { foo: false },
    data: { bar: 'field not in perm, no wildcard perm' },
  },
  wildcardPrim2: {
    perm: { foo: false, '*': false },
    data: { bar: 'field not in perm, wildcard false' },
  },
  wildcardPrim3: {
    perm: { foo: false, '*': true },
    data: { bar: 'field not in perm, wildcard true' },
  },

  wildcardArr1: {
    perm: { foo: false },
    data: { bar: ['field not in perm, no wildcard perm'] },
  },
  wildcardArr2: {
    perm: { foo: false, '*': false },
    data: { bar: ['field not in perm, wildcard false'] },
  },
  wildcardArr3: {
    perm: { foo: false, _others: true },
    data: { bar: ['field not in perm, wildcard true'] },
  },
};
