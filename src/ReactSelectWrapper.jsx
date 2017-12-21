/**
 * @author David Menger
 */

import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';
import LabeledControl from './LabeledControl';

/**
 * Wrapper for React Select
 *
 * ## PropTypes
 *
 * | property | type | type signature | description |
 * |----------|------|----------------|-------------|
 * | `name` | `string` | **required** | input name (you can use dots and array indexes)
 * | `Component` | `<Select>` | **required** | react select component
 * | `label` | `string` | | input label
 * | `className` | `string` | | input class
 * | `controlClass` | `string` | | surrounding paragraph class
 * | `defaultValue` | `any` | | is used, when input value is falsey
 * | `value` | `any` | | use, when input is operated outside `<Form>`
 * | `onChange` | `function` | `(value, input) => {}` | fired, when input is changed
 * | `disabled` | `boolean` | | disable input
 * | `readOnly` | `boolean` | | only read
 * | `required` | `boolean` | | input is required - HTML attribute
 *
 * @class Checkbox
 * @extends {BaseInput}
 * @example
 * import Select from 'react-select';
 *
 * <ReactSelectWrapper
 *     name="someSelect"
 *     Component={Select}
 * />
 *
 */
class ReactSelectWrapper extends BaseInput {

    renderInput () {
        const { disabled, name, placeholder, required, readOnly, autofocus } = this.props;
        const { value } = this.state;
        const { Component, options } = this.props;

        const setProps = Object.assign({}, this.props);

        delete setProps.autofocus;

        return (<Component
            {...setProps}
            autoFocus={autofocus}
            id={this.id}
            className={this.getInputClass()}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            onChange={e => this.onChange(e)}
            onBlur={e => this.onBlur(e)}
            onFocus={e => this.onFocus(e)}
            ref={(e) => { this.element = e; }}
            required={required}
            readOnly={readOnly}
            value={value}
            options={options}
        />);
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

ReactSelectWrapper.propTypes = Object.assign({}, BaseInput.propTypes, {
    Component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    options: PropTypes.arrayOf(PropTypes.object)
});

ReactSelectWrapper.defaultProps = Object.assign({}, BaseInput.defaultProps, {
    type: 'select',
    defaultInputClass: 'select',
    options: []
});

export default ReactSelectWrapper;
