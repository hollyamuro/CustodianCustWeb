import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import ShowButton from '../../../src/NotChargeOffHistory/containers/ShowButton'
import SinoRoundButton from '../../../src/SinoComponent/SinoRoundButton'
import { loadNotChargeOff, requestLoadNotChargeOff} from '../../../src/NotChargeOffHistory/actions'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore([thunk])({
        notChargeOff: { cash: [], holdings: [], },
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
        it('should dispatch right action when OnClick', () => { 
            const { enzymeWrapper, store, spy} = setup();

              // before
              expect(spy).not.toHaveBeenCalled();
              expect(spy).toHaveBeenCalledTimes(0);
              expect(store.getActions().length).toBe(0);
  
              // onChange
              enzymeWrapper.find(SinoRoundButton).prop('onButtonClick')();
  
              // after
              expect(spy).toHaveBeenCalled();
              // expect(spy).toHaveBeenCalledWith(loadNotChargeOff());
              expect(spy).toHaveBeenCalledTimes(1);
              expect(store.getActions().length).toBe(1);
              expect(store.getActions()[0]).toEqual(requestLoadNotChargeOff());
              spy.mockRestore();
        })
    })
})