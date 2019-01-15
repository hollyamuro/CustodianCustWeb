import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import ShowButton from '../../../src/ChargeOffHistory/containers/ShowButton'
import SinoRoundButton from '../../../src/SinoComponent/SinoRoundButton'
import { requestLoadChargeOff, loadChargeOff } from '../../../src/ChargeOffHistory/actions'


Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore([thunk])({
        chargeOff: { cash: [], holdings: [], },
        queryDate: { from: "", to: "", },
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    const spy = jest.spyOn(store, 'dispatch');
    return {
        enzymeWrapper: mount(<Provider store={store}><ShowButton /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowButton', () => {
        it('should dispatch right action when onButtonClick', () => {
            const { enzymeWrapper, store, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoRoundButton).prop('onButtonClick')();

            // after
            expect(spy).toHaveBeenCalled();
            // expect(spy).toHaveBeenCalledWith(loadChargeOff());
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(requestLoadChargeOff());
            spy.mockRestore();
        })
    })
})