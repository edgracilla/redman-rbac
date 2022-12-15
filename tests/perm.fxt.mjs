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

  // -- basic object

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

  // -- nested object

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

  // -- arr primitive

  arr1: {
    perm: { arr: true },
    data: { arr: ['foo'] },
  },
  arr2: {
    perm: { arr: false },
    data: { arr: ['foo'] },
  },
  arr3: {
    perm: {},
    data: { arr: ['foo'] },
  },
  arr4: {
    perm: { _others: false },
    data: { arr: ['foo'] },
  },
  arr5: {
    perm: { _others: true },
    data: { arr: ['foo'] },
  },

  // -- arr drain

  arr1drain: {
    perm: { arr: true },
    data: { arr: [] },
  },
  arr2drain: {
    perm: { arr: false },
    data: { arr: [] },
  },
  arr3drain: {
    perm: {},
    data: { arr: [] },
  },
  arr4drain: {
    perm: { _others: false },
    data: { arr: [] },
  },
  arr5drain: {
    perm: { _others: true },
    data: { arr: [] },
  },

  // -- arr object

  arrObj1: {
    perm: { arr: [{ foo: true }] },
    data: { arr: [{ foo: 'foo' }] },
  },
  arrObj2: {
    perm: { arr: [{ foo: false }] },
    data: { arr: [{ foo: 'foo' }] },
  },
  arrObj3: {
    perm: { arr: [{}] },
    data: { arr: [{ foo: 'foo' }] },
  },
  arrObj4: {
    perm: { arr: [{ _others: false }] },
    data: { arr: [{ foo: 'foo' }] },
  },
  arrObj5: {
    perm: { arr: [{ _others: true }] },
    data: { arr: [{ foo: 'foo' }] },
  },

  arrObj6: {
    perm: { arr: [] },
    data: { arr: [{ foo: 'foo' }] },
  },
  arrObj7: {
    perm: {},
    data: { arr: [{ foo: 'foo' }] },
  },
  arrObj8: {
    perm: { _others: false },
    data: { arr: [{ foo: 'foo' }] },
  },
  arrObj9: {
    perm: { _others: true },
    data: { arr: [{ foo: 'foo' }] },
  },

  // TODO:
  // arrObjNest
  // arrObjArrObj
  // arrObjArrObjNest

  // -- old test approach

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
