/**
 * @author David Menger
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

/**
 * Form with integrated validation support
 * - use with [Prg Validator](https://github.com/pragonauts/prg-validator) utility
 *
 * ## PropTypes
 *
 * | property | type | type signature | description |
 * |----------|------|----------------|-------------|
 * | `t`      | `function` | `word => 'string'` | translator provided to validator
 * | `className` | `string` | | form class name
 * | `validator` | `string` | **required** | validator
 * | `values` | `object` | | values to fill the form
 * | `onChange` | `function` | `(inputName, input) => {}`) | form change handler
 * | `onBeforeValidate` | `function` | `(values) => {}` | fired after submit, before validation
 * | `onSubmit` | `function` | `(values) => {}` | fired after sucessfully validated submit
 * | `onValidationFailed` | `function` | `(errors) => {}` | fired after unsucessfull validation
 * | `validatorContext` | `string` |  | is provided as parameter to validator
 *
 * ## Validator interface
 *
 * - **validateProp(`inputName: string, value: any,  ctx: string, data: object`) : Promise**
 *     + fired after `onChange` event
 *     + `inputName` - name of the input
 *     + `value` - current input value
 *     + `ctx` - passed `validatorContext`
 *     + `data` - values of other inputs in form
 * - **validate(`data: object, ctx: string`) : Promise**
 *     + fired after `onSubmit` event
 *     + `data` - whole form data
 *     + `ctx` - passed `validatorContext`
 *
 * @class ValidatorForm
 * @extends {Component}
 * @example
 * import { ValidatorForm, Input } from 'prg-form';
 * import Validator from 'prg-validator';
 *
 * function MyForm ({ values }) {
 *     const validator = new Validator();
 *
 *     validator.add('email')
 *         .isEmail('Email should be valid');
 *
 *     return (
 *         <ValidatorForm
 *             className="special-class"
 *             onSubmit={(values, form) => console.log(values)}
 *             onChange={(input) => console.log(input.name, input.getValue())}
 *             validator={validator}
 *             values={values}
 *         >
 *              <Input type="email" name="inputName" label="Input Label" />
 *         </Form>
 *     );
 * }
 */
class ValidatorForm extends Component {

    constructor (props) {
        super(props);

        this.form = null;
    }

    onChange (input) {
        const { validator, validatorContext, t, onChange } = this.props;
        onChange(input);
        validator.validateProp(input.name, input.getValue(), validatorContext, this.getValues())
            .then(() => input.setError(null))
            .catch((e) => {
                input.setError(t(e.message));
            });
    }

    onSubmit (data, form) {
        this.props.onBeforeValidate(data);
        this.props.validator.validate(data, this.props.validatorContext, true)
            .then(() => form.setErrors({}))
            .then(() => this.props.onSubmit(data, form))
            .catch((errors) => {
                this.props.onValidationFailed(errors);
                if (Array.isArray(errors)) {
                    form.setErrors(errors
                        .reduce((obj, e) => Object.assign(obj, {
                            [e.property]: this.props.t(e.message)
                        }), {})
                    );
                } else if (typeof errors === 'object' && !(errors instanceof Error)) {
                    form.setErrors(errors);
                } else {
                    throw errors;
                }
            });
    }

    /**
     * Returns form values
     *
     * @returns {object}
     *
     * @memberOf ValidatorForm
     */
    getValues () {
        if (!this.form) {
            return {};
        }
        return this.form.getValues();
    }

    render () {
        const { values, children, className } = this.props;
        return (<Form
            values={values}
            onSubmit={(data, form) => this.onSubmit(data, form)}
            onChange={(data, form) => this.onChange(data, form)}
            ref={(el) => { this.form = el; }}
            className={className}
        >
            {children}
        </Form>);
    }

}

/**
 * @type {object}
 */
ValidatorForm.propTypes = {
    t: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.any]),
    values: PropTypes.objectOf(PropTypes.any),
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    onBeforeValidate: PropTypes.func,
    onValidationFailed: PropTypes.func,
    validatorContext: PropTypes.string,
    validator: PropTypes.shape({
        validateProp: PropTypes.func,
        validate: PropTypes.func
    }).isRequired
};

ValidatorForm.defaultProps = {
    className: null,
    children: null,
    values: null,
    t: w => w,
    validatorContext: null,
    onSubmit: () => {},
    onChange: () => {},
    onBeforeValidate: () => {},
    onValidationFailed: () => {}
};

export default ValidatorForm;
