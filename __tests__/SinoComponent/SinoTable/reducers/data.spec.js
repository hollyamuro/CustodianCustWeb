"use strict";

import { title, data, columns, no_data_hint, sort, filter } from '../../../../src/SinoComponent/SinoTable/reducers/data';
import * as helper from '../../../../src/SinoComponent/SinoTable/utils/helpers'
import * as actions from '../../../../src/SinoComponent/SinoTable/actions';


describe('data reducer', () => {

    describe('title', () => {
        it('should return the initial state of title', () => {
            expect(title(undefined, {})).toEqual("");
        })

        it('should handle SET_TABLE_TITLE', () => {
            const tableTitle = 'THIS IS TABLE TITLE';
            const changeTableTitle = 'THIS IS CHANGED TABLE TITLE';

            // undefined => FIRST TITLE
            expect(
                title(undefined, {
                    type: actions.SET_TABLE_TITLE,
                    title: tableTitle,
                })
            ).toEqual(tableTitle);

            // FIRST TITLE => CHANGED TITLE
            expect(
                title(tableTitle, {
                    type: actions.SET_TABLE_TITLE,
                    title: changeTableTitle,
                })
            ).toEqual(changeTableTitle);
        })
    })

    describe('data', () => {
        it('should return the initial state of data', () => {
            expect(data(undefined, {})).toEqual([]);
        })

        it('should handle SET_TABLE_DATA', () => {
            const tableData = [{ a: 11, b: 12, c: 13 }, { a: 21, b: 22, c: 23 }, { a: 31, b: 32, c: 33 }];
            const changeTableData = [{ a: 41, b: 42, c: 43 }, { a: 51, b: 52, c: 53 }];

            // undefined => FIRST DATA
            expect(
                data(undefined, {
                    type: actions.SET_TABLE_DATA,
                    data: tableData,
                })
            ).toEqual(tableData);

            // FIRST DATA => CHANGED DATA
            expect(
                data(tableData, {
                    type: actions.SET_TABLE_DATA,
                    data: changeTableData,
                })
            ).toEqual(changeTableData);
        })
    })

    describe('columns', () => {
        it('should return the initial state of columns', () => {
            expect(columns(undefined, {})).toEqual([]);
        })

        it('should handle SET_TABLE_COLUMNS', () => {
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
            const changedData = [
                { a: 61, b: 62, c: 63 },
                { a: 71, b: 72, d: 73 },
                { b: 81, a: 82, e: 83 },
                { a: 91, f: 92, b: 93 },
            ];
            const tableColumns = helper.setColumns(col_name, col_align, col_size, helper.getCombinedColumns(data));
            const changedtableColumns = helper.setColumns(col_name, col_align, col_size, helper.getCombinedColumns(changedData));


            // undefined => FIRST DATA
            expect(
                columns(undefined, {
                    type: actions.SET_TABLE_COLUMNS,
                    columns: tableColumns,
                })
            ).toEqual(tableColumns);

            // FIRST DATA => CHANGED DATA
            expect(
                columns(tableColumns, {
                    type: actions.SET_TABLE_COLUMNS,
                    columns: changedtableColumns,
                })
            ).toEqual(changedtableColumns);
        })
    })

    describe('no_data_hint', () => {
        it('should return the initial state of no_data_hint', () => {
            expect(no_data_hint(undefined, {})).toEqual("");
        })

        it('should handle SET_NO_DATA_HINT', () => {
            const tableNoTitle = 'NO DATA';
            const changeTableNoTitle = 'STILL NO DATA';

            // undefined => FIRST DATA
            expect(
                no_data_hint(undefined, {
                    type: actions.SET_NO_DATA_HINT,
                    hint: tableNoTitle,
                })
            ).toEqual(tableNoTitle);

            // FIRST DATA => CHANGED DATA
            expect(
                no_data_hint(tableNoTitle, {
                    type: actions.SET_NO_DATA_HINT,
                    hint: changeTableNoTitle,
                })
            ).toEqual(changeTableNoTitle);
        })
    })

    describe('sort', () => {
        it('should return the initial state of sort', () => {
            expect(sort(undefined, {})).toEqual({
                sort_column: "",
                sort_direct: 0,
            });
        })

        it('should handle ', () => {
            const sort1st = { type: actions.SET_TABLE_SORT, sort_column: 'A', };
            const sort2nd = { type: actions.SET_TABLE_SORT, sort_column: 'A', };
            const sort3rd = { type: actions.SET_TABLE_SORT, sort_column: 'B', };

            const expected1st = { sort_column: sort1st.sort_column, sort_direct: 1, };
            const expected2nd = { sort_column: sort2nd.sort_column, sort_direct: -1, };
            const expected3rd = { sort_column: sort3rd.sort_column, sort_direct: 1, };

            expect(sort(undefined, sort1st)).toEqual(expected1st);
            expect(sort(expected1st, sort2nd)).toEqual(expected2nd);
            expect(sort(expected2nd, sort3rd)).toEqual(expected3rd);
        })
    })

    describe('filter', () => {
        it('should return the initial state of filter', () => {
            expect(filter(undefined, {})).toEqual("");
        })

        it('should handle SET_TABLE_FILTER', () => {
            const keyWord = 'KEY';
            const changeKeyWord = 'NEW KEY';

            // undefined => FIRST DATA
            expect(
                filter(undefined, {
                    type: actions.SET_TABLE_FILTER,
                    filter: keyWord,
                })
            ).toEqual(keyWord);

            // FIRST DATA => CHANGED DATA
            expect(
                filter(keyWord, {
                    type: actions.SET_TABLE_FILTER,
                    filter: changeKeyWord,
                })
            ).toEqual(changeKeyWord);
        })
    })
})




