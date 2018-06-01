const SYNC = 'SYNC';
const NAMESPACE_SEP = '/';
const NAMESPACE_IN = '@';

function autoSync() {
  const onReducer = reducer => (state, action) => {
    const sta = reducer(state, action);
    const { type, ...payload } = action;
    const namespace = isSyncAction(type);

    if (namespace) {
      return {
        ...sta,
        [`${namespace}`]: {
          ...sta[namespace],
          ...payload,
        },
      };
    }

    return sta;
  };

  return {
    onReducer,
  };
}

// isSyncAction 是否目的 action, 成功返回 namespace
function isSyncAction(type) {
  if (type.indexOf(NAMESPACE_SEP) > -1) {
    const [nsp, typ] = type.split(NAMESPACE_SEP);
    if (nsp && typ === SYNC) {
      return nsp.replace(/^@@/, '');
    }
  } else if (type.indexOf(NAMESPACE_IN) > -1) {
    const [typ, nsp] = type.split(NAMESPACE_IN);
    if (nsp && typ === SYNC) {
      return nsp;
    }
  }

  return false;
}

export {
  autoSync as default,
};
