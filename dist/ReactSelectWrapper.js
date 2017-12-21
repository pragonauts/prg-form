'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        key: 'onChange',
        value: function onChange(value) {
            var val = void 0;
            if (Array.isArray(value)) {
                val = value.map(function (v) {
                    return v.value;
                });
            } else if (value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                val = value.value;
            } else {
                val = value;
            }
            val = this.setValue(val);
            this.props.onChange(val, this);
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var set = void 0;
            if (value === null || typeof value === 'undefined') {
                set = this.props.defaultValue;
            } else {
                set = value;
            }
            if (this.mounted) {
                this.setState({ value: set });
            }
            return set;
        }
    }, {
        key: '_getOptions',
        value: function _getOptions() {
            var value = this.state.value;
            var _props = this.props,
                options = _props.options,
                multi = _props.multi;


            if (options) {
                return options;
            } else if (multi && Array.isArray(value)) {
                return value.map(function (v) {
                    return { value: v, label: v };
                });
            } else if (!multi && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
                return [{ value: value, label: '' + value }];
            }
            return [];
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _this2 = this;

            var _props2 = this.props,
                disabled = _props2.disabled,
                name = _props2.name,
                placeholder = _props2.placeholder,
                required = _props2.required,
                readOnly = _props2.readOnly,
                autofocus = _props2.autofocus;
            var value = this.state.value;
            var Component = this.props.Component;


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
                options: this._getOptions()
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
    options: _propTypes2.default.arrayOf(_propTypes2.default.object),
    multi: _propTypes2.default.bool
});

ReactSelectWrapper.defaultProps = Object.assign({}, _BaseInput3.default.defaultProps, {
    type: 'select',
    defaultInputClass: '',
    options: null,
    multi: false
});

exports.default = ReactSelectWrapper;