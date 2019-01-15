"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux"
import { hideMessage } from '../../../src/PositionInquiry/actions'
import ShowMessage from '../../../src/PositionInquiry/containers/ShowMessage'
import SinoPopout from '../../../src/SinoComponent/SinoPopout'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    const spy = jest.spyOn(store, 'dispatch');
    return {
        enzymeWrapper: mount(<Provider store={store}><ShowMessage /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowMessage', () => {
        it('should dispatch right action when onClose', () => {
            const { enzymeWrapper, store, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoPopout).prop('onClose')();

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(hideMessage());
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(hideMessage());
            spy.mockRestore();
        })
    })
})