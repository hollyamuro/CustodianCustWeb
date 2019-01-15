"use strict"

import { coupon } from '../../../src/Dashboard/reducers/dashboard'
import * as actions from '../../../src/Dashboard/actions'

describe('reducers', () => {
    describe('coupon', () => {
        it('should return the initial state', () => {
            expect(coupon(undefined, {})).toEqual([]);
        })

        it('should handle RECEIVE_LOAD_DASHBOARD_COUPON', () => {
            const expected = ['1', '2', '3'];
            const changed = ['1', '2', '3', '4', '5'];
            // undefined => FIRST 
            expect(
                coupon(undefined, {
                    type: actions.RECEIVE_LOAD_DASHBOARD_COUPON,
                    coupon: expected,
                })
            ).toEqual(expected);

            // FIRST => CHANGED 
            expect(
                coupon(expected, {
                    type: actions.RECEIVE_LOAD_DASHBOARD_COUPON,
                    coupon: changed,
                })
            ).toEqual(changed);
        })
    })
})