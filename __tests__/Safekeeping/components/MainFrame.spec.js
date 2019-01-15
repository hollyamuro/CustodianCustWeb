"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import MainFrom from '../../../src/Safekeeping/components/MainFrame'
import ToolBar from '../../../src/Safekeeping/components/ToolBar'
import ShowContentFrame from '../../../src/Safekeeping/containers/ShowContentFrame'
import ShowLoading from '../../../src/Safekeeping/containers/ShowLoading'
import ShowMessage from '../../../src/Safekeeping/containers/ShowMessage'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
        queryPositionDate: { from: "", to: "", },
        account: "",
        isin: "",
        queryMaturityDate: { from: "", to: "", },
        balance: [],
        holding : [],
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    return {
        enzymeWrapper: mount(<Provider store={store}><MainFrom /></Provider>),
    }
}

describe('components', () => {
    describe('MainFrom', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(ToolBar).length).toBe(1);
            expect(enzymeWrapper.find(ShowContentFrame).length).toBe(1);
            expect(enzymeWrapper.find(ShowLoading).length).toBe(1);
            expect(enzymeWrapper.find(ShowMessage).length).toBe(1);
        })
    })
})