"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux"
import { setIsin } from '../../../src/Safekeeping/actions'
import ShowIsinText from '../../../src/Safekeeping/containers/ShowIsinText'
import SinoTextBox from '../../../src/SinoComponent/SinoTextBox'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({})
    const spy = jest.spyOn(store, 'dispatch')
    return {
        enzymeWrapper: mount(<Provider store={store}><ShowIsinText /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowIsinText', () => {
        it('should dispatch right action when onTextChange', () => {
            const { enzymeWrapper, store, spy } = setup();
            const isin = "AB1234567890";

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoTextBox).prop('onTextChange')({ target: { value: isin } });

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(setIsin(isin));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setIsin(isin));
            spy.mockRestore();
        })
    })
})