"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ContentFrame from '../../../src/Safekeeping/components/ContentFrame'

import ShowBalanceTable from '../../../src/Safekeeping/containers/ShowBalanceTable'
import ShowHoldingTable from '../../../src/Safekeeping/containers/ShowHoldingTable'
import ShowBalanceExportBtn from '../../../src/Safekeeping/containers/ShowBalanceExportBtn'
import ShowHoldingExportBtn from '../../../src/Safekeeping/containers/ShowHoldingExportBtn'

Enzyme.configure({ adapter: new Adapter() })

const setupDefault = () => {
    const props = {}
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
        enzymeWrapper: mount(<Provider store={store}><ContentFrame {...props} /></Provider>),
    }
}

const setup = () => {
    const props = { enable: true }
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
        enzymeWrapper: mount(<Provider store={store}><ContentFrame {...props} /></Provider>),
    }
}

describe('components', () => {
    describe('MainFrom', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setupDefault();
            expect(enzymeWrapper.find(ShowBalanceExportBtn).length).toBe(0);
            expect(enzymeWrapper.find('div').find('.balance-table').length).toBe(0);
            expect(enzymeWrapper.find(ShowBalanceTable).length).toBe(0);

            expect(enzymeWrapper.find(ShowHoldingExportBtn).length).toBe(0);
            expect(enzymeWrapper.find('div').find('.holding-table').length).toBe(0);
            expect(enzymeWrapper.find(ShowHoldingTable).length).toBe(0);
        })

        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(ShowBalanceExportBtn).length).toBe(1);
            expect(enzymeWrapper.find('div').find('.balance-table').length).toBe(1);
            expect(enzymeWrapper.find(ShowBalanceTable).length).toBe(1);

            expect(enzymeWrapper.find(ShowHoldingExportBtn).length).toBe(1);
            expect(enzymeWrapper.find('div').find('.holding-table').length).toBe(1);
            expect(enzymeWrapper.find(ShowHoldingTable).length).toBe(1);
        })
    })
})