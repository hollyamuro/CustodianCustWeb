"use strit"

import * as actions from '../../../src/PositionInquiry/actions'
import { position, queryDate } from '../../../src/PositionInquiry/reducers/position'

describe('reducers', () => {
    describe('position', () => {
        it('should return the initial state', () => {
            const expected = { cash: [], bond: [], rp: [], rs: [], };
            expect(position(undefined, {})).toEqual(expected);
        })

        it('should handle RECEIVE_LOAD_POSITION', () => {
            const expected1 = {
                cash: [{ x: "a" }, { x: "b" }, { x: "b" }],
                bond: [{ y: "a" }, { y: "b" }, { y: "b" }],
                rp: [{ z: "a" }, { z: "b" }, { z: "c" }],
                rs: [{ p: "a", q: "a" }, { p: "b", q: "b" }, { p: "c", q: "c" }],
            };
            const expected2 = {
                cash: [{ x: "a1" }, { x: "b1" }, { x: "b1" }],
                bond: [{ y: "a2" }, { y: "b2" }, { y: "b2" }],
                rp: [{ z: "a1" }, { z: "b2" }, { z: "c3" }],
                rs: [{ p: "a1", q: "a1" }, { p: "b2", q: "b2" }, { p: "c3", q: "c3" }],
            };

            expect(position(undefined, {
                type: actions.RECEIVE_LOAD_POSITION,
                position: expected1,
            })).toEqual(expected1);

            expect(position(expected1, {
                type: actions.RECEIVE_LOAD_POSITION,
                position: expected2,
            })).toEqual(expected2);
        })

        it('should handle SET_POSITION', () => {
            const expected1 = {
                cash: [{ x: "a" }, { x: "b" }, { x: "b" }],
                bond: [{ y: "a" }, { y: "b" }, { y: "b" }],
                rp: [{ z: "a" }, { z: "b" }, { z: "c" }],
                rs: [{ p: "a", q: "a" }, { p: "b", q: "b" }, { p: "c", q: "c" }],
            };
            const expected2 = {
                cash: [{ x: "a1" }, { x: "b1" }, { x: "b1" }],
                bond: [{ y: "a2" }, { y: "b2" }, { y: "b2" }],
                rp: [{ z: "a1" }, { z: "b2" }, { z: "c3" }],
                rs: [{ p: "a1", q: "a1" }, { p: "b2", q: "b2" }, { p: "c3", q: "c3" }],
            };

            expect(position(undefined, {
                type: actions.SET_POSITION,
                position: expected1,
            })).toEqual(expected1);

            expect(position(expected1, {
                type: actions.SET_POSITION,
                position: expected2,
            })).toEqual(expected2);

            expect(position(expected2, {})).toEqual(expected2);
        })
    })

    describe('queryDate', () => {
        it('should return the initial state', () => {
            expect(queryDate(undefined, {})).toEqual("");
        })

        it('should handle SET_QUERY_DATE', () => {
            const expected1 = "2018-01-01";
            const expected2 = "2018-12-31";

            expect(queryDate(undefined, {
                type: actions.SET_QUERY_DATE,
                queryDate: expected1,
            })).toEqual(expected1);

            expect(queryDate(expected1, {
                type: actions.SET_QUERY_DATE,
                queryDate: expected2,
            })).toEqual(expected2);

            expect(queryDate(expected2, {})).toEqual(expected2);

        })
    })
})