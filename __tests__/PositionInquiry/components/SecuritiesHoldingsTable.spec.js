"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import SecuritiesHoldingsTable from '../../../src/PositionInquiry/components/SecuritiesHoldingsTable'
import ShowBondTable from '../../../src/PositionInquiry/containers/ShowBondTable'
import ShowRPTable from '../../../src/PositionInquiry/containers/ShowRPTable'
import ShowRSTable from '../../../src/PositionInquiry/containers/ShowRSTable'

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
        enzymeWrapper: mount(<Provider store={store}><SecuritiesHoldingsTable /></Provider>),
    }
}

describe('components', () => {
    describe('SecuritiesHoldingsTable', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find("p").hasClass("position-title")).toBe(true);
            expect(enzymeWrapper.find("p").at(0).text()).toEqual("Securities Holdings");

            expect(enzymeWrapper.find("div").find(".bond-table").length).toBe(1);
            expect(enzymeWrapper.find(ShowBondTable).length).toBe(1);

            expect(enzymeWrapper.find("div").find(".rp-table").length).toBe(1);
            expect(enzymeWrapper.find(ShowRPTable).length).toBe(1);

            expect(enzymeWrapper.find("div").find(".rs-table").length).toBe(1);
            expect(enzymeWrapper.find(ShowRSTable).length).toBe(1);
        })
    })
})