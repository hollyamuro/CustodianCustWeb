"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoSelect from '../../src/SinoComponent/SinoSelect'

Enzyme.configure({ adapter: new Adapter() })

const setupDefault = () => {
    const props = {}
    return {
        props,
        enzymeWrapper: mount(<SinoSelect {...props} />)
    }
}

const setupTitle = () => {
    const props = {
        title: "Hello World!"
    }
    return {
        props,
        enzymeWrapper: mount(<SinoSelect {...props} />)
    }
}

const setupHint = () => {
    const props = {
        hint: "Hello World!"
    }
    return {
        props,
        enzymeWrapper: mount(<SinoSelect {...props} />)
    }
}

const setupOptions = () => {
    const props = {
        options: ['A', 'B', 'C', 'D', 'E', 'F'],
    }
    return {
        props,
        enzymeWrapper: mount(<SinoSelect {...props} />)
    }
}

const setupTestClick = () => {
    const props = {
        options: ['A', 'B', 'C', 'D', 'E', 'F'],
        onOptionChange: (event) => { }
    }
    const spy = jest.spyOn(props, 'onOptionChange');
    return {
        props,
        enzymeWrapper: mount(<SinoSelect {...props} />),
        spy,
    }
}

describe('components', () => {
    describe('SinoSelect', () => {
        it('should render self and subcomponent (default)', () => {
            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('div').length).toBe(1);

            expect(enzymeWrapper.find('small').hasClass('form-text')).toBe(true);
            expect(enzymeWrapper.find('small').hasClass('text-muted')).toBe(true);
            expect(enzymeWrapper.find('small').length).toBe(1);
            expect(enzymeWrapper.find('small').text()).toEqual("");

            expect(enzymeWrapper.find('select').hasClass('form-control')).toBe(true);
            expect(enzymeWrapper.find('select').length).toBe(1)
            expect(enzymeWrapper.find('select').prop('value')).toEqual("");

            expect(enzymeWrapper.find('option').length).toBe(0);
        })

        it('should render title', () => {
            const { props, enzymeWrapper } = setupTitle();

            expect(enzymeWrapper.find('small').hasClass('form-text')).toBe(true);
            expect(enzymeWrapper.find('small').hasClass('text-muted')).toBe(true);
            expect(enzymeWrapper.find('small').length).toBe(1);
            expect(enzymeWrapper.find('small').text()).toEqual(props.title);
        })


        it('should render hind', () => {
            const { props, enzymeWrapper } = setupHint();
            expect(enzymeWrapper.find('option').length).toBe(1);
            expect(enzymeWrapper.find('option').prop('value')).toEqual(props.hint);
            expect(enzymeWrapper.find('option').text()).toEqual(props.hint);
        })


        it('should render options with array', () => {
            const { props, enzymeWrapper } = setupOptions();
            expect(enzymeWrapper.find('option').length).toBe(props.options.length);

            enzymeWrapper.find('option').forEach((node, index) => {
                expect(node.key()).toEqual(props.options[index]);
                expect(node.prop('value')).toEqual(props.options[index]);
            });
        })

        it('should fire onOptionChange when options clicked', () => {
            const { props, enzymeWrapper, spy } = setupTestClick();

            // before
            expect(spy).not.toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(0);

            // change
            enzymeWrapper.find('select').prop('onChange')();

            // after
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);

            spy.mockRestore();
        })
    })
})