'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LabeledControl(props) {
    var label = props.label,
        id = props.id;


    if (!label) {
        return _react2.default.createElement(_Control2.default, props);
    }

    return _react2.default.createElement(
        'div',
        { className: 'control' },
        _react2.default.createElement(
            'label',
            { className: 'label', htmlFor: id },
            label
        ),
        _react2.default.createElement(_Control2.default, props)
    );
}

LabeledControl.propTypes = {
    label: _react.PropTypes.oneOfType([_react.PropTypes.any]),
    id: _react.PropTypes.string
};

LabeledControl.defaultProps = {
    label: null,
    id: null
};

exports.default = LabeledControl;