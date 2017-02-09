/*
 * @author David Menger
 */

import React, { PropTypes } from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import Input from '../src/Input';
import Checkbox from '../src/Checkbox';
import TextArea from '../src/TextArea';

function setValue (app, selector, value) {
    const input = app.find(selector);
    if (typeof value === 'boolean') {
        input.node.checked = value;
    } else {
        input.node.value = value;
    }
    input.simulate('change', input);
}

[
    { Elem: Input, inputSelector: 'input.input' },
    { Elem: Checkbox, inputSelector: 'input.checkbox', fooValue: true, barValue: false, valueProp: 'checked' },
    { Elem: TextArea, inputSelector: 'textarea' }
].forEach(({ Elem, inputSelector, fooValue = 'foo', barValue = 'bar', valueProp = 'value' }) => {

    describe(`<${Elem.name}>`, function () {

        it('should render only input element without the label', function () {
            const app = mount(
                <Elem
                    name="name"
                />
            );

            assert.equal(app.find('p.control').length, 1, 'There should be one p.control');
            assert.equal(app.find('div.control').length, 0, 'There should be no div.control');
            assert(app.childAt(0).is(inputSelector), `Elem not matches ${inputSelector}`);
        });

        it('has element and name property', function () {
            const app = mount(
                <Elem
                    name="name"
                />
            );

            assert.equal(typeof app.node.element, 'object');
            assert.equal(app.node.name, 'name');
        });

        it('should render label if provided', function () {
            const app = mount(
                <Elem
                    name="name"
                    label="Foo"
                />
            );

            assert.equal(app.find('p.control').length, 1, 'There should be one p.control');
            assert.equal(app.find('label').text(), 'Foo', 'There should be a label');
            assert.strictEqual(app.find(inputSelector).length, 1, `Elem not matches ${inputSelector}`);
        });

        it('should display default value', function () {
            const app = mount(
                <Elem
                    name="name"
                    defaultValue={fooValue}
                />
            );

            assert(app.childAt(0).is(inputSelector), `Elem not matches ${inputSelector}`);
            assert.strictEqual(app.childAt(0).prop(valueProp), fooValue);
        });

        it('element fires onChange event', function () {
            const onChange = sinon.spy();

            const app = mount(
                <Elem
                    name="name"
                    onChange={onChange}
                    value={fooValue}
                />
            );

            app.find(inputSelector).simulate('change');

            assert(onChange.calledOnce, 'object');
            assert.deepEqual(onChange.firstCall.args, [fooValue, app.node], 'name');
        });

        it('element fires onFocus event', function () {
            const onFocus = sinon.spy();

            const app = mount(
                <Elem
                    name="name"
                    onFocus={onFocus}
                />
            );

            app.find(inputSelector).simulate('focus');

            assert(onFocus.calledOnce, 'object');
            assert.deepEqual(onFocus.firstCall.args, [app.node], 'name');
        });

        it('element fires onBlur event', function () {
            const onBlur = sinon.spy();

            const app = mount(
                <Elem
                    name="name"
                    onBlur={onBlur}
                />
            );

            app.find(inputSelector).simulate('blur');

            assert(onBlur.calledOnce, 'object');
            assert.deepEqual(onBlur.firstCall.args, [app.node], 'name');
        });

        it('should display value, when its set', function () {
            const app = mount(
                <Elem
                    name="name"
                />
            );

            app.node.setValue(fooValue);
            assert.strictEqual(app.childAt(0).prop(valueProp), fooValue);
        });

        it('should display default value, when the value is unset', function () {
            const app = mount(
                <Elem
                    name="name"
                    defaultValue={fooValue}
                />
            );

            app.node.setValue(barValue);

            let elementValue = fooValue === true ? false : fooValue;
            assert.strictEqual(app.childAt(0).prop(valueProp), barValue);
            assert.strictEqual(app.node.getValue(), barValue);

            app.node.setValue(null);

            elementValue = fooValue === true ? true : fooValue;
            assert.strictEqual(app.childAt(0).prop(valueProp), elementValue);
            assert.strictEqual(app.node.getValue(), fooValue);
        });

        it('should pass class to input', function () {
            const app = mount(
                <Elem
                    name="name"
                    className="inputclass"
                />
            );

            const input = app.find(inputSelector);

            assert(input.hasClass('inputclass'));
        });

        it('should pass class to container', function () {
            const app = mount(
                <Elem
                    name="name"
                    controlClass="container"
                />
            );

            const input = app.find('p.control');

            assert(input.hasClass('container'));
        });

        it('should show and hide nice error with icon', function () {
            const app = mount(
                <Elem
                    name="name"
                    controlClass="container"
                />
            );

            const error = 'Text of the error';

            app.node.setError(error);

            let err = app.find('span.help.is-danger');

            assert.equal(err.length, 1, 'There should be one error');
            assert(app.find('.fa.fa-warning').length === 1);
            assert.equal(err.text(), error);

            app.node.setError(null);

            err = app.find('span.help.is-danger');

            assert.equal(err.length, 0, 'There should be one error');
        });

        it('should pass static input attributes to input', function () {
            const app = mount(
                <Elem
                    name="name"
                    disabled
                    required
                    iconBefore={<i className="iconclass" />}
                />
            );

            // there is icon container
            assert(app.find('span.icon.is-small').length === 1);

            // there is icon
            assert(app.find('i.iconclass').length === 1);

            const input = app.find(inputSelector);

            assert.strictEqual(input.props().disabled, true);
            assert.strictEqual(input.props().required, true);
        });

        it('should have good lifecycle', function () {
            const inputWillMount = sinon.spy();
            const onChangeInput = sinon.spy();
            const inputWillUnmount = sinon.spy();

            const app = mount(
                <Elem
                    name="name"
                />,
                {
                    context: { inputWillMount, onChangeInput, inputWillUnmount },
                    childContextTypes: {
                        inputWillMount: PropTypes.func,
                        onChangeInput: PropTypes.func,
                        inputWillUnmount: PropTypes.func
                    }
                }
            );

            // after render
            assert(inputWillMount.calledOnce);
            assert(!onChangeInput.called);
            assert(!inputWillUnmount.called);

            assert.deepEqual(inputWillMount.firstCall.args, [app.node]);

            // data change
            if (typeof fooValue === 'boolean') {
                setValue(app, inputSelector, true);
            } else {
                setValue(app, inputSelector, 'any');
            }

            // after data change
            assert(inputWillMount.calledOnce);
            assert(onChangeInput.calledOnce);
            assert(!inputWillUnmount.called);

            assert.deepEqual(onChangeInput.firstCall.args, [app.node]);

            // after unmount
            app.unmount();

            assert(inputWillMount.calledOnce);
            assert(onChangeInput.calledOnce);
            assert(inputWillUnmount.calledOnce);

            assert.deepEqual(inputWillUnmount.firstCall.args, [app.node]);

        });

        if (Elem === Checkbox) {
            it('should use checkValue prop as value', function () {
                const app = mount(
                    <Elem
                        name="name"
                        checkValue="Foo"
                    />
                );

                assert.strictEqual(app.node.getValue(), null, 'should be null after run');

                setValue(app, inputSelector, true);
                assert.strictEqual(app.node.getValue(), 'Foo');

                setValue(app, inputSelector, false);
                assert.strictEqual(app.node.getValue(), null, 'should be null otherwise');
            });

            it('should work with default value', function () {
                const app = mount(
                    <Elem
                        name="name"
                        checkValue="Foo"
                        defaultValue="Foo"
                    />
                );

                assert.strictEqual(app.node.getValue(), 'Foo', 'should be null after run');

                app.node.setValue('Foo');
                assert.strictEqual(app.childAt(0).prop('checked'), true);
                assert.strictEqual(app.node.getValue(), 'Foo');

                app.node.setValue(undefined);
                assert.strictEqual(app.childAt(0).prop('checked'), true);
                assert.strictEqual(app.node.getValue(), 'Foo', 'should be null otherwise');

                app.node.setValue(null);
                assert.strictEqual(app.childAt(0).prop('checked'), false);
                assert.strictEqual(app.node.getValue(), null, 'should be null otherwise');
            });
        }

    });
});
