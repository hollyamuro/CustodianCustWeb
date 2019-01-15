import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import ShowDatePicker from '../../../src/ChargeOffHistory/containers/ShowDatePicker'
import SinoRangeDatePicker from '../../../src/SinoComponent/SinoRangeDatePicker'
import { setFromQueryDate, setToQueryDate } from '../../../src/ChargeOffHistory/actions'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
        chargeOff: { cash: [], holdings: [], },
        queryDate: { from: "2018/01/01", to: "2018/01/31", },
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    });
    const spy = jest.spyOn(store, 'dispatch');
    return {
        enzymeWrapper: mount(<Provider store={store}><ShowDatePicker /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowDatePicker', () => {
        it('should dispatch right action when onFromChange', () => {
            const { enzymeWrapper, store, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoRangeDatePicker).at(0).prop('onFromChange')(new Date(store.getState().queryDate.from));

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(setFromQueryDate(require("date-format")("yyyy-MM-dd", new Date(store.getState().queryDate.from))));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setFromQueryDate(require("date-format")("yyyy-MM-dd", new Date(store.getState().queryDate.from))));
            spy.mockRestore();
        })

        it('should dispatch right action when onToChange', () => {
            const { enzymeWrapper, store, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // onChange
            enzymeWrapper.find(SinoRangeDatePicker).at(0).prop('onToChange')(new Date(store.getState().queryDate.to));

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith(setToQueryDate(require("date-format")("yyyy-MM-dd", new Date(store.getState().queryDate.to))));
            expect(spy).toHaveBeenCalledTimes(1);
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setToQueryDate(require("date-format")("yyyy-MM-dd", new Date(store.getState().queryDate.to))));
            spy.mockRestore();
        })
    })
})

