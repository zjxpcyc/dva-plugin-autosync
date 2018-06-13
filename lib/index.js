'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var SYNC = 'SYNC';
var NAMESPACE_SEP = '/';
var NAMESPACE_IN = '@';

function autoSync() {
  var onReducer = function onReducer(reducer) {
    return function (state, action) {
      var sta = reducer(state, action);

      var type = action.type,
          payload = _objectWithoutProperties(action, ['type']);

      var namespace = isSyncAction(type);

      if (namespace) {
        return _extends({}, sta, _defineProperty({}, '' + namespace, _extends({}, sta[namespace], payload)));
      }

      return sta;
    };
  };

  return {
    onReducer: onReducer
  };
}

// isSyncAction 是否目的 action, 成功返回 namespace
function isSyncAction(type) {
  if (type.indexOf(NAMESPACE_SEP) > -1) {
    var _type$split = type.split(NAMESPACE_SEP),
        _type$split2 = _slicedToArray(_type$split, 2),
        nsp = _type$split2[0],
        typ = _type$split2[1];

    if (nsp && typ === SYNC) {
      return nsp.replace(/^@@/, '');
    }
  } else if (type.indexOf(NAMESPACE_IN) > -1) {
    var _type$split3 = type.split(NAMESPACE_IN),
        _type$split4 = _slicedToArray(_type$split3, 2),
        _typ = _type$split4[0],
        _nsp = _type$split4[1];

    if (_nsp && _typ === SYNC) {
      return _nsp;
    }
  }

  return false;
}

exports.default = autoSync;