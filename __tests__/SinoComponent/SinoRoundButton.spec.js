"use strict"

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoRoundButton from '../../src/SinoComponent/SinoRoundButton'

Enzyme.configure({ adapter: new Adapter() });

const setupDefault = () => {
    const props = {}
    return {
        props,
        enzymeWrapper: mount(<SinoRoundButton{...props} />)
    }
}

const setupInit = () => {
    const props = {
        text: '',
        octicons_icon: '',
        onButtonClick: () => { },
    }
    return {
        props,
        enzymeWrapper: mount(<SinoRoundButton {...props} />),
    }
}

const setup = () => {
    const props = {
        text: 'search',
        octicons_icon: 'search',
        onButtonClick: () => { },
    }
    const spy = jest.spyOn(props, 'onButtonClick');
    return {
        props,
        enzymeWrapper: mount(<SinoRoundButton {...props} />),
        spy,
    }
}

describe('components', () => {

    it('should render self and subcomponents when no data (default)', () => {
        const { props, enzymeWrapper } = setupDefault();
        expect(enzymeWrapper.find('button').hasClass('btn')).toBe(true);
        expect(enzymeWrapper.find('button').hasClass('btn-outline-secondary')).toBe(true);
        expect(enzymeWrapper.find('button').length).toBe(1);
        expect(enzymeWrapper.find('button').text()).toEqual("");
        expect(enzymeWrapper.find('img').length).toBe(0);
    })

    it('should render self and subcomponents when no data', () => {
        const { props, enzymeWrapper } = setupInit();
        expect(enzymeWrapper.find('button').hasClass('btn')).toBe(true);
        expect(enzymeWrapper.find('button').hasClass('btn-outline-secondary')).toBe(true);
        expect(enzymeWrapper.find('button').length).toBe(1);
        expect(enzymeWrapper.find('button').text()).toEqual(props.text);
        expect(enzymeWrapper.find('img').length).toBe(0);
    })

    it('should render self and subcomponents when no data', () => {
        const { props, enzymeWrapper, spy } = setup();
        expect(enzymeWrapper.find('button').hasClass('btn')).toBe(true);
        expect(enzymeWrapper.find('button').hasClass('btn-outline-secondary')).toBe(true);
        expect(enzymeWrapper.find('button').length).toBe(1);
        expect(enzymeWrapper.find('button').text()).toEqual(props.text);

        expect(enzymeWrapper.find('img').length).toBe(1);
        expect(enzymeWrapper.find('img').prop('src')).toEqual("/svg/" + props.octicons_icon + ".svg");

        spy.mockRestore();
    })

    it('should fire onButtonClick when button clicked', () => {
        const { props, enzymeWrapper, spy } = setup();

        // before
        expect(spy).not.toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(0);

        // click
        enzymeWrapper.find('button').prop('onClick')();

        // after
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);

        spy.mockRestore();
    })
})

