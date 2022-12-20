/* eslint-disable security/detect-object-injection */
import jptr from 'jsonpointer';

const makeMessage = (action, field) => `You are not allowed to ${action} '${field}'.`;

export const isVerbAuthorized = (xrud, verb) => {
  const [POST, GET, PATCH, DELETE] = xrud;
  let isAuthorized = false;

  switch (verb) {
    case 'GET': isAuthorized = GET === 'R' || GET === 'r'; break;
    case 'POST': isAuthorized = POST === 'X' || POST === 'x'; break;
    case 'PATCH': isAuthorized = PATCH === 'U' || PATCH === 'u'; break;
    case 'DELETE': isAuthorized = DELETE === 'D' || DELETE === 'd'; break;
    default: isAuthorized = false;
  }

  return isAuthorized;
};

export const checkPermAndCompile = (fields, patches, xrud) => {
  const [add, , upd, del] = xrud;

  const canAdd = add === 'X' || add === 'x';
  const canUpd = upd === 'U' || upd === 'u';
  const canDel = del === 'D' || del === 'd';

  const data = {};

  for (let i = 0; i < patches.length; i += 1) {
    const { op, path, value } = patches[i];

    if (op === 'add' && !canAdd) throw new Error(makeMessage('add', path));
    if (op === 'remove' && !canDel) throw new Error(makeMessage('delete', path));

    if (op === 'replace') {
      if (!canUpd) {
        throw new Error(makeMessage('update', path));
      }

      if (/\/\d\//.test(path)) {
        if (!fields.includes(path.replace(/\/\d\//g, '/*/'))) {
          throw new Error(makeMessage('update collection field', path));
        }
      } else if (!fields.includes(path)) {
        throw new Error(makeMessage('update field', path));
      }
    }

    if (['add', 'replace'].includes(op)) {
      jptr.set(data, path, value);
    }
  }

  return data;
};

export default {
  isVerbAuthorized,
  checkPermAndCompile,
};
