"use strict"

import { getXLSXFormat } from '../../../src/Safekeeping/utils/helper'

describe('utils', () => {
    describe('getXLSXFormat', () => {
        it('should transfer object array to XLSX format', () => {
            const sampleData1 = [
                { a: '11', b: '21', c: "31" },
                { a: '12', b: '22', c: "32" },
                { a: '13', b: '23', c: "33" },
            ];
            const sampleData2 = [
                { a: '11', b: '21', c: "31" },
                { a: '12', b: '22', c: "32", d: "42" },
                { a: '13', b: '23', c: "33", e: "53" },
            ];
            const expected1 = [
                ['a', 'b', 'c'],
                ['11', '21', '31'],
                ['12', '22', '32'],
                ['13', '23', '33'],
            ];
            const expected2 = [
                ['a', 'b', 'c', 'd', 'e'],
                ['11', '21', '31', '', ''],
                ['12', '22', '32', '42', ''],
                ['13', '23', '33', '', '53'],
            ];

            expect(getXLSXFormat([])).toEqual([]);
            expect(getXLSXFormat(sampleData1)).toEqual(expected1);
            expect(getXLSXFormat(sampleData2)).toEqual(expected2);
        })
    })
})