"use strict"

import { getLeastNMonth } from '../../../src/MonthlyStatementDownload/utils/helpers'

describe('utils', () => {
    describe('getLeastNMonth', () => {
        it('should return last n months', () => {
            const list = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
            const date = new Date();
            let expectedPart1 = [];
            for (let i = date.getMonth() - 1; i >= 0; i--) {
                expectedPart1.push(date.getFullYear() + "/" + list[i])
            }
            let expectedPart2 = [];
            for (let i = list.length-1; i >= date.getMonth(); i--) {
                expectedPart2.push((date.getFullYear()-1) + "/" + list[i])
            }
            expect(getLeastNMonth()).toEqual([]);
            expect(getLeastNMonth(0)).toEqual([]);
            expect(getLeastNMonth(expectedPart1.length)).toEqual(expectedPart1);
            expect(getLeastNMonth([...expectedPart1 ,...expectedPart2].length)).toEqual([...expectedPart1 ,...expectedPart2]);
        })
    })
})