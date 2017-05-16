'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BaseInput2 = require('./BaseInput');

var _BaseInput3 = _interopRequireDefault(_BaseInput2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var File = function (_BaseInput) {
    _inherits(File, _BaseInput);

    function File(props, context) {
        _classCallCheck(this, File);

        var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, props, context));

        if (props.multiple && !_this.name.match(/\[\]$/)) {
            _this.name = _this.name + '[]';
        }
        return _this;
    }

    _createClass(File, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.value !== this.state.value) {
                var isEmpty = this.state.value === null || this.state.value.length === 0;

                if (prevState.value && this.mounted && isEmpty) {
                    this.element.value = '';
                }

                if (this.context.onChangeInput) {
                    this.context.onChangeInput(this);
                }
            }
        }
    }, {
        key: 'setValue',
        value: function setValue(value) {
            var set = void 0;
            if (value === null || typeof value === 'undefined') {
                set = this.props.multiple ? [] : null;
            } else {
                set = value;
            }
            if (this.mounted) {
                this.setState({ value: set });
            }
            return set;
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var newValue = e.target.files;
            if (this.props.multiple) {
                newValue = new Array(newValue.length);
                for (var i = 0; i < e.target.files.length; i++) {
                    newValue[i] = e.target.files[i];
                }
            } else if (newValue.length === 0) {
                newValue = null;
            } else if (!this.props.multiple) {
                newValue = newValue[0];
            }
            var val = this.setValue(newValue);
            this.props.onChange(val, this);
            if (this.context.onChangeInput && val === this.state.value) {

                this.context.onChangeInput(this);
            }
        }
    }, {
        key: 'renderInput',
        value: function renderInput() {
            var _this2 = this;

            var _props = this.props,
                disabled = _props.disabled,
                name = _props.name,
                required = _props.required,
                readOnly = _props.readOnly,
                multiple = _props.multiple;


            return _react2.default.createElement('input', {
                id: this.id,
                className: this.getInputClass(),
                name: name,
                type: 'file',
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
                multiple: multiple
            });
        }
    }]);

    return File;
}(_BaseInput3.default);

File.propTypes = Object.assign({}, _BaseInput3.default.propTypes, {
    multiple: _propTypes2.default.bool,
    required: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool])
});

File.defaultProps = Object.assign({}, _BaseInput3.default.defaultProps, {
    type: 'file',
    defaultInputClass: 'file',
    defaultValue: null
});

exports.default = File;