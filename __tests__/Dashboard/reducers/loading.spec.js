"use strict"

import { isLoading } from '../../../src/Dashboard/reducers/loadings'
import * as actions from '../../../src/Dashboard/actions'

describe('reducers', () => {
    describe('isLoading', () => {
        it('should return the initial state', () => {
            expect(isLoading(undefined, {})).toEqual(false);
        })

        it('should handle REQUEST_LOAD_DASHBOARD_COUPON', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.REQUEST_LOAD_DASHBOARD_COUPON,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.REQUEST_LOAD_DASHBOARD_COUPON,
                isLoading: changed,
            })).toEqual(changed)
        })

        it('should handle RECEIVE_LOAD_DASHBOARD_COUPON', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.RECEIVE_LOAD_DASHBOARD_COUPON,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.RECEIVE_LOAD_DASHBOARD_COUPON,
                isLoading: changed,
            })).toEqual(changed)
        })

        it('should handle START_LOADING', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.START_LOADING,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.START_LOADING,
                isLoading: changed,
            })).toEqual(changed)
        })

        it('should handle STOP_LOADING', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.STOP_LOADING,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.STOP_LOADING,
                isLoading: changed,
            })).toEqual(changed)
        })
    })
})