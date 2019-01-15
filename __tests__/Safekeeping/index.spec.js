"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from '../../src/Safekeeping'
import MainFrame from '../../src/Safekeeping/components/MainFrame'
import { Provider } from "react-redux";

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    return {
        enzymeWrapper: mount(<App />),
    }
}

describe('components', () => {
    describe('App', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(Provider).length).toBe(3); //self + 2 tables
            expect(enzymeWrapper.find(MainFrame).length).toBe(1);

            //test when props change
            enzymeWrapper.setProps({});
            expect(enzymeWrapper.find(Provider).length).toBe(3); //self + 2 tables
            expect(enzymeWrapper.find(MainFrame).length).toBe(1);
        })
    })
})