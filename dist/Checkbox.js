'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

var _Control = require('./Control');

var _Control2 = _interopRequireDefault(_Control);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_BaseInput) {
    _inherits(Checkbox, _BaseInput);

    function Checkbox(props, context) {
        _classCallCheck(this, Checkbox);

        var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, props, context));

        var useValue = props.value || props.defaultValue;

        _this.state.value = _this._getCheckValue(useValue === props.checkValue);
        return _this;
    }

    _createClass(Checkbox, [{
        key: '_getCheckValue',
        value: function _getCheckValue(checked) {
            var checkValue = this.props.checkValue;

            if (checkValue === true) {
                return !!checked;
            }
            return checked ? checkValue : null;
        }
    }, {
        key: 'setValue',
        value: function setValue(input) {
            var value = void 0;
            var useDefaultValue = typeof input === 'undefined' || input === null && typeof this.props.checkValue === 'boolean';

            if (useDefaultValue) {
                value = this.props.defaultValue;
            } else {
                value = this._getCheckValue(input === this.props.checkValue);
            }
            if (this.mounted) {
                this.setState({ value: value });
            }
            return value;
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var value = this._getCheckValue(e.target.checked);
            if (this.mounted) {
                this.setState({ value: value });
            }
            this.props.onChange(value, this);
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _this2 = this;

            var _props = this.props,
                type = _props.type,
                disabled = _props.disabled,
                name = _props.name,
                placeholder = _props.placeholder,
                required = _props.required,
                checkValue = _props.checkValue,
                readOnly = _props.readOnly;
            var value = this.state.value;


            return _react2.default.createElement('input', {
                id: this.id,
                className: this.getInputClass(),
                name: name,
                type: type,
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
                checked: value === checkValue,
                ref: function ref(e) {
                    _this2.element = e;
                },
                required: required,
                readOnly: readOnly
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var label = this.props.label;


            if (!label) {
                return _react2.default.createElement(
                    _Control2.default,
                    { className: this.getControlClass() },
                    this.renderIconBefore(),
                    this.renderInput(),
                    this.renderIcon(),
                    this.renderError()
                );
            }

            return _react2.default.createElement(
                _Control2.default,
                { className: this.getControlClass() },
                _react2.default.createElement(
                    'label',
                    { className: 'checkbox', htmlFor: this.id },
                    this.renderInput(),
                    label,
                    this.renderIcon()
                ),
                this.renderError()
            );
        }
    }]);

    return Checkbox;
}(_BaseInput3.default);

Checkbox.propTypes = Object.assign({}, _BaseInput3.default.propTypes, {
    checkValue: _react.PropTypes.oneOfType([_react.PropTypes.any])
});

Checkbox.defaultProps = Object.assign({}, _BaseInput3.default.defaultProps, {
    type: 'checkbox',
    defaultInputClass: 'checkbox',
    defaultValue: false,
    checkValue: true
});

exports.default = Checkbox;