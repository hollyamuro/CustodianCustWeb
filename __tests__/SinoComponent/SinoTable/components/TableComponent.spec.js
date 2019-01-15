"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TableComponent from '../../../../src/SinoComponent/SinoTable/components/TableComponent'
import { setColumns, getCombinedColumns } from '../../../../src/SinoComponent/SinoTable/utils/helpers';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {

    const setupDefault = () => {
        const props = {}
        return {
            props,
            enzymeWrapper: mount(<TableComponent {...props} />),
        }
    }

    const setupNoData = () => {
        const props = {
            columns: [],
            data: [],
            sort: { sort_column: "", sort_direct: 0, },
            no_data_hint: "There is no data.",
            onSortClick: () => { },
        }

        return {
            props,
            enzymeWrapper: mount(<TableComponent {...props} />),
        }
    }

    const setup = () => {
        const column_name = {
            "a": "A",
            "b": "B",
            "c": "C",
        };
        const column_align = {
            "a": "left",
            "b": "center",
            "c": "right",
        };
        const column_size = {
            "a": "100px",
            "b": "100px",
            "c": "100px",
        };
        const data = [
            { a: 11, b: 12, c: 13 },
            { a: 21, b: 22, d: 23 },
            { d: 31, e: 32, f: 33 },
        ];

        const props = {
            columns: setColumns(column_name, column_align, column_size, getCombinedColumns(data)),
            data,
            sort: { sort_column: "", sort_direct: 0, },
            no_data_hint: "",
            onSortClick: () => { },
        }

        const spy = jest.spyOn(props, "onSortClick");

        return {
            props,
            enzymeWrapper: mount(<TableComponent {...props} />),
            spy,
        }
    }

    describe('TableComponent', () => {
        
        it('should render self and subcomponents (default)', () => {

            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('div').hasClass('sino-table-no-data')).toBe(true);
            expect(enzymeWrapper.find('div').find(".sino-table-no-data").length).toBe(1);
            expect(enzymeWrapper.find('div').text()).toBe("");

        })

        it('should render self and subcomponents when no data', () => {
            const { props, enzymeWrapper } = setupNoData();
            expect(enzymeWrapper.find('div').hasClass('sino-table-no-data')).toBe(true);
            expect(enzymeWrapper.find('div').find(".sino-table-no-data").length).toBe(1);
            expect(enzymeWrapper.find('div').text()).toBe(props.no_data_hint);
        })

        it('should render self and subcomponents', () => {

            const { props, enzymeWrapper, spy } = setup();

            expect(enzymeWrapper.find('table').hasClass('sino-table')).toBe(true);
            expect(enzymeWrapper.find('table').length).toBe(1);

            expect(enzymeWrapper.find('thead').hasClass('sino-thead')).toBe(true);
            expect(enzymeWrapper.find('thead').length).toBe(1);

            expect(enzymeWrapper.find('tbody').length).toBe(1);

            expect(enzymeWrapper.find('tr').at(0).hasClass('sino-tr')).toBe(true);
            expect(enzymeWrapper.find('tr').length).toBe(props.data.length + 1);

            expect(enzymeWrapper.find('th').at(0).hasClass('sino-th')).toBe(true);
            expect(enzymeWrapper.find('th').length).toBe(getCombinedColumns(props.data).length);

            expect(enzymeWrapper.find('td').at(0).hasClass('sino-td')).toBe(true);
            expect(enzymeWrapper.find('td').length).toBe(getCombinedColumns(props.data).length * props.data.length);

            // | a| b| c| d| e| f|
            // |--|--|--|--|--|--|
            // |11|12|13|  |  |  |
            // |--|--|--|--|--|--|
            // |21|22|  |23|  |  |
            // |--|--|--|--|--|--|
            // |  |  |  |31|32|33|
            // |--|--|--|--|--|--|

            expect(enzymeWrapper.find('td').at(0).text()).toBe(props.data[0].a.toString());
            expect(enzymeWrapper.find('td').at(1).text()).toBe(props.data[0].b.toString());
            expect(enzymeWrapper.find('td').at(2).text()).toBe(props.data[0].c.toString());
            expect(enzymeWrapper.find('td').at(3).contains(<br />)).toBe(true);
            expect(enzymeWrapper.find('td').at(4).contains(<br />)).toBe(true);
            expect(enzymeWrapper.find('td').at(5).contains(<br />)).toBe(true);

            expect(enzymeWrapper.find('td').at(6).text()).toBe(props.data[1].a.toString());
            expect(enzymeWrapper.find('td').at(7).text()).toBe(props.data[1].b.toString());
            expect(enzymeWrapper.find('td').at(8).contains(<br />)).toBe(true);
            expect(enzymeWrapper.find('td').at(9).text()).toBe(props.data[1].d.toString());
            expect(enzymeWrapper.find('td').at(10).contains(<br />)).toBe(true);
            expect(enzymeWrapper.find('td').at(11).contains(<br />)).toBe(true);

            expect(enzymeWrapper.find('td').at(12).contains(<br />)).toBe(true);
            expect(enzymeWrapper.find('td').at(13).contains(<br />)).toBe(true);
            expect(enzymeWrapper.find('td').at(14).contains(<br />)).toBe(true);
            expect(enzymeWrapper.find('td').at(15).text()).toBe(props.data[2].d.toString());
            expect(enzymeWrapper.find('td').at(16).text()).toBe(props.data[2].e.toString());
            expect(enzymeWrapper.find('td').at(17).text()).toBe(props.data[2].f.toString());

            spy.mockRestore();
        })

        it('should fire onSortClick while th is onClick', () => {
            const { props, enzymeWrapper, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);

            // click
            enzymeWrapper.find('th').at(0).prop('onClick')();

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            
            spy.mockRestore();
        })
    })

})