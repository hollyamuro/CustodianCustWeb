"use strict"

import { isLoading } from '../../../src/ChargeOffHistory/reducers/loadings'
import * as actions from '../../../src/ChargeOffHistory/actions'

describe('reducers', () => {
    describe('isLoading', () => {
        it('should return the initial state', () => {
            expect(isLoading(undefined, {})).toEqual(false);
        })

        it('should handle REQUEST_LOAD_CHARGE_OFF', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.REQUEST_LOAD_CHARGE_OFF,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.REQUEST_LOAD_CHARGE_OFF,
                isLoading: changed,
            })).toEqual(changed)
        })

        it('should handle RECEIVE_LOAD_CHARGE_OFF', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.RECEIVE_LOAD_CHARGE_OFF,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.RECEIVE_LOAD_CHARGE_OFF,
                isLoading: changed,
            })).toEqual(changed)
        })
        
        it('should handle REQUEST_RESET_ALL', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.REQUEST_RESET_ALL,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.REQUEST_RESET_ALL,
                isLoading: changed,
            })).toEqual(changed)
        })

        it('should handle RECEIVE_RESET_ALL', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.RECEIVE_RESET_ALL,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.RECEIVE_RESET_ALL,
                isLoading: changed,
            })).toEqual(changed)
        })

        it('should handle REQUEST_INIT_QUERY', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.REQUEST_INIT_QUERY,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.REQUEST_INIT_QUERY,
                isLoading: changed,
            })).toEqual(changed)
        })

        it('should handle RECEIVE_INIT_QUERY', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isLoading(undefined, {
                type: actions.RECEIVE_INIT_QUERY,
                isLoading: expected,
            })).toEqual(expected)

            // FIRST => CHANGE
            expect(isLoading(expected, {
                type: actions.RECEIVE_INIT_QUERY,
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