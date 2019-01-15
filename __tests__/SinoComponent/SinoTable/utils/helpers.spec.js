"use strict";

import * as helpers from '../../../../src/SinoComponent/SinoTable/utils/helpers';

describe('function', () => {
    describe('getCombinedColumns', () => {

        it('should get a empty array while input array of object is emply', () => {
            const data = [];
            const expected = [];
            expect(helpers.getCombinedColumns(data)).toEqual(expected);
        });

        it('should get universal set of property from array of object', () => {
            const data = [
                { a: 11, b: 12, c: 13 },
                { a: 21, b: 22, d: 23 },
                { b: 31, a: 32, e: 33 },
                { a: 41, f: 42, b: 43 },
            ];
            const expected = ['a', 'b', 'c', 'd', 'e', 'f'];
            expect(helpers.getCombinedColumns(data)).toEqual(expected);
        });

    });

    describe('setColumns', () => {

        it('should get a empty array while input array of object is emply', () => {
            const customizedColumnNames = {}
            const customizedColumnAlign = {}
            const customizedColumnSize = {}
            const columns = [];
            const expected = [];
            expect(helpers.setColumns(customizedColumnNames, customizedColumnAlign, customizedColumnSize, columns)).toEqual(expected);
        });

        it('should get column list array which contain UI properties, such like name, show_name, align, size', () => {
            const customizedColumnNames = { 'a': 'A', 'b': "B", 'c': "C", 'd': 'D', }
            const customizedColumnAlign = { 'e': 'left', 'f': 'center', 'g': 'right', }
            const customizedColumnSize = { 'a': '10%', 'c': '1rem', 'f': '100px', }
            const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
            const expected = [
                { name: 'a', show_name: 'A', align: "left", size: "10%", },
                { name: 'b', show_name: 'B', align: "left", size: "", },
                { name: 'c', show_name: 'C', align: "left", size: "1rem", },
                { name: 'd', show_name: 'D', align: "left", size: "", },
                { name: 'e', show_name: 'e', align: "left", size: "", },
                { name: 'f', show_name: 'f', align: "center", size: "100px", },
                { name: 'g', show_name: 'g', align: "right", size: "", },
            ];
            expect(helpers.setColumns(customizedColumnNames, customizedColumnAlign, customizedColumnSize, columns)).toEqual(expected);
        })

    })

    describe('getFilterData', () => {

        it('should get a empty array while input array of object is emply', () => {
            const data = [];
            const filter = '';
            const expected = [];
            expect(helpers.getFilterData(data, filter)).toEqual(expected);
        });

        it('should return data which only contain the word of filter', () => {
            const data = [
                { a: 'abc', b: 'abc', c: 'abc' },
                { a: '123', b: 'abc', c: 'abc' },
                { a: 'abc', b: '123', c: 'abc' },
                { a: 'abc', b: 'abc', c: '123' },
                { a: 'abc', b: 'abc', c: 'abc' },
            ];
            const filter = '2';
            const expected = [
                { a: '123', b: 'abc', c: 'abc' },
                { a: 'abc', b: '123', c: 'abc' },
                { a: 'abc', b: 'abc', c: '123' },
            ];
            expect(helpers.getFilterData(data, filter)).toEqual(expected);
        })
    })

    describe('getSortData', () => {
        describe('no sort', () => {
            it('should get a empty array while input array of object is emply', () => {
                const data = [];
                const expected = [
                ];
                expect(helpers.getSortData(data, '', 0)).toEqual(expected);
                expect(helpers.getSortData(data, '', 1)).toEqual(expected);
                expect(helpers.getSortData(data, '', -1)).toEqual(expected);
                expect(helpers.getSortData(data, 'a', 0)).toEqual(expected);
                expect(helpers.getSortData(data, 'a', 1)).toEqual(expected);
                expect(helpers.getSortData(data, 'a', -1)).toEqual(expected);
            })

            it('should return no sorted data', () => {
                const data = [
                    { a: 'a', b: 1, },
                    { a: 'd', b: 4, },
                    { a: 'e', b: 5, },
                    { a: 'b', b: 2, },
                    { a: 'c', b: 3, },
                ];
                const expected = [
                    { a: 'a', b: 1, },
                    { a: 'd', b: 4, },
                    { a: 'e', b: 5, },
                    { a: 'b', b: 2, },
                    { a: 'c', b: 3, },
                ];
                expect(helpers.getSortData(data, '', 0)).toEqual(expected);
                expect(helpers.getSortData(data, '', 1)).toEqual(expected);
                expect(helpers.getSortData(data, '', -1)).toEqual(expected);
                expect(helpers.getSortData(data, 'a', 0)).toEqual(expected);
                expect(helpers.getSortData(data, 'b', 0)).toEqual(expected);
            })
        })

        describe('increase sort', () => {
            it('should return increase sorted data', () => {
                const data = [
                    { a: 'a', b: 1, },
                    { a: 'd', b: 4, },
                    { a: 'e', b: 5, },
                    { a: 'b', b: 2, },
                    { a: 'c', b: 3, },
                ];
                const expected = [
                    { a: 'a', b: 1, },
                    { a: 'b', b: 2, },
                    { a: 'c', b: 3, },
                    { a: 'd', b: 4, },
                    { a: 'e', b: 5, },
                ];
                expect(helpers.getSortData(data, 'a', 1)).toEqual(expected);
                expect(helpers.getSortData(data, 'b', 1)).toEqual(expected);
            })
        })

        describe('decrease sort', () => {
            it('should return decrease sorted data', () => {
                const data = [
                    { a: 'a', b: 1, },
                    { a: 'd', b: 4, },
                    { a: 'e', b: 5, },
                    { a: 'b', b: 2, },
                    { a: 'c', b: 3, },
                ];
                const expected = [
                    { a: 'e', b: 5, },
                    { a: 'd', b: 4, },
                    { a: 'c', b: 3, },
                    { a: 'b', b: 2, },
                    { a: 'a', b: 1, },
                ];
                expect(helpers.getSortData(data, 'a', -1)).toEqual(expected);
                expect(helpers.getSortData(data, 'b', -1)).toEqual(expected);
            })
        })
    })
})
