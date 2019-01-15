"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import ToolBar from '../../../src/Safekeeping/components/ToolBar'
import ShowPositionDatePicker from "../../../src/Safekeeping/containers/ShowPositionDatePicker";
import ShowMaturityDatePicker from "../../../src/Safekeeping/containers/ShowMaturityDatePicker";
import ShowAccountText from "../../../src/Safekeeping/containers/ShowAccountText";
import ShowIsinText from "../../../src/Safekeeping/containers/ShowIsinText";
import ShowButton from "../../../src/Safekeeping/containers/ShowButton";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const store = configureStore()({
        queryPositionDate: { from: "", to: "", },
        account: "",
        isin: "",
        queryMaturityDate: { from: "", to: "", },
        balance: [],
        holding: [],
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    return {
        enzymeWrapper: mount(<Provider store={store}><ToolBar /></Provider>),
    }
}

describe('components', () => {
    describe('ToolBar', () => {
        it('should render self and subcomponenets', () => {
            const { enzymeWrapper } = setup();

            expect(enzymeWrapper.find('div').find('.row-item').length).toBe(4);
            expect(enzymeWrapper.find('div').find('.input-column-title').length).toBe(4);
            expect(enzymeWrapper.find('div').find('.input-column-title').at(0).text()).toEqual("Position Date")
            expect(enzymeWrapper.find('div').find('.input-column-title').at(1).text()).toEqual("Client Account")
            expect(enzymeWrapper.find('div').find('.input-column-title').at(2).text()).toEqual("Isin")
            expect(enzymeWrapper.find('div').find('.input-column-title').at(3).text()).toEqual("Maturity Date")
            expect(enzymeWrapper.find('div').find('.input-column').length).toBe(4);
            expect(enzymeWrapper.find('div').find(ShowPositionDatePicker).length).toBe(1);
            expect(enzymeWrapper.find('div').find(ShowMaturityDatePicker).length).toBe(1);
            expect(enzymeWrapper.find('div').find(ShowAccountText).length).toBe(1);
            expect(enzymeWrapper.find('div').find(ShowIsinText).length).toBe(1);

            expect(enzymeWrapper.find('div').find('#search-button').length).toBe(1);
            expect(enzymeWrapper.find('div').find(ShowButton).length).toBe(1);
        })
    })
})