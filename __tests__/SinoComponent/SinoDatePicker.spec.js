"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoDatePicker from '../../src/SinoComponent/SinoDatePicker'

Enzyme.configure({ adapter: new Adapter() });

const setupDefault = () => {
    const props = {};
    return {
        props,
        enzymeWrapper: mount(<SinoDatePicker {...props} />)
    }
}

const setupInit = () => {
    const props = {
        title: "",
        text: "",
        disable_date: {},
        onTextChange: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoDatePicker {...props} />)
    }
}


const setup = () => {
    const props = {
        title: "test",
        text: "",
        disable_date: {},
        onTextChange: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoDatePicker {...props} />)
    }
}

describe('components', () => {
    describe('SinoDatePicker', () => {
        it('should render self and subcomponent (default)', () => {
            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('div').length).toBe(3); //since DayPickerInput is also div 
            expect(enzymeWrapper.find('div').at(2).hasClass('DayPickerInput')).toBe(true);

            expect(enzymeWrapper.find('small').length).toBe(0);
        })

        it('should render self and subcomponent with no data', () => {
            const { props, enzymeWrapper } = setupInit();

            expect(enzymeWrapper.find('div').length).toBe(3); //since DayPickerInput is also div 
            expect(enzymeWrapper.find('div').at(2).hasClass('DayPickerInput')).toBe(true);

            expect(enzymeWrapper.find('small').length).toBe(0);
        })

        it('should render self and subcomponent (default)', () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.find('div').length).toBe(3); //since DayPickerInput is also div 
            expect(enzymeWrapper.find('div').at(2).hasClass('DayPickerInput')).toBe(true);

            expect(enzymeWrapper.find('small').hasClass('form-text')).toBe(true);
            expect(enzymeWrapper.find('small').hasClass('text-muted')).toBe(true);
            expect(enzymeWrapper.find('small').length).toBe(1);
            expect(enzymeWrapper.find('small').text()).toBe(props.title);
        })
    })
})