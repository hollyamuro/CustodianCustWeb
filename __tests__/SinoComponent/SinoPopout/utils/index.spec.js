"use strict";

import { getStyle } from '../../../../src/SinoComponent/SinoPopout/utils'

describe('utils', () => {
	describe('getStyle', () => {
		it('should return right style of types', () => {
			expect(getStyle("INFO")).toEqual("secondary");
			expect(getStyle("ERROR")).toEqual("danger");
			expect(getStyle("SUCCESS")).toEqual("success");

			expect(getStyle()).toEqual("primary");
			expect(getStyle("")).toEqual("primary");
			expect(getStyle("any thing")).toEqual("primary");
		})
	})
})