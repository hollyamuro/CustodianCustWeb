"use strict"

import { chargeOff, queryDate } from '../../../src/ChargeOffHistory/reducers/chargeOff'
import * as actions from '../../../src/ChargeOffHistory/actions'

describe('reducer', () => {
    describe('chargeOff', () => {
        it('should return the initial state', () => {
            const expected = { cash: [], holdings: [], };
            expect(chargeOff(undefined, {})).toEqual(expected);
        })

        it('should handle RECEIVE_LOAD_CHARGE_OFF', () => {
            const expected1 = {
                cash: [{ a: 'a1' }, { a: 'a2' }, { a: 'a3' }],
                holdings: [{ b: 'b1' }, { b: 'b2' }, { b: 'b3' }],
            };
            const expected2 = {
                cash: [{ a: 'a4' }, { a: 'a5' }, { a: 'a6' }],
                holdings: [{ b: 'b4' }, { b: 'b5' }, { b: 'b6' }],
            };
            expect(chargeOff(undefined, {
                type: actions.RECEIVE_LOAD_CHARGE_OFF,
                chargeOff: expected1,
            })).toEqual(expected1);
            expect(chargeOff(expected1, {
                type: actions.RECEIVE_LOAD_CHARGE_OFF,
                chargeOff: expected2,
            })).toEqual(expected2);
        })

        it('should handle SET_CHARGE_OFF', () => {
            const expected1 = {
                cash: [{ a: 'a1' }, { a: 'a2' }, { a: 'a3' }],
                holdings: [{ b: 'b1' }, { b: 'b2' }, { b: 'b3' }],
            };
            const expected2 = {
                cash: [{ a: 'a4' }, { a: 'a5' }, { a: 'a6' }],
                holdings: [{ b: 'b4' }, { b: 'b5' }, { b: 'b6' }],
            };
            expect(chargeOff(undefined, {
                type: actions.SET_CHARGE_OFF,
                chargeOff: expected1,
            })).toEqual(expected1);
            expect(chargeOff(expected1, {
                type: actions.SET_CHARGE_OFF,
                chargeOff: expected2,
            })).toEqual(expected2);
        })
    })

    describe('queryDate', () => {
        it('should return the initial state', () => {
            const expected = { from: "", to: "", };
            expect(queryDate(undefined, {})).toEqual(expected);
        })

        it('should handle SET_FROM_QUERY_DATE', () => {
            const expected1 = {
                from: "2018-01-01", to: "",
            };
            const expected2 = {
                from: "2018-01-31", to: "",
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
                from: "", to: "2018-01-01",
            };
            const expected2 = {
                from: "", to: "2018-01-31",
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