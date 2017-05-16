/**
 * @author David Menger
 */

import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput';

/**
 * TextArea input
 * In Addition to {BaseInput} has theese props:
 *
 * ## PropTypes
 *
 * | property | type | type signature | description |
 * |----------|------|----------------|-------------|
 * | `name` | `string` | **required** | input name (you can use dots and array indexes)
 * | `placeholder` | `string` | | input placeholder
 * | `label` | `string` | | input label
 * | `type` | `string` | `"text"` |  input type
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
 * | `maxLength` | `number` | | maximal length
 * | `iconBefore` | `any`   | | content shown before input
 * | `cols` | `number|string` | | cols attribute of textarea
 * | `rows` | `number|string` | | rows attribute of textarea
 *
 *
 * @class TextArea
 * @extends {BaseInput}
 * @example
 * <TextArea
 *     name="inputName"
 *     cols={20}
 *     rows={5}
 * />
 */
class TextArea extends BaseInput {

    renderInput () {
        const {
            disabled,
            name,
            placeholder,
            cols,
            rows,
            required,
            readOnly,
            maxLength
        } = this.props;
        const { value } = this.state;

        return (<textarea
            id={this.id}
            className={this.getInputClass()}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            onChange={e => this.onChange(e)}
            onBlur={e => this.onBlur(e)}
            onFocus={e => this.onFocus(e)}
            value={value}
            cols={cols}
            rows={rows}
            ref={(e) => { this.element = e; }}
            required={required}
            readOnly={readOnly}
            maxLength={maxLength}
        />);
    }

}

TextArea.propTypes = Object.assign({}, BaseInput.propTypes, {
    cols: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
});

TextArea.defaultProps = Object.assign({}, BaseInput.defaultProps, {
    rows: 5,
    defaultInputClass: 'textarea',
    defaultValue: ''
});

export default TextArea;
