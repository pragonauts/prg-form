'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

var _LabeledControl = require('./LabeledControl');

var _LabeledControl2 = _interopRequireDefault(_LabeledControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSelectWrapper = function (_BaseInput) {
    _inherits(ReactSelectWrapper, _BaseInput);

    function ReactSelectWrapper() {
        _classCallCheck(this, ReactSelectWrapper);

        return _possibleConstructorReturn(this, (ReactSelectWrapper.__proto__ || Object.getPrototypeOf(ReactSelectWrapper)).apply(this, arguments));
    }

    _createClass(ReactSelectWrapper, [{
        key: 'renderInput',
        value: function renderInput() {
            var _this2 = this;

            var _props = this.props,
                disabled = _props.disabled,
                name = _props.name,
                placeholder = _props.placeholder,
                required = _props.required,
                readOnly = _props.readOnly,
                autofocus = _props.autofocus;
            var value = this.state.value;
            var _props2 = this.props,
                Component = _props2.Component,
                options = _props2.options;


            var setProps = Object.assign({}, this.props);

            delete setProps.autofocus;

            return _react2.default.createElement(Component, _extends({}, setProps, {
                autoFocus: autofocus,
                id: this.id,
                className: this.getInputClass(),
                name: name,
                placeholder: placeholder,
                disabled: disabled,
                onChange: function onChange(e) {
                    return _this2.onChange(e);
                },
                onBlur: function onBlur(e) {
                    return _this2.onBlur(e);
                },
                onFocus: function onFocus(e) {
                    return _this2.onFocus(e);
                },
                ref: function ref(e) {
                    _this2.element = e;
                },
                required: required,
                readOnly: readOnly,
                value: value,
                options: options
            }));
        }
    }, {
        key: 'render',
        value: function render() {
            var label = this.props.label;


            return _react2.default.createElement(
                _LabeledControl2.default,
                {
                    label: label,
                    className: this.getControlClass(),
                    id: this.id
                },
                this.renderIconBefore(),
                this.renderInput(),
                this.renderIcon(),
                this.renderError()
            );
        }
    }]);

    return ReactSelectWrapper;
}(_BaseInput3.default);

ReactSelectWrapper.propTypes = Object.assign({}, _BaseInput3.default.propTypes, {
    Component: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]).isRequired,
    options: _propTypes2.default.arrayOf(_propTypes2.default.object)
});

ReactSelectWrapper.defaultProps = Object.assign({}, _BaseInput3.default.defaultProps, {
    type: 'select',
    defaultInputClass: 'select',
    options: []
});

exports.default = ReactSelectWrapper;