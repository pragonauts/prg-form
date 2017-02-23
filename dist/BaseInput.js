'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LabeledControl = require('./LabeledControl');

var _LabeledControl2 = _interopRequireDefault(_LabeledControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseInput = function (_Component) {
    _inherits(BaseInput, _Component);

    function BaseInput(props, context) {
        _classCallCheck(this, BaseInput);

        var _this = _possibleConstructorReturn(this, (BaseInput.__proto__ || Object.getPrototypeOf(BaseInput)).call(this, props, context));

        _this.name = props.name;

        _this.id = 'input-' + props.name;

        _this.element = null;

        _this.state = {
            value: props.value || props.defaultValue,
            error: null
        };

        _this.mounted = false;
        return _this;
    }

    _createClass(BaseInput, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.mounted = true;
            if (this.context.inputWillMount && typeof this.props.value === 'undefined') {
                this.context.inputWillMount(this);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            if (this.props.autofocus && this.element) {
                setTimeout(function () {
                    return _this2.element.focus();
                }, 400);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (typeof nextProps.value !== 'undefined') {
                this.setValue(nextProps.value);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.context.onChangeInput && prevState.value !== this.state.value) {

                this.context.onChangeInput(this);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.context.inputWillUnmount && typeof this.props.value === 'undefined') {
                this.context.inputWillUnmount(this);
            }
            this.mounted = false;
            this.element = null;
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var val = this.setValue(e.target.value);
            this.props.onChange(val, this);
        }
    }, {
        key: 'onBlur',
        value: function onBlur() {
            this.props.onBlur(this);
        }
    }, {
        key: 'onFocus',
        value: function onFocus() {
            this.props.onFocus(this);
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
        key: 'getValue',
        value: function getValue() {
            return this.state.value;
        }
    }, {
        key: 'setError',
        value: function setError() {
            var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (!this.mounted) {
                return;
            }
            this.setState({ error: error });
        }
    }, {
        key: 'getInputClass',
        value: function getInputClass() {
            var className = this.props.className;
            var error = this.state.error;


            var inputClass = this.props.defaultInputClass;

            if (className) {
                inputClass += ' ' + className;
            }

            if (error) {
                inputClass += ' is-danger';
            }

            return inputClass;
        }
    }, {
        key: 'getControlClass',
        value: function getControlClass() {
            var controlClass = this.props.controlClass;
            var error = this.state.error;


            var controlClassName = controlClass || '';

            if (error) {
                controlClassName += ' has-icon-right';
            }

            if (this.props.iconBefore || error) {
                controlClassName += ' has-icon';
            }

            return controlClassName;
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _this3 = this;

            var _props = this.props,
                type = _props.type,
                disabled = _props.disabled,
                placeholder = _props.placeholder,
                required = _props.required,
                readOnly = _props.readOnly,
                maxLength = _props.maxLength;
            var value = this.state.value;


            return _react2.default.createElement('input', {
                id: this.id,
                className: this.getInputClass(),
                name: this.name,
                type: type,
                placeholder: placeholder,
                disabled: disabled,
                onChange: function onChange(e) {
                    return _this3.onChange(e);
                },
                onBlur: function onBlur(e) {
                    return _this3.onBlur(e);
                },
                onFocus: function onFocus(e) {
                    return _this3.onFocus(e);
                },
                value: value,
                ref: function ref(e) {
                    _this3.element = e;
                },
                required: required,
                readOnly: readOnly,
                maxLength: maxLength
            });
        }
    }, {
        key: 'renderIconBefore',
        value: function renderIconBefore() {
            if (!this.props.iconBefore) {
                return null;
            }

            return _react2.default.createElement(
                'span',
                { className: 'icon is-small' },
                this.props.iconBefore
            );
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon() {
            if (!this.state.error) {
                return null;
            }

            return _react2.default.createElement(
                'span',
                { className: 'icon is-small' },
                _react2.default.createElement('i', { className: 'fa fa-warning' })
            );
        }
    }, {
        key: 'renderError',
        value: function renderError() {
            if (!this.state.error) {
                return null;
            }

            return _react2.default.createElement(
                'span',
                { className: 'help is-danger' },
                this.state.error
            );
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

    return BaseInput;
}(_react.Component);

BaseInput.propTypes = {
    name: _react.PropTypes.string.isRequired,
    placeholder: _react.PropTypes.string,
    label: _react.PropTypes.oneOfType([_react.PropTypes.any]),
    type: _react.PropTypes.string,
    className: _react.PropTypes.string,
    controlClass: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    defaultInputClass: _react.PropTypes.string,
    defaultValue: _react.PropTypes.oneOfType([_react.PropTypes.any]),
    autofocus: _react.PropTypes.bool,
    required: _react.PropTypes.bool,
    readOnly: _react.PropTypes.bool,
    iconBefore: _react.PropTypes.oneOfType([_react.PropTypes.any]),
    value: _react.PropTypes.oneOfType([_react.PropTypes.any]),
    onChange: _react.PropTypes.func,
    onBlur: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    maxLength: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
};

BaseInput.defaultProps = {
    disabled: false,
    defaultInputClass: 'input',
    label: null,
    defaultValue: '',
    onChange: function onChange() {},
    onBlur: function onBlur() {},
    onFocus: function onFocus() {},
    type: null,
    className: null,
    controlClass: null,
    placeholder: null,
    autofocus: false,
    required: false,
    readOnly: false,
    iconBefore: null,
    value: undefined,
    maxLength: null
};

BaseInput.contextTypes = {
    inputWillMount: _react.PropTypes.func,
    onChangeInput: _react.PropTypes.func,
    inputWillUnmount: _react.PropTypes.func
};

exports.default = BaseInput;