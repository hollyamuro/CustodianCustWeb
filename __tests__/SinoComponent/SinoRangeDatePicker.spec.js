"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoRangeDatePicker from '../../src/SinoComponent/SinoRangeDatePicker'

Enzyme.configure({ adapter: new Adapter() });

const setupDefault = () => {
    const props = {};
    return {
        props,
        enzymeWrapper: mount(<SinoRangeDatePicker {...props} />)
    }
}

const setupInit = () => {
    const props = {
        title: "",
        show_hint: false,
        date: {
            from: "",
            to: "",
        },
        onFromChange: () => { },
        onToChange: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoRangeDatePicker {...props} />)
    }
}

const setup = () => {
    const props = {
        title: "test",
        show_hint: true,
        date: {
            from: "",
            to: "",
        },
        onFromChange: () => { },
        onToChange: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoRangeDatePicker {...props} />)
    }
}


describe('components', () => {
    describe('SinoRangeDatePicker', () => {

        it('should render self and subcomponent (default)', () => {
            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('div').at(1).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(2).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('DayPickerInput')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('DayPickerInput')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(6);

            expect(enzymeWrapper.find('small').at(0).hasClass("form-text")).toBe(true);
            expect(enzymeWrapper.find('small').at(0).hasClass("text-muted")).toBe(true);
            expect(enzymeWrapper.find('small').at(1).hasClass("form-text")).toBe(true);
            expect(enzymeWrapper.find('small').at(1).hasClass("text-muted")).toBe(true);
            expect(enzymeWrapper.find('small').length).toBe(2);
            expect(enzymeWrapper.find('small').at(0).text()).toEqual("From");
            expect(enzymeWrapper.find('small').at(1).text()).toEqual("To");

            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toBe(" - ");

        })

        it('should render self and subcomponent with no data', () => {
            const { props, enzymeWrapper } = setupInit();

            expect(enzymeWrapper.find('div').at(1).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(2).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('DayPickerInput')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('DayPickerInput')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(6);

            expect(enzymeWrapper.find('small').length).toBe(0);
            
            expect(enzymeWrapper.find('span').length).toBe(1);
            expect(enzymeWrapper.find('span').text()).toBe(" - ");
        })

        it('should render self and subcomponent', () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.find('div').at(1).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(2).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('DayPickerInput')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('inline')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('DayPickerInput')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(6);

            expect(enzymeWrapper.find('small').at(0).hasClass("form-text")).toBe(true);
            expect(enzymeWrapper.find('small').at(0).hasClass("text-muted")).toBe(true);
            expect(enzymeWrapper.find('small').at(1).hasClass("form-text")).toBe(true);
            expect(enzymeWrapper.find('small').at(1).hasClass("text-muted")).toBe(true);
            expect(enzymeWrapper.find('small').length).toBe(2);
            expect(enzymeWrapper.find('small').at(0).text()).toEqual("From");
            expect(enzymeWrapper.find('small').at(1).text()).toEqual("To");

            expect(enzymeWrapper.find('span').length).toBe(2);
            expect(enzymeWrapper.find('span').at(0).text()).toBe(props.title);
            expect(enzymeWrapper.find('span').at(1).text()).toBe(" - ");
        })

    })
})
