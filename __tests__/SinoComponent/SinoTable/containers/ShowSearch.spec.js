"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store'
import SinoRoundTextBox from '../../../../src/SinoComponent/SinoRoundTextBox'
import ShowSearch from '../../../../src/SinoComponent/SinoTable/containers/ShowSearch'
import * as actions from '../../../../src/SinoComponent/SinoTable/actions';

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
	const props = {}
	const store = configureStore()({
		title: "",
		data: [],
		columns: [],
		no_data_hint: "",
		sort: { sort_column: "", sort_direct: 0, },
		filter: "test",
	})
	return {
		props,
		enzymeWrapper: mount(<Provider store={store}><ShowSearch /></Provider>),
		store,
	}
}

describe('containers', () => {
	describe('ShowSearch', () => {
		it('should dispatch right action when onTextChange', () => {
			const { props, enzymeWrapper, store } = setup();
			expect(store.getActions().length).toBe(0);
			enzymeWrapper.find(SinoRoundTextBox).prop('onTextChange')({ target: { value: store.getState().filter } });
			expect(store.getActions().length).toBe(1);
			expect(store.getActions()[0]).toEqual(actions.setTableFilter(store.getState().filter));
		})
	})
})