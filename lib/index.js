var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const SYNC = 'SYNC';
const NAMESPACE_SEP = '/';
const NAMESPACE_IN = '@';

function autoSync() {
  const onReducer = reducer => (state, action) => {
    const sta = reducer(state, action);
    const { type } = action,
          payload = _objectWithoutProperties(action, ['type']);
    const namespace = isSyncAction(type);

    if (namespace) {
      return _extends({}, sta, {
        [`${ namespace }`]: _extends({}, sta[namespace], payload)
      });
    }

    return sta;
  };

  return {
    onReducer
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

export { autoSync as default };