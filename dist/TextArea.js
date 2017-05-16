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

var TextArea = function (_BaseInput) {
    _inherits(TextArea, _BaseInput);

    function TextArea() {
        _classCallCheck(this, TextArea);

        return _possibleConstructorReturn(this, (TextArea.__proto__ || Object.getPrototypeOf(TextArea)).apply(this, arguments));
    }

    _createClass(TextArea, [{
        key: 'renderInput',
        value: function renderInput() {
            var _this2 = this;

            var _props = this.props,
                disabled = _props.disabled,
                name = _props.name,
                placeholder = _props.placeholder,
                cols = _props.cols,
                rows = _props.rows,
                required = _props.required,
                readOnly = _props.readOnly,
                maxLength = _props.maxLength;
            var value = this.state.value;


            return _react2.default.createElement('textarea', {
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
                value: value,
                cols: cols,
                rows: rows,
                ref: function ref(e) {
                    _this2.element = e;
                },
                required: required,
                readOnly: readOnly,
                maxLength: maxLength
            });
        }
    }]);

    return TextArea;
}(_BaseInput3.default);

TextArea.propTypes = Object.assign({}, _BaseInput3.default.propTypes, {
    cols: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    rows: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
});

TextArea.defaultProps = Object.assign({}, _BaseInput3.default.defaultProps, {
    rows: 5,
    defaultInputClass: 'textarea',
    defaultValue: ''
});

exports.default = TextArea;