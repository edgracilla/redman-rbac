export default {
  primitive: {
    perm: { foo: false },
    data: { foo: 'foo' },
  },

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

  wildcardPrim1Arr: {
    perm: { foo: false },
    data: { bar: ['field not in perm, no wildcard perm'] },
  },
  wildcardPrim2Arr: {
    perm: { foo: false, '*': false },
    data: { bar: ['field not in perm, wildcard false'] },
  },
  wildcardPrim3Arr: {
    perm: { foo: false, _others: true },
    data: { bar: ['field not in perm, wildcard true'] },
  },
};
