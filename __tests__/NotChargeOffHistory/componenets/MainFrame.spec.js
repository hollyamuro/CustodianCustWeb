import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import MainFrame from '../../../src/NotChargeOffHistory/components/MainFrame'
import ToolBar from '../../../src/NotChargeOffHistory/components/ToolBar'
import ShowContentFrame from '../../../src/NotChargeOffHistory/containers/ShowContentFrame'
import ShowLoading from '../../../src/NotChargeOffHistory/containers/ShowLoading'
import ShowMessage from '../../../src/NotChargeOffHistory/containers/ShowMessage'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
        notChargeOff: { cash: [], holdings: [], },
        queryDate: { from: "", to: "", },
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    return {
        enzymeWrapper: mount(<Provider store={store}><MainFrame /></Provider>),
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