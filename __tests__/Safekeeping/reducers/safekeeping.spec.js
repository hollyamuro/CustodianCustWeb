"use strict"

import * as actions from '../../../src/Safekeeping/actions'
import { queryPositionDate, account, isin, queryMaturityDate, balance, holding } from '../../../src/Safekeeping/reducers/safekeeping'

describe('reducers', () => {
    describe('queryPositionDate', () => {
        it('should return the initial state', () => {
            const expected = { from: "", to: "", }
            expect(queryPositionDate(undefined, {})).toEqual(expected);
        })

        it('should handle SET_FROM_POSITION_DATE', () => {
            const expected1 = { from: '2018-01-01', to: "", }
            const expected2 = { from: '2018-01-15', to: "", }

            expect(queryPositionDate(undefined, {
                type: actions.SET_FROM_POSITION_DATE,
                from: expected1.from,
            })).toEqual(expected1);

            expect(queryPositionDate(expected1, {
                type: actions.SET_FROM_POSITION_DATE,
                from: expected2.from,
            })).toEqual(expected2);
        })

        it('should handle SET_TO_POSITION_DATE', () => {
            const expected1 = { from: "", to: '2018-01-31', }
            const expected2 = { from: "", to: '2018-01-20', }

            expect(queryPositionDate(undefined, {
                type: actions.SET_TO_POSITION_DATE,
                to: expected1.to,
            })).toEqual(expected1);

            expect(queryPositionDate(expected1, {
                type: actions.SET_TO_POSITION_DATE,
                to: expected2.to,
            })).toEqual(expected2);
        })
    })

    describe('queryMaturityDate', () => {
        it('should return the initial state', () => {
            const expected = { from: "", to: "", }
            expect(queryMaturityDate(undefined, {})).toEqual(expected);
        })

        it('should handle SET_FROM_MATURITY_DATE', () => {
            const expected1 = { from: '2018-01-01', to: "", }
            const expected2 = { from: '2018-01-15', to: "", }

            expect(queryMaturityDate(undefined, {
                type: actions.SET_FROM_MATURITY_DATE,
                from: expected1.from,
            })).toEqual(expected1);

            expect(queryMaturityDate(expected1, {
                type: actions.SET_FROM_MATURITY_DATE,
                from: expected2.from,
            })).toEqual(expected2);
        })

        it('should handle SET_TO_MATURITY_DATE', () => {
            const expected1 = { from: "", to: '2018-01-31', }
            const expected2 = { from: "", to: '2018-01-20', }

            expect(queryMaturityDate(undefined, {
                type: actions.SET_TO_MATURITY_DATE,
                to: expected1.to,
            })).toEqual(expected1);

            expect(queryMaturityDate(expected1, {
                type: actions.SET_TO_MATURITY_DATE,
                to: expected2.to,
            })).toEqual(expected2);
        })
    })

    describe('account', () => {
        it('should return the initial state', () => {
            expect(account(undefined, {})).toEqual("");
        })

        it('should handle SET_ACCOUNT', () => {
            const expect1 = "ACCOUNT1"
            const expect2 = "ACCOUNT2"

            expect(account(undefined, { type: actions.SET_ACCOUNT, account: expect1 })).toEqual(expect1);
            expect(account(undefined, { type: actions.SET_ACCOUNT, account: expect2 })).toEqual(expect2);
        })
    })

    describe('isin', () => {
        it('should return the initial state', () => {
            expect(isin(undefined, {})).toEqual("");
        })

        it('should handle SET_ISIN', () => {
            const expect1 = "ISIN1"
            const expect2 = "ISIN2"

            expect(isin(undefined, { type: actions.SET_ISIN, isin: expect1 })).toEqual(expect1);
            expect(isin(undefined, { type: actions.SET_ISIN, isin: expect2 })).toEqual(expect2);
        })
    })

    describe('balance', () => {

        const expect1 = [{ a: '1' }, { a: '2' }, { a: '3' }];
        const expect2 = [{ b: '1' }, { b: '2' }, { b: '3' }];

        it('should return the initial state', () => {
            expect(balance(undefined, {})).toEqual([]);
        })

        it('should handle RECEIVE_LOAD_SAFEKEEPING', () => {
            expect(balance(undefined, {
                type: actions.RECEIVE_LOAD_SAFEKEEPING,
                isLoading: false,
                balance: expect1,
                holding: [],
            })).toEqual(expect1);

            expect(balance(expect1, {
                type: actions.RECEIVE_LOAD_SAFEKEEPING,
                isLoading: false,
                balance: expect2,
                holding: [],
            })).toEqual(expect2);
        })

        it('should handle SET_SAFEKEEPING', () => {
            expect(balance(undefined, {
                type: actions.SET_SAFEKEEPING,
                isLoading: false,
                balance: expect1,
                holding: [],
            })).toEqual(expect1);

            expect(balance(expect1, {
                type: actions.SET_SAFEKEEPING,
                isLoading: false,
                balance: expect2,
                holding: [],
            })).toEqual(expect2);
        })
    })

    describe('holding', () => {

        const expect1 = [{ a: '1' }, { a: '2' }, { a: '3' }];
        const expect2 = [{ b: '1' }, { b: '2' }, { b: '3' }];

        it('should return the initial state', () => {
            expect(holding(undefined, {})).toEqual([]);
        })

        it('should handle RECEIVE_LOAD_SAFEKEEPING', () => {

            expect(holding(undefined, {
                type: actions.RECEIVE_LOAD_SAFEKEEPING,
                isLoading: false,
                balance: [],
                holding: expect1,
            })).toEqual(expect1);

            expect(holding(expect1, {
                type: actions.RECEIVE_LOAD_SAFEKEEPING,
                isLoading: false,
                balance: [],
                holding: expect2,
            })).toEqual(expect2);
        })

        it('should handle SET_SAFEKEEPING', () => {
            expect(holding(undefined, {
                type: actions.SET_SAFEKEEPING,
                isLoading: false,
                balance: [],
                holding: expect1,
            })).toEqual(expect1);

            expect(holding(expect1, {
                type: actions.SET_SAFEKEEPING,
                isLoading: false,
                balance: [],
                holding: expect2,
            })).toEqual(expect2);
        })
    })
})