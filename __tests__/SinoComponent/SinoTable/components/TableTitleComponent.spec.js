"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TableTitleComponent from '../../../../src/SinoComponent/SinoTable/components/TableTitleComponent'

Enzyme.configure({ adapter: new Adapter() });

const setupDefault = () => {
    const props = {}
    return {
        props,
        enzymeWrapper: mount(<TableTitleComponent {...props} />)
    }
}

const setup = () => {
    const props = { title: "Hello World!" }
    return {
        props,
        enzymeWrapper: mount(<TableTitleComponent {...props} />)
    }
}

describe('components', () => {
    describe('TableTitleComponent', () => {

        it('should render self and subcomponents (default)', () => {
            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('div').hasClass('sino-table-table-title')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(1);

            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toEqual("");
        })

        it('should render self and subcomponents', () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.find('div').hasClass('sino-table-table-title')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(1);

            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toEqual(props.title);
        })
    })
})