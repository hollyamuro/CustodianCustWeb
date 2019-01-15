"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from "react-redux"
import { requestLoadSafekeeping } from '../../../src/Safekeeping/actions'
import ShowButton from '../../../src/Safekeeping/containers/ShowButton'
import SinoRoundButton from '../../../src/SinoComponent/SinoRoundButton'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore([thunk])({
        queryPositionDate: { from: "", to: "", },
        account: "",
        isin: "",
        queryMaturityDate: { from: "", to: "", },
        balance: [],
        holding: [],
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    })
    const spy = jest.spyOn(store, 'dispatch')
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
            const account = "TEST";

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoRoundButton).prop('onButtonClick')();

            // after
            expect(spy).toHaveBeenCalled();
            // expect(spy).toHaveBeenCalledWith(doLoadSafekeeping());
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(requestLoadSafekeeping());
            spy.mockRestore();
        })
    })
})