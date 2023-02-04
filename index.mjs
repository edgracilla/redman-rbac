/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-object-injection */

import jptr from 'jsonpointer';

const makeMessage = (action, field) => `You are not allowed to ${action} '${field}'.`;

export const stripNilArrItem = (obj) => {
  const keys = Object.keys(obj || {});

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const val = obj[key];

    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        obj[key] = val.filter((e) => ![null, undefined].includes(e));
      } else {
        stripNilArrItem(obj[key]);
      }
    }
  }

  return obj;
};

export const checkPermAndCompile = (perms, verb, patches = []) => {
  const { verbs, fields } = perms;
  const [exe, get, upd, del] = verbs;

  const exeFull = exe === 'X'; const exePart = exe === 'x'; const canAdd = exeFull || exePart;
  const getFull = get === 'R'; const getPart = get === 'r'; const canGet = getFull || getPart;
  const updFull = upd === 'U'; const updPart = upd === 'u'; const canUpd = updFull || updPart;
  const delFull = del === 'D'; const delPart = del === 'd'; const canDel = delFull || delPart;

  const data = {};
  let hasArray = false;
  let isAuthorized = false;

  // -- verb method validation

  switch (verb) {
    case 'GET': isAuthorized = canGet; break;
    case 'POST': isAuthorized = canAdd; break;
    case 'PATCH': isAuthorized = canUpd; break;
    case 'DELETE': isAuthorized = canDel; break;
    default: isAuthorized = false;
  }

  if (!isAuthorized) {
    throw new Error(`You are not authorized to perform '${verb}'.`);
  }

  // -- partial perm indicators

  const partialPerms = {
    readOwned: getPart,
    executeOwned: exePart,
    updateOwned: updPart,
    deleteOwned: delPart,
  };

  if (verb !== 'PATCH') {
    return { partialPerms };
  }

  // -- patch processes:

  // complie jpatch arr to {} for succedding field value validation (Ajv, Joi, etc.)
  // if partial access, validate each field permission

  const addOps = [];
  const updOps = [];
  const delOps = [];

  if (!patches.length) {
    throw new Error('Empty JSON patch map.');
  }

  for (let i = 0; i < patches.length; i += 1) {
    const { op, path, value } = patches[i];
    const isArrayItem = /\/\d\//.test(path);

    if (op === 'add') {
      if (canAdd) addOps.push(patches[i]);
      else throw new Error(makeMessage('add', path));
    }

    if (op === 'remove') {
      if (canDel) delOps.push(patches[i]);
      else throw new Error(makeMessage('delete', path));
    }

    if (op === 'replace') {
      if (updPart) {
        if (isArrayItem) {
          if (!fields.includes(path.replace(/\/\d\//g, '/*/'))) {
            throw new Error(makeMessage('update collection field', path));
          }
        } else if (Array.isArray(fields) && !fields.includes(path)) {
          throw new Error(makeMessage('update field', path));
        }
      }

      updOps.push(patches[i]);
    }

    if (['add', 'replace'].includes(op)) {
      if (!hasArray && isArrayItem) hasArray = isArrayItem;
      jptr.set(data, path, value);
    }
  }

  const complied = stripNilArrItem(data);

  return {
    partialPerms,
    patchData: { ...complied, patchMap: [...addOps, ...updOps, ...delOps] },
  };
};

export default {
  checkPermAndCompile,
};
