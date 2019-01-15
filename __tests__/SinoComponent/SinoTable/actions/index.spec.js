"use strict";

import * as actions from '../../../../src/SinoComponent/SinoTable/actions';
import { setColumns, getCombinedColumns } from '../../../../src/SinoComponent/SinoTable/utils/helpers'

describe('action', () => {
    describe('setTableTitle', () => {
        it('should create an action to set table title', () => {
            const title = 'test_tile';
            const expected = {
                type: actions.SET_TABLE_TITLE,
                title,
            }
            expect(actions.setTableTitle(title)).toEqual(expected);
        });
    })

    describe('setTableData', () => {
        it('should create an action to set table data', () => {
            const data = [{ a: 11, b: 12, c: 13 }, { a: 21, b: 22, c: 23 }, { a: 31, b: 32, c: 33 }];
            const expected = {
                type: actions.SET_TABLE_DATA,
                data,
            }
            expect(actions.setTableData(data)).toEqual(expected);
        })
    })

    describe('setNoDataHint', () => {
        it('should create an action to set hint when there is no data', () => {
            const hint = "NO DATA";
            const expected = {
                type: actions.SET_NO_DATA_HINT,
                hint,
            }
            expect(actions.setNoDataHint(hint)).toEqual(expected);
        })
    })

    describe('setTableColumns', () => {
        it('should create an action to set table columns', () => {
            const col_name = { 'a': 'A', 'b': "B", 'c': "C", 'd': 'D', };
            const col_align = { 'e': 'left', 'f': 'center', 'g': 'right', };
            const col_size = { 'a': '10%', 'c': '1rem', 'f': '100px', };
            const data = [
                { a: 11, b: 12, c: 13 },
                { a: 21, b: 22, d: 23 },
                { b: 31, a: 32, e: 33 },
                { a: 41, f: 42, b: 43 },
                { g: 51, a: 52, b: 53 },
            ];
            const columns = setColumns(col_name, col_align, col_size, getCombinedColumns(data));
            const expected = {
                type: actions.SET_TABLE_COLUMNS,
                columns,
            };
            expect(actions.setTableColumns(data, col_name, col_align, col_size)).toEqual(expected);
        })
    })

    describe('setTableSort', () => {
        it('should create an action to set table sort according to which column', () => {
            const sort_column = "SORT_COLUMN_NAME";
            const expected = {
                type: actions.SET_TABLE_SORT,
                sort_column,
            }
            expect(actions.setTableSort(sort_column)).toEqual(expected);
        })
    })

    describe('setTableFilter', () => {
        it('should create an action to set table filter key', () => {
            const filter = "filter_key";
            const expected = {
                type: actions.SET_TABLE_FILTER,
                filter,
            }
            expect(actions.setTableFilter(filter)).toEqual(expected);
        })
    })
})
