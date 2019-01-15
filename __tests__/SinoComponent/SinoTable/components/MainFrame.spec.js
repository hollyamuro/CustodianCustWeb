"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MainFrame from '../../../../src/SinoComponent/SinoTable/components/MainFrame'
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store'
import ShowTitle from '../../../../src/SinoComponent/SinoTable/containers/ShowTitle'
import ShowSearch from '../../../../src/SinoComponent/SinoTable/containers/ShowSearch'
import ShowTable from '../../../../src/SinoComponent/SinoTable/containers/ShowTable'

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const props = {}
    const store = configureStore()({
        title: "",
        data: [],
        columns: [],
        no_data_hint: "",
        sort: { sort_column: "", sort_direct: 0, },
        filter: "",
    })
    return {
        props,
        enzymeWrapper: mount(<Provider store={store}><MainFrame /></Provider>)
    }
}

describe('components', () => {
    describe('MainFrame', () => {
        it('should render self and subcomponents', () => {

            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.find('div').at(0).hasClass('scroll')).toBe(true);
            expect(enzymeWrapper.find('div').find(".scroll").length).toBe(1);

            expect(enzymeWrapper.find('div').at(1).hasClass('row')).toBe(true);
            expect(enzymeWrapper.find('div').find(".row").length).toBe(1);

            expect(enzymeWrapper.find('div').at(2).hasClass('col-sm-4')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('col-sm-4')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('col-sm-4')).toBe(true);
            expect(enzymeWrapper.find('div').find(".col-sm-4").length).toBe(3);

            expect(enzymeWrapper.find(ShowTitle).length).toBe(1);
            expect(enzymeWrapper.find(ShowSearch).length).toBe(1);
            expect(enzymeWrapper.find(ShowTable).length).toBe(1);
        })
    })
})