"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ShowDatePicker from '../../../src/PositionInquiry/containers/ShowDatePicker'
import SinoDatePicker from '../../../src/SinoComponent/SinoDatePicker'
import { setQueryDate } from '../../../src/PositionInquiry/actions'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const props = {};
    const store = configureStore()({
        position: { cash: [], bond: [], rp: [], rs: [], },
        queryDate: "2018-01-01",
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    const spy = jest.spyOn(store, 'dispatch');
    return {
        props,
        enzymeWrapper: mount(<Provider store={store}><ShowDatePicker /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowDatePicker', () => {
        it('should handle onTextChange', () => {
            const { props, enzymeWrapper, store, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // text change
            enzymeWrapper.find(SinoDatePicker).prop('onTextChange')(new Date(store.getState().queryDate));

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toBeCalledWith(setQueryDate(store.getState().queryDate));
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setQueryDate(store.getState().queryDate));

            spy.mockRestore();
        })
    })
})