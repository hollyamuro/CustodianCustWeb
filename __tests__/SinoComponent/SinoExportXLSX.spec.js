"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoExportXLSX from '../../src/SinoComponent/SinoExportXLSX'
import SinoRoundButton from '../../src/SinoComponent/SinoRoundButton'

Enzyme.configure({ adapter: new Adapter });

const setupDefault = () => {
    const props = {};
    return {
        props,
        enzymeWrapper: mount(<SinoExportXLSX {...props} />),
    }
}

describe('components', () => {
    describe('SinoExportXLSX', () => {
        it('should render self and subcomponent', () => {

            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find(SinoRoundButton).length).toBe(1);
            expect(enzymeWrapper.find(SinoRoundButton).text()).toEqual("Export");
            expect(enzymeWrapper.find(SinoRoundButton).prop('octicons_icon')).toEqual("file");

            //[TODO]: test excel export?
        })
    })
})