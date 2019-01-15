"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from "react-redux";
import App from '../../src/Dashboard'
import MainFrame from '../../src/Dashboard/components/MainFrame'

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    return {
        enzymeWrapper: mount(<App />)
    }
}

describe('components', () => {
    describe('App', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            //sub table also have provider
            expect(enzymeWrapper.find(Provider).length).toBe(2); 
            expect(enzymeWrapper.find(MainFrame).length).toBe(1);
        })
    })
})