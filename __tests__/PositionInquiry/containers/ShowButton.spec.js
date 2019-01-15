"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux"
import thunk from 'redux-thunk'
import * as actions from '../../../src/PositionInquiry/actions'
import ShowButton from '../../../src/PositionInquiry/containers/ShowButton'
import SinoRoundButton from '../../../src/SinoComponent/SinoRoundButton'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const props = {}
    const store = configureStore([thunk])({
        position: { cash: [], bond: [], rp: [], rs: [], },
        queryDate: "",
        isLoading: false,
        isMsgShown: false,
        msg: { type: "", title: "", text: "", }
    })
    const spy = jest.spyOn(store, 'dispatch');
    return {
        props,
        enzymeWrapper: mount(<Provider store={store}><ShowButton {...props} /></Provider>),
        store,
        spy,
    }
}

describe('containers', () => {
    describe('ShowButton', () => {
        it('should dispatch right action when onClick', () => {
            const { props, enzymeWrapper, store, spy, } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(store.getActions().length).toBe(0);

            // click
            enzymeWrapper.find(SinoRoundButton).prop('onButtonClick')();

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
            // expect(spy).toHaveBeenCalledWith(actions.loadPosition());
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());  //do loadPosition

            spy.mockRestore();
        })
    })
})