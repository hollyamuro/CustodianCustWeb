"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store'
import ShowTable from '../../../../src/SinoComponent/SinoTable/containers/ShowTable'
import { setTableSort } from '../../../../src/SinoComponent/SinoTable/actions';
import { setColumns, getCombinedColumns } from '../../../../src/SinoComponent/SinoTable/utils/helpers'

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
	const column_name = {
		"a": "A",
		"b": "B",
		"c": "C",
	};
	const column_align = {
		"a": "left",
		"b": "center",
		"c": "right",
	};
	const column_size = {
		"a": "100px",
		"b": "100px",
		"c": "100px",
	};
	const data = [
		{ a: 11, b: 12, c: 13 },
		{ a: 21, b: 22, d: 23 },
		{ d: 31, e: 32, f: 33 },
	];

	const props = {}
	const store = configureStore()({
		title: "",
		data,
		columns: setColumns(column_name, column_align, column_size, getCombinedColumns(data)),
		no_data_hint: "",
		sort: { sort_column: "", sort_direct: 0, },
		filter: "",
	})
	const spy = jest.spyOn(store, 'dispatch');
	return {
		props,
		enzymeWrapper: mount(<Provider store={store}><ShowTable /></Provider>),
		store,
		spy,
	}
}

describe('containers', () => {
	describe('ShowSearch', () => {
		it('should dispatch right action when onTextChange', () => {
			const { props, enzymeWrapper, store, spy } = setup();

			// before
			expect(spy).not.toHaveBeenCalled();
			expect(spy).toHaveBeenCalledTimes(0);
			expect(store.getActions().length).toBe(0);

			// click
			enzymeWrapper.find('th').at(0).prop('onClick')();

			// after
			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy).toHaveBeenCalledWith(setTableSort(store.getState().columns[0].name));
			expect(store.getActions().length).toBe(1);
			expect(store.getActions()[0]).toEqual(setTableSort(store.getState().columns[0].name));

			spy.mockRestore();
		})
	})
})