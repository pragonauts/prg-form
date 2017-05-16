'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Control(_ref) {
    var className = _ref.className,
        children = _ref.children;

    var controlClass = 'control';
    if (className) {
        controlClass += ' ' + className;
    }
    return _react2.default.createElement(
        'p',
        { className: controlClass },
        children
    );
}

Control.propTypes = {
    className: _propTypes2.default.string,
    children: _propTypes2.default.oneOfType([_propTypes2.default.any])
};

Control.defaultProps = {
    className: null,
    children: null
};

exports.default = Control;