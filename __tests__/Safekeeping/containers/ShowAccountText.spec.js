"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux"
import { setAccount } from '../../../src/Safekeeping/actions'
import ShowAccountText from '../../../src/Safekeeping/containers/ShowAccountText'
import SinoTextBox from '../../../src/SinoComponent/SinoTextBox'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({})
    const spy = jest.spyOn(store, 'dispatch')
    return {
        enzymeWrapper: mount(<Provider store={store}><ShowAccountText /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowAccountText', () => {
        it('should dispatch right action when onTextChange', () => {
            const { enzymeWrapper, store, spy } = setup();
            const account = "TEST";

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoTextBox).prop('onTextChange')({ target: { value: account } });

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(setAccount(account));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setAccount(account));
            spy.mockRestore();
        })
    })
})