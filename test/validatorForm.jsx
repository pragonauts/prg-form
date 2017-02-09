/*
 * @author David Menger
 */

import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import ValidatorForm from '../src/ValidatorForm';
import Input from '../src/Input';
import Checkbox from '../src/Checkbox';

function createResolver () {
    let resolve;
    let reject;

    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return { resolve, reject, promise };
}

function nextTick () {
    return new Promise(res => setTimeout(res, 1));
}

describe('<ValidatorForm>', function () {

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
            texts: [
                { name: 'Foo', bool: true }
            ]
        };

        const mockFn = () => {
            this.resolver = createResolver();
            return this.resolver.promise;
        };

        this.onSubmit = sinon.spy();
        this.validator = {
            validateProp: sinon.spy(mockFn),
            validate: sinon.spy(mockFn)
        };

        this.app = mount(
            <ValidatorForm
                values={values}
                onSubmit={this.onSubmit}
                validator={this.validator}
            >
                <Input name="texts[0].name" />
                <Checkbox name="texts[0].bool" />
            </ValidatorForm>
        );
    });

    it('should accept object as error list', function () {

        const { validate } = this.validator;

        // fire the submit again and validate it
        this.app.find('form').simulate('submit');

        assert(!this.onSubmit.called, 'onSubmit should not be called');
        assert(validate.calledOnce);

        // resolve
        this.resolver.reject({ 'texts[0].name': 'Error' });

        return nextTick()
            .then(() => {
                // no error
                const err = this.app.find('span.help.is-danger');
                assert(err.length === 1);
                assert.equal(err.at(0).text(), 'Error');

                // onSubmit called
                assert(!this.onSubmit.called, 'onSubmit should be called');
            });
    });

    it('should propagate input changes to validator', function () {

        this.setValue({ name: 'texts[0].name' }, 'Bar');

        const { validateProp, validate } = this.validator;

        assert(validateProp.calledOnce);
        assert.deepEqual(validateProp.firstCall.args, [
            'texts[0].name',
            'Bar',
            null,
            { texts: [{ name: 'Bar', bool: true }] }
        ]);

        // fire the error
        this.resolver.reject(new Error('Text of error'));

        return nextTick()
            .then(() => {
                const err = this.app.find('span.help.is-danger');
                assert(err.length === 1);
                assert.equal(err.text(), 'Text of error');

                // change the value again
                this.setValue({ name: 'texts[0].bool' }, false);

                assert(validateProp.calledTwice);
                assert.deepEqual(validateProp.secondCall.args, [
                    'texts[0].bool',
                    false,
                    null,
                    { texts: [{ name: 'Bar', bool: false }] }
                ]);

                // fire the error
                this.resolver.reject(new Error('Another error'));

                return nextTick();
            })
            .then(() => {
                const err = this.app.find('span.help.is-danger');
                assert(err.length === 2);
                assert.equal(err.at(1).text(), 'Another error');

                // make right value at text input
                this.setValue({ name: 'texts[0].name' }, 'Right');

                assert(validateProp.calledThrice);
                assert.deepEqual(validateProp.thirdCall.args, [
                    'texts[0].name',
                    'Right',
                    null,
                    { texts: [{ name: 'Right', bool: false }] }
                ]);

                // validate
                this.resolver.resolve();

                return nextTick();
            })
            .then(() => {
                const err = this.app.find('span.help.is-danger');
                assert(err.length === 1);
                assert.equal(err.at(0).text(), 'Another error');

                // fire the submit
                this.app.find('form').simulate('submit');

                assert(validate.calledOnce);
                assert.deepEqual(validate.firstCall.args, [
                    { texts: [{ name: 'Right', bool: false }] },
                    null,
                    true
                ]);

                // reject
                this.resolver.reject([
                    { property: 'texts[0].name', message: 'New Error' }
                ]);

                return nextTick();
            })
            .then(() => {
                // old error is cancelled, new appears
                const err = this.app.find('span.help.is-danger');
                assert(err.length === 1);
                assert.equal(err.at(0).text(), 'New Error');

                // fire the submit again and validate it
                this.app.find('form').simulate('submit');

                assert(!this.onSubmit.called, 'onSubmit should not be called');
                assert(validate.calledTwice);

                // resolve
                this.resolver.resolve();

                return nextTick();
            })
            .then(() => {
                // no error
                const err = this.app.find('span.help.is-danger');
                assert(err.length === 0);

                // onSubmit called
                assert(this.onSubmit.calledOnce, 'onSubmit should be called');
                assert.deepEqual(this.onSubmit.firstCall.args, [
                    { texts: [{ name: 'Right', bool: false }] },
                    this.app.find('Form').node
                ]);

            });
    });

});
