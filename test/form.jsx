/*
 * @author David Menger
 */

import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import Form from '../src/Form';
import Input from '../src/Input';
import Checkbox from '../src/Checkbox';

describe('<Form>', function () {

    before(function () {
        this.setValue = function setValue (selector, value) {
            const input = this.app.find(selector);
            if (typeof value === 'boolean') {
                input.node.checked = value;
            } else {
                input.node.value = value;
            }
            input.simulate('change', input);
        };
    });

    beforeEach(function () {
        const values = {
            text: 'Foo',
            check: true
        };

        this.onSubmit = sinon.spy();
        this.onChange = sinon.spy();

        this.app = mount(
            <Form
                values={values}
                onSubmit={this.onSubmit}
                onChange={this.onChange}
            >
                <Input name="text" />
                <Checkbox name="check" />
            </Form>
        );
    });

    afterEach(function () {
        if (this.app) {
            this.app.unmount();
            this.app = null;
        }
    });

    it('should render with values in form', function () {
        assert.strictEqual(this.app.find('input[name="text"]').prop('value'), 'Foo');
        assert.strictEqual(this.app.find('input[name="check"]').prop('checked'), true);
    });

    it('should fire onSubmit method', function () {
        this.setValue('input[name="text"]', 'Bar');
        this.setValue('input[name="check"]', false);

        // fire the submit
        this.app.find('form').simulate('submit');

        assert(this.onSubmit.calledOnce);
        assert.deepEqual(this.onSubmit.firstCall.args, [
            { text: 'Bar', check: false },
            this.app.node
        ]);
    });

    it('should fire onChange method on text', function () {
        this.setValue('input[name="text"]', 'Bar');

        assert(this.onChange.calledOnce, 'onChange should be called');
        assert(this.onChange.firstCall.args[0] instanceof Input);
        assert.equal(this.onChange.firstCall.args[0].getValue(), 'Bar');
    });

    it('should fire onChange method on checkbox', function () {
        this.setValue('input[name="check"]', false);

        assert(this.onChange.calledOnce, 'onChange should be called');
        assert(this.onChange.firstCall.args[0] instanceof Checkbox);
        assert.strictEqual(this.onChange.firstCall.args[0].getValue(), false);
    });

    it('should return all values with #getValues() method', function () {
        assert.deepEqual(this.app.node.getValues(), {
            text: 'Foo',
            check: true
        });
    });

    it('shoudl display errors with #setErrors() method', function () {
        this.app.node.setErrors({
            text: 'Something failed',
            check: 'Bad, bad checkbox'
        });

        const dangers = this.app.find('span.help.is-danger');

        assert.strictEqual(dangers.length, 2, 'there should be two errors');
        assert.strictEqual(dangers.at(0).text(), 'Something failed');
        assert.strictEqual(dangers.at(1).text(), 'Bad, bad checkbox');

        // and it should also hide errors

    });

    it('should return empty object after unmount', function () {
        const component = this.app.node;

        this.app.unmount();

        assert.deepEqual(component.getValues(), {}, 'object should be empty');
    });

    it('shoudl re-render form with default values', function () {
        this.app.unmount();

        const values = {
            text: 'Any',
            check: false
        };

        this.app = mount(
            <Form
                values={values}
            >
                <Input name="text" defaultValue="Def" />
                <Checkbox name="check" defaultValue />
            </Form>
        );

        // ensure right values
        assert.strictEqual(this.app.find('input[name="text"]').prop('value'), 'Any');
        assert.strictEqual(this.app.find('input[name="check"]').prop('checked'), false);

        // reset form
        this.app.setProps({ values: {} });

        // ensure right values
        assert.strictEqual(this.app.find('input[name="text"]').prop('value'), 'Def');
        assert.strictEqual(this.app.find('input[name="check"]').prop('checked'), true);

        // lets set value and ensure it
        this.setValue('input[name="text"]', 'Different');
        assert.deepEqual(this.app.node.getValues(), {
            text: 'Different',
            check: true
        });

    });

});
