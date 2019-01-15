"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux"
import { setFromMaturityDate, setToMaturityDate } from '../../../src/Safekeeping/actions'
import ShowMaturityDatePicker from '../../../src/Safekeeping/containers/ShowMaturityDatePicker'
import SinoRangeDatePicker from '../../../src/SinoComponent/SinoRangeDatePicker'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
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
    const spy = jest.spyOn(store, 'dispatch');
    return {
        enzymeWrapper: mount(<Provider store={store}><ShowMaturityDatePicker /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowMaturityDatePicker', () => {
        it('should dispatch right action when onFromChange', () => {
            const { enzymeWrapper, store, spy } = setup();
            const from = new Date("2018-01-01");

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoRangeDatePicker).prop('onFromChange')(from);

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(setFromMaturityDate(require("date-format")("yyyy-MM-dd", from)));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setFromMaturityDate(require("date-format")("yyyy-MM-dd", from)));
            spy.mockRestore();
        })

        it('should dispatch right action when onToChange', () => {
            const { enzymeWrapper, store, spy } = setup();
            const from = new Date("2018-01-01");

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoRangeDatePicker).prop('onToChange')(from);

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(setToMaturityDate(require("date-format")("yyyy-MM-dd", from)));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setToMaturityDate(require("date-format")("yyyy-MM-dd", from)));
            spy.mockRestore();
        })
    })
})