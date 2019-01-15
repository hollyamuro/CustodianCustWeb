"use strict"

import * as actions from '../../../src/MonthlyStatementDownload/actions'
import { ym } from '../../../src/MonthlyStatementDownload/reducers/ym'

describe('reducers', () => {
    describe('ym', () => {

        it('should return the initial state', () => {
            expect(ym(undefined, {})).toEqual("");
        })

        it('should handle SET_YM', () => {
            const expected = '2018/01'
            const changed = '2018/12'

            // undefined => FIRST
            expect(ym(undefined, { type: actions.SET_YM, ym: expected, })).toEqual(expected);

            // FIRST => CHANGED
            expect(ym(expected, { type: actions.SET_YM, ym: changed, })).toEqual(changed);
        })
    })
})