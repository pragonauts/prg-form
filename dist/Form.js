'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _path = require('./path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

        _this.inputs = new Map();
        return _this;
    }

    _createClass(Form, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var _this2 = this;

            return {
                inputWillMount: function inputWillMount(input) {
                    return _this2.inputWillMount(input);
                },
                onChangeInput: function onChangeInput(input) {
                    return _this2.onChangeInput(input);
                },
                inputWillUnmount: function inputWillUnmount(input) {
                    return _this2.inputWillUnmount(input);
                }
            };
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _this3 = this;

            if (prevProps.values !== this.props.values) {
                this.inputs.forEach(function (input, name) {
                    input.setValue((0, _path.getValue)(_this3.props.values, name));
                });
            }
        }
    }, {
        key: 'onChangeInput',
        value: function onChangeInput(input) {
            this.props.onChange(input);
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            this.props.onSubmit(this.getValues(), this);
            e.preventDefault();
            e.stopPropagation();
        }
    }, {
        key: 'getValues',
        value: function getValues() {
            var ret = {};
            this.inputs.forEach(function (input, name) {
                (0, _path.createTree)(input.getValue(), name, ret);
            });
            return ret;
        }
    }, {
        key: 'setErrors',
        value: function setErrors(errorList) {
            this.inputs.forEach(function (input, name) {
                if (typeof errorList[name] !== 'undefined') {
                    input.setError(errorList[name]);
                } else {
                    input.setError(null);
                }
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            var _this4 = this;

            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            this.inputs.forEach(function (input, name) {
                if (data !== null) {
                    input.resetValue((0, _path.getValue)(_this4.props.values, name));
                } else {
                    input.resetValue();
                }
            });
        }
    }, {
        key: 'inputWillMount',
        value: function inputWillMount(input) {
            this.inputs.set(input.name, input);
            input.setValue((0, _path.getValue)(this.props.values, input.name));
        }
    }, {
        key: 'inputWillUnmount',
        value: function inputWillUnmount(input) {
            this.inputs.delete(input.name);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this5 = this;

            var _props = this.props,
                children = _props.children,
                className = _props.className;

            return _react2.default.createElement(
                'form',
                {
                    onSubmit: function onSubmit(e) {
                        return _this5.onSubmit(e);
                    },
                    className: className
                },
                children
            );
        }
    }]);

    return Form;
}(_react.Component);

Form.childContextTypes = {
    inputWillMount: _propTypes2.default.func,
    onChangeInput: _propTypes2.default.func,
    inputWillUnmount: _propTypes2.default.func
};

Form.propTypes = {
    className: _propTypes2.default.string,
    values: _propTypes2.default.objectOf(_propTypes2.default.any),
    children: _propTypes2.default.oneOfType([_propTypes2.default.any]),
    onChange: _propTypes2.default.func,
    onSubmit: _propTypes2.default.func
};

Form.defaultProps = {
    values: {},
    className: null,
    children: null,
    onChange: function onChange() {},
    onSubmit: function onSubmit() {}
};

exports.default = Form;