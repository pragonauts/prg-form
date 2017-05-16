/**
 * @author David Menger
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LabeledControl from './LabeledControl';

/**
 * Common Input Interface - ABSTRACT
 *
 * ## PropTypes
 *
 * | property | type | type signature | description |
 * |----------|------|----------------|-------------|
 * | `name` | `string` | **required** | input name (you can use dots and array indexes)
 * | `placeholder` | `string` | | input placeholder (only some inputs)
 * | `label` | `string` | | input label
 * | `type` | `string` | |  input type (only some inputs)
 * | `className` | `string` | | input class
 * | `controlClass` | `string` | | surrounding paragraph class
 * | `defaultValue` | `any` | | is used, when input value is falsey
 * | `value` | `any` | | use, when input is operated outside `<Form>`
 * | `onChange` | `function` | `(value, input) => {}` | fired, when input is changed
 * | `onFocus` | `function` | `(input) => {}` | fired, when input is focused
 * | `onBlur` | `function` | `(input) => {}` | fired, when input is blured
 * | `disabled` | `boolean` | | disable input
 * | `readOnly` | `boolean` | | only read
 * | `required` | `boolean` | | input is required - HTML attribute
 * | `maxLength` | `number` | | maximal length (only some inputs)
 * | `iconBefore` | `any`   | | content shown before input
 *
 * @class BaseInput
 * @extends {Component}
 * @example
 * <Input
 *     name="inputs[0].name"
 *     label="Text of label"
 *     className="input-class"
 *     controlClass="control-container-class"
 *     disabled
 *     required
 *     autofocus
 *     readOnly
 *     defaultValue="some value"
 * />
 */
class BaseInput extends Component {

    constructor (props, context) {
        super(props, context);

        this.name = props.name;

        this.id = `input-${props.name}`;

        this.element = null;

        this.state = {
            value: props.value || props.defaultValue,
            error: null
        };

        this.mounted = false;
    }

    componentWillMount () {
        this.mounted = true;
        if (this.context.inputWillMount && typeof this.props.value === 'undefined') {
            this.context.inputWillMount(this);
        }
    }

    componentDidMount () {
        if (this.props.autofocus && this.element) {
            setTimeout(() => this.element.focus(), 400);
        }
    }

    componentWillReceiveProps (nextProps) {
        if (typeof nextProps.value !== 'undefined') {
            this.setValue(nextProps.value);
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.context.onChangeInput
            && prevState.value !== this.state.value) {

            this.context.onChangeInput(this);
        }
    }

    componentWillUnmount () {
        if (this.context.inputWillUnmount && typeof this.props.value === 'undefined') {
            this.context.inputWillUnmount(this);
        }
        this.mounted = false;
        this.element = null;
    }

    onChange (e) {
        const val = this.setValue(e.target.value);
        this.props.onChange(val, this);
    }

    onBlur () {
        this.props.onBlur(this);
    }

    onFocus () {
        this.props.onFocus(this);
    }

    /**
     * Set new value to input
     *
     * @param {any} value
     * @returns {any}
     *
     * @memberOf BaseInput
     * @example
     * // reset to default value
     * input.setValue()
     *
     * // set value
     * input.setValue('another');
     */
    setValue (value) {
        let set;
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

    /**
     * Returns input value
     *
     * @returns {any}
     *
     * @memberOf BaseInput
     */
    getValue () {
        return this.state.value;
    }

    /**
     * Show error
     *
     * @param {string} [error=null] - error message or nothing to remove error
     *
     * @memberOf BaseInput
     */
    setError (error = null) {
        if (!this.mounted) {
            return;
        }
        this.setState({ error });
    }

    getInputClass () {
        const { className } = this.props;
        const { error } = this.state;

        let inputClass = this.props.defaultInputClass;

        if (className) {
            inputClass += ` ${className}`;
        }

        if (error) {
            inputClass += ' is-danger';
        }

        return inputClass;
    }

    getControlClass () {
        const { controlClass } = this.props;
        const { error } = this.state;

        let controlClassName = controlClass || '';

        if (error) {
            controlClassName += ' has-icon-right';
        }

        if (this.props.iconBefore || error) {
            controlClassName += ' has-icon';
        }

        return controlClassName;
    }

    renderInput () {
        const { type, disabled, placeholder, required, readOnly, maxLength } = this.props;
        const { value } = this.state;

        return (<input
            id={this.id}
            className={this.getInputClass()}
            name={this.name}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={e => this.onChange(e)}
            onBlur={e => this.onBlur(e)}
            onFocus={e => this.onFocus(e)}
            value={value}
            ref={(e) => { this.element = e; }}
            required={required}
            readOnly={readOnly}
            maxLength={maxLength}
        />);
    }

    renderIconBefore () {
        if (!this.props.iconBefore) {
            return null;
        }

        return (<span className="icon is-small">
            {this.props.iconBefore}
        </span>);
    }

    renderIcon () {
        if (!this.state.error) {
            return null;
        }

        return (<span className="icon is-small">
            <i className="fa fa-warning" />
        </span>);
    }

    renderError () {
        if (!this.state.error) {
            return null;
        }

        return (<span className="help is-danger">{this.state.error}</span>);
    }

    render () {
        const { label } = this.props;

        return (<LabeledControl
            label={label}
            className={this.getControlClass()}
            id={this.id}
        >
            {this.renderIconBefore()}
            {this.renderInput()}
            {this.renderIcon()}
            {this.renderError()}
        </LabeledControl>);
    }

}

BaseInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.any]),
    type: PropTypes.string,
    className: PropTypes.string,
    controlClass: PropTypes.string,
    disabled: PropTypes.bool,
    defaultInputClass: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.any]),
    autofocus: PropTypes.bool,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    iconBefore: PropTypes.oneOfType([PropTypes.any]),
    value: PropTypes.oneOfType([PropTypes.any]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

BaseInput.defaultProps = {
    disabled: false,
    defaultInputClass: 'input',
    label: null,
    defaultValue: '',
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
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
    inputWillMount: PropTypes.func,
    onChangeInput: PropTypes.func,
    inputWillUnmount: PropTypes.func
};


export default BaseInput;
