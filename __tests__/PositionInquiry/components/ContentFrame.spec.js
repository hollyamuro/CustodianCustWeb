"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ContentFrame from '../../../src/PositionInquiry/components/ContentFrame'
import PortfolioSummaryTable from '../../../src/PositionInquiry/components/PortfolioSummaryTable'
import SecuritiesHoldingsTable from '../../../src/PositionInquiry/components/SecuritiesHoldingsTable'

Enzyme.configure({ adapter: new Adapter() })

const setupDefault = () => {
    const props = {}
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
        props,
        enzymeWrapper: mount(<Provider store={store}><ContentFrame {...props}/></Provider>)
    }
}

const setupEnable = () => {
    const props = {
        enable: true
    }
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
        props,
        enzymeWrapper: mount(<Provider store={store}><ContentFrame {...props}/></Provider>)
    }
}
// const setup
describe('components', () => {
    describe('ContentFrame', () => {
        it('should render self and subcomponents (default)', () => {
            const { props, enzymeWrapper } = setupDefault();
            expect(enzymeWrapper.find(PortfolioSummaryTable).length).toBe(0);
            expect(enzymeWrapper.find(SecuritiesHoldingsTable).length).toBe(0);
        })

        it('should render self and subcomponents (default)', () => {
            const { props, enzymeWrapper } = setupEnable();
            expect(enzymeWrapper.find(PortfolioSummaryTable).length).toBe(1);
            expect(enzymeWrapper.find(SecuritiesHoldingsTable).length).toBe(1);
        })
    })
})