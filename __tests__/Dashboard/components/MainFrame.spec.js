"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from "react-redux"
import MainFrame from '../../../src/Dashboard/components/MainFrame'
import configureStore from 'redux-mock-store'
import CouponShowTable from '../../../src/Dashboard/containers/CouponShowTable'
import ShowLoading from '../../../src/Dashboard/containers/ShowLoading'
import ShowMessage from '../../../src/Dashboard/containers/ShowMessage'

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
    const props = {}
    const store = configureStore()({
        coupon: [],
        isLoading: false,
        isMsgShown: false,
        msg: {
            type: "",
            title: "",
            text: "",
        }
    })
    return {
        props,
        enzymeWrapper: mount(<Provider store={store}><MainFrame /></Provider>)
    }
}

describe('components', () => {
    describe('MainFrame', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(CouponShowTable).length).toBe(1);
            expect(enzymeWrapper.find(ShowLoading).length).toBe(1);
            expect(enzymeWrapper.find(ShowMessage).length).toBe(1);
        })
    })
})