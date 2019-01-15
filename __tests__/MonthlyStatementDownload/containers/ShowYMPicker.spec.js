import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ShowYMPicker from '../../../src/MonthlyStatementDownload/containers/ShowYMPicker'
import SinoSelect from '../../../src/SinoComponent/SinoSelect'
import { setYM } from '../../../src/MonthlyStatementDownload/actions'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const props = {};
    const store = configureStore()({
        isLoading: false,
        isMsgShown: false,
        msg: {
            type: "",
            title: "",
            text: "",
        },
        ym: "2018/01",
    });
    const spy = jest.spyOn(store, 'dispatch');
    return {
        props,
        enzymeWrapper: mount(<Provider store={store}><ShowYMPicker {...props} /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowYMPicker', () => {
        it('should dispatch right action when onOptionChange', () => {
            const { props, enzymeWrapper, store, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // option change
            enzymeWrapper.find(SinoSelect).prop('onOptionChange')({ target: { value: store.getState().ym } });

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(setYM(store.getState().ym));
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(setYM(store.getState().ym));

            spy.mockRestore();
        })
    })
})