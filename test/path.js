/*
 * @author David Menger
 */

import { assert } from 'chai';
import { join, getValue, flat, pathToFormBrackets, shallowToDeep, shallowDiff, createTree } from '../src/path';

describe('path utility', function () {

    describe('createTree()', function () {

        it('should create tree with indexes', function () {
            const res = createTree([], 'someArray[]');

            assert.deepEqual(res, {
                someArray: []
            });
        });

        it('should create tree nicely', function () {
            let res = createTree('foo', 'someArray[]');
            res = createTree('bar', 'someArray[]', res);

            assert.deepEqual(res, {
                someArray: ['foo', 'bar']
            });
        });

    });

    describe('join()', function () {

        it('should join path in array to string', function () {
            let res;

            res = join(['a', 1, 'b']);
            assert.equal(res, 'a[1].b');

            res = join(['a', 'x', 'b']);
            assert.equal(res, 'a.x.b');

            res = join(['a', 1, 2]);
            assert.equal(res, 'a[1][2]');
        });

        it('should return empty string, when input is empty array', function () {
            let res;

            res = join([]);
            assert.equal(res, '');

            res = join();
            assert.equal(res, '');
        });

    });

    describe('getValue()', function () {

        it('should return value from deep structure', function () {
            let res;

            res = getValue({ name: 'abc' }, 'name');
            assert.strictEqual(res, 'abc');

            res = getValue({ name: 'abc' }, 'other');
            assert.strictEqual(res, undefined);

            res = getValue({ name: { inner: 345 } }, 'name.inner');
            assert.strictEqual(res, 345);

            res = getValue({ name: [{ inArray: null }] }, 'name[0].inArray');
            assert.strictEqual(res, null);

            res = getValue({ name: [{ inArray: 3 }] }, 'name[0][inArray]');
            assert.strictEqual(res, 3);

            res = getValue({ name: [{ inArray: null }] }, 'name[0].inArray[2]');
            assert.strictEqual(res, undefined);
        });

        it('should not fall', function () {
            let res;

            res = getValue();
            assert.equal(res, undefined);

            res = getValue({}, '');
            assert.equal(res, undefined);
        });

    });

    describe('flat()', function () {

        it('should flattern deep object', function () {
            let res;

            res = flat({ name: { deep: true } });
            assert.deepEqual(res, { 'name.deep': true });

            res = flat({ name: [{ deep: true }] });
            assert.deepEqual(res, { 'name[0].deep': true });

            res = flat({ name: [{ deep: true }] });
            assert.deepEqual(res, { 'name[0].deep': true });

            res = flat({ 'name[0].deep': true });
            assert.deepEqual(res, { 'name[0].deep': true });

            res = flat({ name: [{ deep: 1 }, { deep: 2 }] });
            assert.deepEqual(res, { 'name[0].deep': 1, 'name[1].deep': 2 });
        });

        it('should flattern deep object with forcing brackets', function () {
            let res;

            res = flat({ name: { deep: true } }, true);
            assert.deepEqual(res, { 'name[deep]': true });

            res = flat({ name: [{ deep: true }] }, true);
            assert.deepEqual(res, { 'name[0][deep]': true });

            res = flat({ name: [{ deep: true }] }, true);
            assert.deepEqual(res, { 'name[0][deep]': true });

            res = flat({ name: [{ deep: 1 }, { deep: 2 }] }, true);
            assert.deepEqual(res, { 'name[0][deep]': 1, 'name[1][deep]': 2 });
        });

        it('should not fall', function () {
            let res;

            res = flat();
            assert.deepEqual(res, {});

            res = flat({});
            assert.deepEqual(res, {});
        });

    });

    describe('pathToFormBrackets()', function () {

        it('should convert dot notation to bracket notation', function () {
            let res;

            res = pathToFormBrackets('foo.bar');
            assert.equal(res, 'foo[bar]');

            res = pathToFormBrackets('foo[bar]');
            assert.equal(res, 'foo[bar]');

            res = pathToFormBrackets('foo[1].bar');
            assert.equal(res, 'foo[1][bar]');
        });

        it('should return empty string, when input is empty array', function () {
            let res;

            res = pathToFormBrackets();
            assert.strictEqual(res, undefined);

            res = pathToFormBrackets(null);
            assert.strictEqual(res, null);

            res = pathToFormBrackets('');
            assert.strictEqual(res, '');
        });

    });

    describe('shallowToDeep()', function () {

        it('should convert dot notation to bracket notation', function () {
            let res;

            res = shallowToDeep({ 'foo.bar': 1 });
            assert.deepEqual(res, { foo: { bar: 1 } });

            res = shallowToDeep({ 'foo[bar]': 1 });
            assert.deepEqual(res, { foo: { bar: 1 } });

            res = shallowToDeep({ 'foo[0][abla]': 1 });
            assert.deepEqual(res, { foo: [{ abla: 1 }] });

            res = shallowToDeep({
                'foo[0][abla]': 1,
                'foo[1][bar]': 4,
                'foo[1].partyhard[0]': 'string',
                'foo[0].bar': 7
            });
            assert.deepEqual(res, {
                foo: [
                    { abla: 1, bar: 7 },
                    { bar: 4, partyhard: ['string'] }
                ]
            });
        });

        it('should return empty object, when bad input is provided', function () {
            let res;

            res = shallowToDeep();
            assert.deepEqual(res, {});

            res = shallowToDeep(null);
            assert.deepEqual(res, {});

            res = shallowToDeep({});
            assert.deepEqual(res, {});
        });

    });

    describe('shallowDiff()', function () {

        it('should return array of different keys', function () {
            let res;

            res = shallowDiff({
                a: 1
            }, {
                a: '1'
            });
            assert.deepEqual(res, []);

            res = shallowDiff({
                b: 0
            }, {
                b: '0'
            });
            assert.deepEqual(res, []);

            res = shallowDiff({
                c: 1
            }, {
                c: '2'
            });
            assert.deepEqual(res, ['c']);
        });

        it('should treat falseys as empty strings', function () {
            let res;

            res = shallowDiff({
                a: undefined
            }, {
                a: ''
            });
            assert.deepEqual(res, []);

            res = shallowDiff({
                a: null
            }, {
                a: ''
            });
            assert.deepEqual(res, []);

            res = shallowDiff({
                a: 1
            }, {
                a: '2'
            });
            assert.deepEqual(res, ['a']);

            res = shallowDiff({
                a: 1
            }, {
                b: 1
            });
            assert.deepEqual(res, ['a', 'b']);
        });

        it('should return empty string, when input is empty array', function () {
            let res;

            res = join([]);
            assert.equal(res, '');

            res = join();
            assert.equal(res, '');
        });

    });

});
