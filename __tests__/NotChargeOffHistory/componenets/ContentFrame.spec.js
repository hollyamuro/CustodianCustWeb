import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

import ContentFrame from '../../../src/NotChargeOffHistory/components/ContentFrame'
import ShowCashTable from '../../../src/NotChargeOffHistory/containers/ShowCashTable'
import ShowHoldingsTable from '../../../src/NotChargeOffHistory/containers/ShowHoldingsTable'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const props = {}
    const store = configureStore()({
        notChargeOff: { cash: [], holdings: [], },
        queryDate: { from: "", to: "", },
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    return {
        enzymeWrapper: mount(<Provider store={store}><ContentFrame {...props} /></Provider>),
    }
}

const setupEnable = () => {
    const props = { enable: true }
    const store = configureStore()({
        notChargeOff: { cash: [], holdings: [], },
        queryDate: { from: "", to: "", },
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    return {
        enzymeWrapper: mount(<Provider store={store}><ContentFrame {...props} /></Provider>),
    }
}

describe('components', () => {
    describe('ContentFrame', () => {
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(".cash-table").length).toBe(0);
            expect(enzymeWrapper.find(ShowCashTable).length).toBe(0);
            expect(enzymeWrapper.find(".holdings-table").length).toBe(0);
            expect(enzymeWrapper.find(ShowHoldingsTable).length).toBe(0);
        })

        it('should render self and subcomponents when enable', () => {
            const { enzymeWrapper } = setupEnable();
            expect(enzymeWrapper.find(".cash-table").length).toBe(1);
            expect(enzymeWrapper.find(ShowCashTable).length).toBe(1);
            expect(enzymeWrapper.find(".holdings-table").length).toBe(1);
            expect(enzymeWrapper.find(ShowHoldingsTable).length).toBe(1);
        })
    })
})