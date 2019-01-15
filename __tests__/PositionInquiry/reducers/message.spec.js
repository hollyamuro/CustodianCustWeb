"use strict"

import * as actions from '../../../src/PositionInquiry/actions'
import { isMsgShown, msg } from '../../../src/PositionInquiry/reducers/message'

describe('reducers', () => {
    describe('isMsgShow', () => {
        it('should return the initial state', () => {
            expect(isMsgShown(undefined, {})).toEqual(false);
        })

        it('should handle SHOW_MESSAGE', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isMsgShown(undefined, {
                type: actions.SHOW_MESSAGE,
                isMsgShown: expected,
            })).toEqual(expected);

            // FIRST => CHANGED
            expect(isMsgShown(expected, {
                type: actions.SHOW_MESSAGE,
                isMsgShown: changed,
            })).toEqual(changed);
        })

        it('should handle HIDE_MESSAGE', () => {
            const expected = true;
            const changed = false;

            // undefined => FIRST
            expect(isMsgShown(undefined, {
                type: actions.HIDE_MESSAGE,
                isMsgShown: expected,
            })).toEqual(expected);

            // FIRST => CHANGED
            expect(isMsgShown(expected, {
                type: actions.HIDE_MESSAGE,
                isMsgShown: changed,
            })).toEqual(changed);
        })
    })

    describe('msg', () => {
        it('should return the initial state', () => {
            const expected = {
                type: "",
                title: "",
                text: "",
            };
            expect(msg(undefined, {})).toEqual(expected);
        })

        it('should handle SHOW_MESSAGE', () => {
            const expected = {
                type: "TEST CASE 1",
                title: "TEST CASE 1",
                text: "TEST CASE 1",
            };
            const changed = {
                type: "TEST CASE 2",
                title: "TEST CASE 2",
                text: "TEST CASE 2",
            };

            // undefined => FIRST
            expect(msg(undefined, {
                type: actions.SHOW_MESSAGE,
                msg: expected,
            })).toEqual(expected);

            // FIRST => CHANGED
            expect(msg(expected, {
                type: actions.SHOW_MESSAGE,
                msg: changed,
            })).toEqual(changed);
        })
    })
    
})