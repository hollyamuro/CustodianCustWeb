"use strict"

import { notChargeOff, queryDate } from '../../../src/NotChargeOffHistory/reducers/notChargeOff'
import * as actions from '../../../src/NotChargeOffHistory/actions'

describe('reducer', () => {
    describe('notChargeOff ', () => {
        it('should return the initial state', () => {
            const expected = { cash: [], holdings: [], };
            expect(notChargeOff(undefined, {})).toEqual(expected);
        })

        it('should handle RECEIVE_LOAD_NOT_CHARGE_OFF', () => {
            const expected1 = {
                cash: [{ a: 'a1' }, { a: 'a2' }, { a: 'a3' }],
                holdings: [{ b: 'b1' }, { b: 'b2' }, { b: 'b3' }],
            };
            const expected2 = {
                cash: [{ a: 'a4' }, { a: 'a5' }, { a: 'a6' }],
                holdings: [{ b: 'b4' }, { b: 'b5' }, { b: 'b6' }],
            };
            expect(notChargeOff(undefined, {
                type: actions.RECEIVE_LOAD_NOT_CHARGE_OFF,
                notChargeOff: expected1,
            })).toEqual(expected1);
            expect(notChargeOff(expected1, {
                type: actions.RECEIVE_LOAD_NOT_CHARGE_OFF,
                notChargeOff: expected2,
            })).toEqual(expected2);
        })

        it('should handle SET_NOT_CHARGE_OFF', () => {
            const expected1 = {
                cash: [{ a: 'a1' }, { a: 'a2' }, { a: 'a3' }],
                holdings: [{ b: 'b1' }, { b: 'b2' }, { b: 'b3' }],
            };
            const expected2 = {
                cash: [{ a: 'a4' }, { a: 'a5' }, { a: 'a6' }],
                holdings: [{ b: 'b4' }, { b: 'b5' }, { b: 'b6' }],
            };
            expect(notChargeOff(undefined, {
                type: actions.SET_NOT_CHARGE_OFF,
                notChargeOff: expected1,
            })).toEqual(expected1);
            expect(notChargeOff(expected1, {
                type: actions.SET_NOT_CHARGE_OFF,
                notChargeOff: expected2,
            })).toEqual(expected2);
        })
    })

    describe('queryDate', () => {
        it('should return the initial state', () => {
            const expected = {
                from: require("date-format")("yyyy-MM-dd", new Date()),
                to: require("date-format")("yyyy-MM-dd", new Date()),
            };
            expect(queryDate(undefined, {})).toEqual(expected);
        })

        it('should handle SET_FROM_QUERY_DATE', () => {
            const expected1 = {
                from: "2018-01-01",
                to: require("date-format")("yyyy-MM-dd", new Date()),
            };
            const expected2 = {
                from: "2018-01-31",
                to: require("date-format")("yyyy-MM-dd", new Date()),
            };
            expect(queryDate(undefined, {
                type: actions.SET_FROM_QUERY_DATE,
                from: expected1.from,
            })).toEqual(expected1);
            expect(queryDate(expected1, {
                type: actions.SET_FROM_QUERY_DATE,
                from: expected2.from,
            })).toEqual(expected2);
        })

        it('should handle SET_TO_QUERY_DATE', () => {
            const expected1 = {
                from: require("date-format")("yyyy-MM-dd", new Date()),
                to: "2018-01-01",
            };
            const expected2 = {
                from: require("date-format")("yyyy-MM-dd", new Date()),
                to: "2018-01-31",
            };
            expect(queryDate(undefined, {
                type: actions.SET_TO_QUERY_DATE,
                to: expected1.to,
            })).toEqual(expected1);
            expect(queryDate(expected1, {
                type: actions.SET_TO_QUERY_DATE,
                to: expected2.to,
            })).toEqual(expected2);
        })
    })
})