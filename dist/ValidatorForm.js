'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValidatorForm = function (_Component) {
    _inherits(ValidatorForm, _Component);

    function ValidatorForm(props) {
        _classCallCheck(this, ValidatorForm);

        var _this = _possibleConstructorReturn(this, (ValidatorForm.__proto__ || Object.getPrototypeOf(ValidatorForm)).call(this, props));

        _this.form = null;
        return _this;
    }

    _createClass(ValidatorForm, [{
        key: 'onChange',
        value: function onChange(input) {
            var _props = this.props,
                validator = _props.validator,
                validatorContext = _props.validatorContext,
                t = _props.t,
                onChange = _props.onChange;

            onChange(input);
            validator.validateProp(input.name, input.getValue(), validatorContext, this.getValues()).then(function () {
                return input.setError(null);
            }).catch(function (e) {
                input.setError(t(e.message));
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(data, form) {
            var _this2 = this;

            this.props.onBeforeValidate(data);
            this.props.validator.validate(data, this.props.validatorContext, true).then(function () {
                return form.setErrors({});
            }).then(function () {
                return _this2.props.onSubmit(data, form);
            }).catch(function (errors) {
                _this2.props.onValidationFailed(errors);
                if (Array.isArray(errors)) {
                    form.setErrors(errors.reduce(function (obj, e) {
                        return Object.assign(obj, _defineProperty({}, e.property, _this2.props.t(e.message)));
                    }, {}));
                } else if ((typeof errors === 'undefined' ? 'undefined' : _typeof(errors)) === 'object' && !(errors instanceof Error)) {
                    form.setErrors(errors);
                } else {
                    throw errors;
                }
            });
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            if (!this.form) {
                return {};
            }
            return this.form.getValues();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                values = _props2.values,
                children = _props2.children,
                className = _props2.className;

            return _react2.default.createElement(
                _Form2.default,
                {
                    values: values,
                    onSubmit: function onSubmit(data, form) {
                        return _this3.onSubmit(data, form);
                    },
                    onChange: function onChange(data, form) {
                        return _this3.onChange(data, form);
                    },
                    ref: function ref(el) {
                        _this3.form = el;
                    },
                    className: className
                },
                children
            );
        }
    }]);

    return ValidatorForm;
}(_react.Component);

ValidatorForm.propTypes = {
    t: _propTypes2.default.func,
    className: _propTypes2.default.string,
    children: _propTypes2.default.oneOfType([_propTypes2.default.any]),
    values: _propTypes2.default.objectOf(_propTypes2.default.any),
    onSubmit: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onBeforeValidate: _propTypes2.default.func,
    onValidationFailed: _propTypes2.default.func,
    validatorContext: _propTypes2.default.string,
    validator: _propTypes2.default.shape({
        validateProp: _propTypes2.default.func,
        validate: _propTypes2.default.func
    }).isRequired
};

ValidatorForm.defaultProps = {
    className: null,
    children: null,
    values: null,
    t: function t(w) {
        return w;
    },
    validatorContext: null,
    onSubmit: function onSubmit() {},
    onChange: function onChange() {},
    onBeforeValidate: function onBeforeValidate() {},
    onValidationFailed: function onValidationFailed() {}
};

exports.default = ValidatorForm;