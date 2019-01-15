"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoRoundTextBox from '../../src/SinoComponent/SinoRoundTextBox'

Enzyme.configure({ adapter: new Adapter() })

const setupDefault = () => {
    const props = {}
    return {
        props,
        enzymeWrapper: mount(<SinoRoundTextBox {...props} />),
    }
}

const setupInit = () => {
    const props = {
        title: '',
        hint: '',
        text: '',
        onTextChange: () => { },
    }

    return {
        props,
        enzymeWrapper: mount(<SinoRoundTextBox {...props} />),
    }
}

const setup = () => {
    const props = {
        title: 'title',
        hint: 'hint',
        text: 'text',
        onTextChange: () => { },
    }

    const spy = jest.spyOn(props, "onTextChange");

    return {
        props,
        enzymeWrapper: mount(<SinoRoundTextBox {...props} />),
        spy,
    }
}

describe('components', () => {
    describe('SinoRoundTextBox', () => {

        it('should render self and subcomponents when no data (default)', () => {
            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('small').length).toBe(0);

            expect(enzymeWrapper.find('input').hasClass('form-control')).toBe(true);
            expect(enzymeWrapper.find('input').length).toBe(1);
            expect(enzymeWrapper.find('input').prop('placeholder')).toEqual("");
            expect(enzymeWrapper.find('input').prop('value')).toEqual("");
        })

        it('should render self and subcomponents when no data', () => {
            const { props, enzymeWrapper } = setupInit();

            expect(enzymeWrapper.find('small').length).toBe(0);

            expect(enzymeWrapper.find('input').hasClass('form-control')).toBe(true);
            expect(enzymeWrapper.find('input').length).toBe(1);
            expect(enzymeWrapper.find('input').prop('placeholder')).toEqual(props.hint);
            expect(enzymeWrapper.find('input').prop('value')).toEqual(props.text);
        })

        it('should render self and subcomponents', () => {
            const { props, enzymeWrapper, spy } = setup();

            expect(enzymeWrapper.find('small').hasClass('form-text')).toBe(true);
            expect(enzymeWrapper.find('small').hasClass('text-muted')).toBe(true);
            expect(enzymeWrapper.find('small').length).toBe(1);
            expect(enzymeWrapper.find('small').text()).toEqual(props.title);

            expect(enzymeWrapper.find('input').hasClass('form-control')).toBe(true);
            expect(enzymeWrapper.find('input').length).toBe(1);
            expect(enzymeWrapper.find('input').prop('placeholder')).toEqual(props.hint);
            expect(enzymeWrapper.find('input').prop('value')).toEqual(props.text);

            spy.mockRestore();
        })

        it('should fire onTextChange while input is onChange', () => {
            const { props, enzymeWrapper, spy } = setup();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);

            // change
            enzymeWrapper.find('input').prop('onChange')();

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);

            spy.mockRestore();
        })

    })
})