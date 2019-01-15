"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from "react-redux";
import SinoTable from '../../../src/SinoComponent/SinoTable'
import MainFrame from "../../../src/SinoComponent/SinoTable/components/MainFrame";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    return {
        enzymeWrapper: mount(<SinoTable />)
    }
}

describe('components', () => {
    describe('SinoTable', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(Provider).length).toBe(1);
            expect(enzymeWrapper.find(MainFrame).length).toBe(1);

            //test when props change
            enzymeWrapper.setProps({ title: "test title" });    
            expect(enzymeWrapper.find(Provider).length).toBe(1);
            expect(enzymeWrapper.find(MainFrame).length).toBe(1);
        })
    })
})