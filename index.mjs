/* eslint-disable security/detect-object-injection */

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

// --

const genMessageX = (action, field) => `You are not allowed to ${action} '${field}'.`;

export const checkPerm = (fields, patches, xrud) => {
  const [add, , upd, del] = xrud;

  const canAdd = add === 'X' || add === 'x';
  const canUpd = upd === 'U' || upd === 'u';
  const canDel = del === 'D' || del === 'd';

  for (let i = 0; i < patches.length; i += 1) {
    const { op, path } = patches[i];

    if (op === 'add' && !canAdd) throw new Error(genMessageX('add', path));
    if (op === 'remove' && !canDel) throw new Error(genMessageX('delete', path));

    if (op === 'replace') {
      if (!canUpd) {
        throw new Error(genMessageX('update', path));
      }

      if (/\/\d\//.test(path)) {
        if (!fields.includes(path.replace(/\/\d\//g, '/*/'))) {
          throw new Error(genMessageX('update collection field', path));
        }
      } else if (!fields.includes(path)) {
        throw new Error(genMessageX('update field', path));
      }
    }
  }

  return true;
};

export default {
  isVerbAuthorized,
  checkPerm,
};
