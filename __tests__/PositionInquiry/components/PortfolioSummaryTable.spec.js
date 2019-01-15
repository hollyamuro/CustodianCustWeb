"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import PortfolioSummaryTable from '../../../src/PositionInquiry/components/PortfolioSummaryTable'
import ShowCashTable from '../../../src/PositionInquiry/containers/ShowCashTable'

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
    })
    return {
        enzymeWrapper: mount(<Provider store={store}><PortfolioSummaryTable /></Provider>),
    }
}

describe('components', () => {
    describe('PortfolioSummaryTable', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find("p").hasClass("position-title")).toBe(true);
            expect(enzymeWrapper.find("p").at(0).text()).toEqual("Portfolio Summary");

            expect(enzymeWrapper.find("div").find(".cash-table").length).toBe(1);
            expect(enzymeWrapper.find(ShowCashTable).length).toBe(1);
        })
    })
})