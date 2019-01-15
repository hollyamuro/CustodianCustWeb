import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import ToolBar from '../../../src/ChargeOffHistory/components/ToolBar'
import ShowDatePicker from '../../../src/ChargeOffHistory/containers/ShowDatePicker'
import ShowButton from '../../../src/ChargeOffHistory/containers/ShowButton'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
        chargeOff: { cash: [], holdings: [], },
        queryDate: { from: "", to: "", },
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
        it('should render self and subcomponents', () => {
            const { enzymeWrapper } = setup();
            expect(enzymeWrapper.find(".flex-container").length).toBe(1);
            expect(enzymeWrapper.find(ShowDatePicker).length).toBe(1);
            expect(enzymeWrapper.find(".align-right-mobile").length).toBe(1);
            expect(enzymeWrapper.find(ShowButton).length).toBe(1);
        })
    })
})