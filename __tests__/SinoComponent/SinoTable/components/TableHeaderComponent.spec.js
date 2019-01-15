"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TableHeaderComponent from '../../../../src/SinoComponent/SinoTable/components/TableHeaderComponent'

Enzyme.configure({ adapter: new Adapter() });

const setupDefault = () => {
    const props = {}
    return {
        props,
        enzymeWrapper: mount(<TableHeaderComponent {...props} />)
    }
}

const setupUnClick = () => {
    const props = { text: "COLUMN_NAME", status: 0, }
    return {
        props,
        enzymeWrapper: mount(<TableHeaderComponent {...props} />)
    }
}

const setupIncreaseClick = () => {
    const props = { text: "COLUMN_NAME", status: 1, }
    return {
        props,
        enzymeWrapper: mount(<TableHeaderComponent {...props} />)
    }
}

const setupDecreaseClick = () => {
    const props = { text: "COLUMN_NAME", status: -1, }
    return {
        props,
        enzymeWrapper: mount(<TableHeaderComponent {...props} />)
    }
}

describe('components', () => {
    describe('TableHeaderComponent', () => {

        it('should render self and subcomponents (default)', () => {
            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('span').hasClass('sino-table-header-sort')).toBe(true);
            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toEqual("");

            expect(enzymeWrapper.find('div').find('.inline').hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').find('.inline').length).toBe(1);

            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').at(0).hasClass('sino-table-header-sort-none')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').at(1).hasClass('sino-table-header-sort-none')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').length).toBe(2);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-show').length).toBe(0);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-hide').length).toBe(0);
            expect(enzymeWrapper.find('img').at(0).prop('src')).toEqual("/svg/triangle-down.svg");
            expect(enzymeWrapper.find('img').at(1).prop('src')).toEqual("/svg/triangle-up.svg");
        })

        it('should render self and subcomponents when unclick case', () => {
            const { props, enzymeWrapper } = setupUnClick();

            expect(enzymeWrapper.find('span').hasClass('sino-table-header-sort')).toBe(true);
            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toEqual(props.text);

            expect(enzymeWrapper.find('div').find('.inline').hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').find('.inline').length).toBe(1);

            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').at(0).hasClass('sino-table-header-sort-none')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').at(1).hasClass('sino-table-header-sort-none')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').length).toBe(2);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-show').length).toBe(0);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-hide').length).toBe(0);
            expect(enzymeWrapper.find('img').at(0).prop('src')).toEqual("/svg/triangle-down.svg");
            expect(enzymeWrapper.find('img').at(1).prop('src')).toEqual("/svg/triangle-up.svg");
        })

        it('should render self and subcomponents when increase click', () => {
            const { props, enzymeWrapper } = setupIncreaseClick();

            expect(enzymeWrapper.find('span').hasClass('sino-table-header-sort')).toBe(true);
            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toEqual(props.text);

            expect(enzymeWrapper.find('div').find('.inline').hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').find('.inline').length).toBe(1);

            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-show').hasClass('sino-table-header-sort-show')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-hide').hasClass('sino-table-header-sort-hide')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-show').length).toBe(1);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-hide').length).toBe(1);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').length).toBe(0);
            expect(enzymeWrapper.find('img').at(0).prop('src')).toEqual("/svg/triangle-down.svg");
            expect(enzymeWrapper.find('img').at(1).prop('src')).toEqual("/svg/triangle-up.svg");
        })

        it('should render self and subcomponents when decrease click', () => {
            const { props, enzymeWrapper } = setupDecreaseClick();

            expect(enzymeWrapper.find('span').hasClass('sino-table-header-sort')).toBe(true);
            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toEqual(props.text);

            expect(enzymeWrapper.find('div').find('.inline').hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').find('.inline').length).toBe(1);

            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-show').hasClass('sino-table-header-sort-show')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-hide').hasClass('sino-table-header-sort-hide')).toBe(true);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-show').length).toBe(1);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-hide').length).toBe(1);
            expect(enzymeWrapper.find('img').find('.sino-table-header-sort-none').length).toBe(0);
            expect(enzymeWrapper.find('img').at(0).prop('src')).toEqual("/svg/triangle-up.svg");
            expect(enzymeWrapper.find('img').at(1).prop('src')).toEqual("/svg/triangle-down.svg");
        })
    })
})