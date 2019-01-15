"use strict"
import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import MainFrame from '../../../src/PositionInquiry/components/MainFrame'
import ToolBar from '../../../src/PositionInquiry/components/ToolBar'
import ShowLoading from '../../../src/PositionInquiry/containers/ShowLoading'
import ShowMessage from '../../../src/PositionInquiry/containers/ShowMessage'
import ShowContentFrame from '../../../src/PositionInquiry/containers/ShowContentFrame'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
        position: { cash: [], bond: [], rp: [], rs: [], },
        queryDate: "",
        isLoading: false,
        isMsgShown: false,
        msg: {
            type: "",
            title: "",
            text: "",
        }
    });
    return {
        enzymeWrapper: mount(<Provider store={store}><MainFrame /></Provider>)
    }
}

describe('components', () => {
    describe('MainFrame', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(ToolBar).length).toBe(1);
            expect(enzymeWrapper.find(ShowContentFrame).length).toBe(1);
            expect(enzymeWrapper.find(ShowLoading).length).toBe(1);
            expect(enzymeWrapper.find(ShowMessage).length).toBe(1);      
        })
    })
})