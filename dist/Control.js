'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
    className: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.any])
};

Control.defaultProps = {
    className: null,
    children: null
};

exports.default = Control;