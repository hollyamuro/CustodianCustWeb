"use strict";

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoPopout from '../../../src/SinoComponent/SinoPopout'

Enzyme.configure({ adapter: new Adapter() });

const setupDefault = () => {
    const props = {};
    return {
        props,
        enzymeWrapper: mount(<SinoPopout {...props} />),
    }
}

const setupInit = () => {
    const props = {
        type: "",
        title: "",
        text: "",
        enable: true,
        onClose: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoPopout {...props} />),
    }
}

const setupDisable = () => {
    const props = {
        type: "INFO",
        title: "test",
        text: "This is test for popup!",
        enable: false,
        onClose: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoPopout {...props} />),
    }
}

const setupError = () => {
    const props = {
        type: "ERROR",
        title: "test",
        text: "This is test for error popup!",
        enable: true,
        onClose: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoPopout {...props} />),
    }
}

const setupSuccess = () => {
    const props = {
        type: "SUCCESS",
        title: "test",
        text: "This is test for success popup!",
        enable: true,
        onClose: () => { },
    };
    return {
        props,
        enzymeWrapper: mount(<SinoPopout {...props} />),
    }
}

const setupTestClick = () => {
    const props = {
        onClose: () => { }
    };
    const spy = jest.spyOn(props, 'onClose');
    return {
        props,
        enzymeWrapper: mount(<SinoPopout {...props} />),
        spy,
    }
}

describe('components', () => {
    describe('SinoPopout', () => {
        it('should render self and subcomponent (default)', () => {

            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('div').at(1).hasClass('mask')).toBe(true);
            expect(enzymeWrapper.find('div').at(2).hasClass('popout-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('popout')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('show-animate')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-secondary')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-danger')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-success')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-primary')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-secondary')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-danger')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-success')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-primary')).toBe(false);
            expect(enzymeWrapper.find('div').at(6).hasClass('popout-text-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(7).hasClass('align-right')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(8);
            expect(enzymeWrapper.find('div').at(5).text()).toEqual("訊息");
            expect(enzymeWrapper.find('div').at(6).text()).toEqual("");

            expect(enzymeWrapper.find('hr').at(0).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').at(1).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').length).toBe(2);

            expect(enzymeWrapper.find('button').at(0).hasClass('btn')).toBe(true);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-secondary')).toBe(true);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-danger')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-success')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-primary')).toBe(false);
            expect(enzymeWrapper.find('button').length).toBe(1);
        })

        it('should render self and subcomponent with no data', () => {
            const { props, enzymeWrapper } = setupInit();

            expect(enzymeWrapper.find('div').at(1).hasClass('mask')).toBe(true);
            expect(enzymeWrapper.find('div').at(2).hasClass('popout-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('popout')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('show-animate')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-secondary')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-danger')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-success')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-primary')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-secondary')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-danger')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-success')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-primary')).toBe(true);
            expect(enzymeWrapper.find('div').at(6).hasClass('popout-text-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(7).hasClass('align-right')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(8);
            expect(enzymeWrapper.find('div').at(5).text()).toEqual(props.title);
            expect(enzymeWrapper.find('div').at(6).text()).toEqual(props.text);

            expect(enzymeWrapper.find('hr').at(0).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').at(1).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').length).toBe(2);

            expect(enzymeWrapper.find('button').at(0).hasClass('btn')).toBe(true);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-secondary')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-danger')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-success')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-primary')).toBe(true);
            expect(enzymeWrapper.find('button').length).toBe(1);
        })

        it('should render self and subcomponent with disable', () => {
            const { props, enzymeWrapper } = setupDisable();
            expect(enzymeWrapper.find('div').length).toBe(1);
            expect(enzymeWrapper.find('hr').length).toBe(0);
            expect(enzymeWrapper.find('button').length).toBe(0);
        })

        it('should render self and subcomponent with enable and default error style', () => {

            const { props, enzymeWrapper } = setupError();

            expect(enzymeWrapper.find('div').at(1).hasClass('mask')).toBe(true);
            expect(enzymeWrapper.find('div').at(2).hasClass('popout-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('popout')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('show-animate')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-secondary')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-danger')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-success')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-primary')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-secondary')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-danger')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-success')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-primary')).toBe(false);
            expect(enzymeWrapper.find('div').at(6).hasClass('popout-text-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(7).hasClass('align-right')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(8);
            expect(enzymeWrapper.find('div').at(5).text()).toEqual(props.title);
            expect(enzymeWrapper.find('div').at(6).text()).toEqual(props.text);

            expect(enzymeWrapper.find('hr').at(0).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').at(1).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').length).toBe(2);

            expect(enzymeWrapper.find('button').at(0).hasClass('btn')).toBe(true);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-secondary')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-danger')).toBe(true);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-success')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-primary')).toBe(false);
            expect(enzymeWrapper.find('button').length).toBe(1);

        })

        it('should render self and subcomponent with enable and default success style', () => {

            const { props, enzymeWrapper } = setupSuccess();

            expect(enzymeWrapper.find('div').at(1).hasClass('mask')).toBe(true);
            expect(enzymeWrapper.find('div').at(2).hasClass('popout-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('popout')).toBe(true);
            expect(enzymeWrapper.find('div').at(3).hasClass('show-animate')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-secondary')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-danger')).toBe(false);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-success')).toBe(true);
            expect(enzymeWrapper.find('div').at(4).hasClass('popout-wrapper-primary')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-secondary')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-danger')).toBe(false);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-success')).toBe(true);
            expect(enzymeWrapper.find('div').at(5).hasClass('popout-title-wrapper-primary')).toBe(false);
            expect(enzymeWrapper.find('div').at(6).hasClass('popout-text-wrapper')).toBe(true);
            expect(enzymeWrapper.find('div').at(7).hasClass('align-right')).toBe(true);
            expect(enzymeWrapper.find('div').length).toBe(8);
            expect(enzymeWrapper.find('div').at(5).text()).toEqual(props.title);
            expect(enzymeWrapper.find('div').at(6).text()).toEqual(props.text);

            expect(enzymeWrapper.find('hr').at(0).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').at(1).hasClass('divider')).toBe(true);
            expect(enzymeWrapper.find('hr').length).toBe(2);

            expect(enzymeWrapper.find('button').at(0).hasClass('btn')).toBe(true);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-secondary')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-danger')).toBe(false);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-success')).toBe(true);
            expect(enzymeWrapper.find('button').at(0).hasClass('btn-primary')).toBe(false);
            expect(enzymeWrapper.find('button').length).toBe(1);

        })

        it('should fire onClose while button is onClick', () => {
            const { props, enzymeWrapper, spy } = setupTestClick();

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
})

