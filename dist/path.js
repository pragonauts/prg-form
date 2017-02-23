'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.shallowDiff = shallowDiff;
exports.createTree = createTree;
exports.shallowToDeep = shallowToDeep;
exports.pathToFormBrackets = pathToFormBrackets;
exports.flat = flat;
exports.getValue = getValue;
exports.join = join;

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function pathToDots(path) {
    return ('' + path).replace(/\[([^\]]+)]/g, '.$1').replace(/^\./, '').split('.');
}

function shallowDiff(old, current) {
    var has = 0;
    var left = void 0;
    var right = void 0;
    var differences = Object.keys(old).filter(function (key) {
        if (!{}.hasOwnProperty.call(current, key)) {
            return true;
        }
        has++;

        left = old[key];
        right = current[key];

        left = left === 0 ? '0' : '' + (left || '');
        right = right === 0 ? '0' : '' + (right || '');

        return left !== right;
    });

    if (has !== Object.keys(current).length) {
        Object.keys(current).forEach(function (key) {
            if (!{}.hasOwnProperty.call(old, key)) {
                differences.push(key);
            }
        });
    }

    return differences;
}

function createTree(value, path) {
    var object = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    if (typeof path === 'undefined') {
        if (object && !Array.isArray(value)) {
            object.push(value);
            return object;
        }
        return value;
    }
    var ret = object;

    var _pathToDots = pathToDots(path),
        _pathToDots2 = _toArray(_pathToDots),
        attr = _pathToDots2[0],
        nextPath = _pathToDots2.slice(1);

    var keyAsNum = parseInt(attr, 10);
    var isArray = !isNaN(keyAsNum);
    var key = attr;

    if (isArray) {
        if (isArray) {
            key = keyAsNum;
        }
        if (ret === undefined) {
            ret = [];
        }
    } else if (ret === undefined) {
        ret = {};
    }

    if (attr.match(/\[\]$/) && nextPath.length === 0) {
        key = key.replace(/\[\]$/, '');
        if (ret[key] === undefined) {
            ret[key] = [];
        }
    }

    ret[key] = createTree(value, nextPath.join('.') || undefined, ret[key]);
    return ret;
}

function shallowToDeep(shallowObject) {
    var ret = {};
    if ((typeof shallowObject === 'undefined' ? 'undefined' : _typeof(shallowObject)) !== 'object' || shallowObject === null) {
        return ret;
    }
    Object.keys(shallowObject).forEach(function (key) {
        createTree(shallowObject[key], key, ret);
    });
    return ret;
}

function pathToFormBrackets(path) {
    if (path === undefined || path === null) {
        return path;
    }
    return ('' + path).replace(/\.([^.[\]]+)/g, '[$1]');
}

function flat(object) {
    var useFormBrackets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var ret = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var key = void 0;
    if (Array.isArray(object)) {
        object.forEach(function (elem, i) {
            key = path + '[' + i + ']';
            flat(elem, useFormBrackets, key, ret);
        });
    } else if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.constructor === Object) {
        Object.keys(object).forEach(function (attr) {
            if (useFormBrackets && path) {
                key = path + '[' + attr + ']';
            } else {
                key = '' + path + (path ? '.' : '') + attr;
            }
            flat(object[attr], useFormBrackets, key, ret);
        });
    } else if (path) {
        ret[path] = object;
    }
    return ret;
}

function getValue(obj, path) {
    return pathToDots(path).reduce(function (prev, key) {
        if ((typeof prev === 'undefined' ? 'undefined' : _typeof(prev)) !== 'object') {
            return prev;
        } else if (prev === null) {
            return undefined;
        }
        return prev[key];
    }, obj || {});
}

function join(pathAsArray) {
    if (!Array.isArray(pathAsArray)) {
        return '';
    }
    return pathAsArray.reduce(function (prev, key) {
        if (typeof key === 'number') {
            return prev + '[' + key + ']';
        }
        return prev + '.' + key;
    }, '').replace(/^\./, '');
}

exports.default = { flat: flat, getValue: getValue, join: join, shallowDiff: shallowDiff, shallowToDeep: shallowToDeep, pathToFormBrackets: pathToFormBrackets };