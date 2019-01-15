'use strict'

import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SinoLoading from '../../../src/SinoComponent/SinoLoading'

Enzyme.configure({ adapter: new Adapter() })

const setupDefault = () => {
    const props = {}
    return {
        props,
        enzymeWrapper: mount(<SinoLoading {...props} />),
    }
}

const setupInit = () => {
    const props = {
        text: "",
        enable: true,
    }
    return {
        props,
        enzymeWrapper: mount(<SinoLoading {...props} />),
    }
}

const setupEnable = () => {
    const props = {
        text: "I am loading",
        enable: true,
    }
    return {
        props,
        enzymeWrapper: mount(<SinoLoading {...props} />),
    }
}

const setupDisable = () => {
    const props = {
        text: "I am not loading",
        enable: false,
    }
    return {
        props,
        enzymeWrapper: mount(<SinoLoading {...props} />),
    }
}

describe('components', () => {
    describe('SinoLoading', () => {

        it('should render self and subcomponent (default)', () => {
            const { props, enzymeWrapper } = setupDefault();
            
            expect(enzymeWrapper.find("div").at(0).hasClass('mask')).toBe(true);
            expect(enzymeWrapper.find("div").at(1).hasClass('dot-circle')).toBe(true);
            expect(enzymeWrapper.find("div").at(2).hasClass('dot-animate')).toBe(true);
            expect(enzymeWrapper.find("div").length).toBe(4);
            expect(enzymeWrapper.find("div").at(3).hasClass("loading-text")).toBe(true);
            expect(enzymeWrapper.find("div").at(3).text()).toEqual("LOADING...");
        })

        it('should render self and subcomponent when no data with enable', () => {
            const { props, enzymeWrapper } = setupInit();
            
            expect(enzymeWrapper.find("div").at(0).hasClass('mask')).toBe(true);
            expect(enzymeWrapper.find("div").at(1).hasClass('dot-circle')).toBe(true);
            expect(enzymeWrapper.find("div").at(2).hasClass('dot-animate')).toBe(true);
            expect(enzymeWrapper.find("div").length).toBe(4);
            expect(enzymeWrapper.find("div").at(3).hasClass("loading-text")).toBe(true);
            expect(enzymeWrapper.find("div").at(3).text()).toEqual("");
        })

        it('should render self and subcomponent when enable', () => {
            const { props, enzymeWrapper } = setupEnable();

            expect(enzymeWrapper.find("div").at(0).hasClass('mask')).toBe(true);
            expect(enzymeWrapper.find("div").at(1).hasClass('dot-circle')).toBe(true);
            expect(enzymeWrapper.find("div").at(2).hasClass('dot-animate')).toBe(true);
            expect(enzymeWrapper.find("div").length).toBe(4);
            expect(enzymeWrapper.find("div").at(3).hasClass("loading-text")).toBe(true);
            expect(enzymeWrapper.find("div").at(3).text()).toEqual(props.text);

        })

        it('should render self and subcomponent when disable', () => {
            const { props, enzymeWrapper } = setupDisable();
            expect(enzymeWrapper.find("div").length).toBe(1);
        })

        it('should render static graphs',()=>{
            const { props, enzymeWrapper } = setupEnable();

            expect(enzymeWrapper.find("svg").length).toBe(1);
            expect(enzymeWrapper.find("svg").prop('height')).toEqual("100");
            expect(enzymeWrapper.find("svg").prop('width')).toEqual("100");

            expect(enzymeWrapper.find("circle").length).toBe(12);

            expect(enzymeWrapper.find("circle").at(0).prop('cx')).toEqual("50");
            expect(enzymeWrapper.find("circle").at(0).prop('cy')).toEqual("20");
            expect(enzymeWrapper.find("circle").at(0).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(0).prop('fill')).toEqual("rgba(0, 0, 0, 1.0)");

            expect(enzymeWrapper.find("circle").at(1).prop('cx')).toEqual("65");
            expect(enzymeWrapper.find("circle").at(1).prop('cy')).toEqual("25");
            expect(enzymeWrapper.find("circle").at(1).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(1).prop('fill')).toEqual("rgba(0, 0, 0, 0.0)");

            expect(enzymeWrapper.find("circle").at(2).prop('cx')).toEqual("75");
            expect(enzymeWrapper.find("circle").at(2).prop('cy')).toEqual("35");
            expect(enzymeWrapper.find("circle").at(2).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(2).prop('fill')).toEqual("rgba(0, 0, 0, 0.0)");

            expect(enzymeWrapper.find("circle").at(3).prop('cx')).toEqual("80");
            expect(enzymeWrapper.find("circle").at(3).prop('cy')).toEqual("50");
            expect(enzymeWrapper.find("circle").at(3).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(3).prop('fill')).toEqual("rgba(0, 0, 0, 0.1)");

            expect(enzymeWrapper.find("circle").at(4).prop('cx')).toEqual("75");
            expect(enzymeWrapper.find("circle").at(4).prop('cy')).toEqual("65");
            expect(enzymeWrapper.find("circle").at(4).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(4).prop('fill')).toEqual("rgba(0, 0, 0, 0.2)");

            expect(enzymeWrapper.find("circle").at(5).prop('cx')).toEqual("65");
            expect(enzymeWrapper.find("circle").at(5).prop('cy')).toEqual("75");
            expect(enzymeWrapper.find("circle").at(5).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(5).prop('fill')).toEqual("rgba(0, 0, 0, 0.3)");

            expect(enzymeWrapper.find("circle").at(6).prop('cx')).toEqual("50");
            expect(enzymeWrapper.find("circle").at(6).prop('cy')).toEqual("80");
            expect(enzymeWrapper.find("circle").at(6).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(6).prop('fill')).toEqual("rgba(0, 0, 0, 0.4)");

            expect(enzymeWrapper.find("circle").at(7).prop('cx')).toEqual("25");
            expect(enzymeWrapper.find("circle").at(7).prop('cy')).toEqual("65");
            expect(enzymeWrapper.find("circle").at(7).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(7).prop('fill')).toEqual("rgba(0, 0, 0, 0.5)");

            expect(enzymeWrapper.find("circle").at(8).prop('cx')).toEqual("35");
            expect(enzymeWrapper.find("circle").at(8).prop('cy')).toEqual("75");
            expect(enzymeWrapper.find("circle").at(8).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(8).prop('fill')).toEqual("rgba(0, 0, 0, 0.6)");

            expect(enzymeWrapper.find("circle").at(9).prop('cx')).toEqual("20");
            expect(enzymeWrapper.find("circle").at(9).prop('cy')).toEqual("50");
            expect(enzymeWrapper.find("circle").at(9).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(9).prop('fill')).toEqual("rgba(0, 0, 0, 0.7)");

            expect(enzymeWrapper.find("circle").at(10).prop('cx')).toEqual("25");
            expect(enzymeWrapper.find("circle").at(10).prop('cy')).toEqual("35");
            expect(enzymeWrapper.find("circle").at(10).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(10).prop('fill')).toEqual("rgba(0, 0, 0, 0.8)");

            expect(enzymeWrapper.find("circle").at(11).prop('cx')).toEqual("35");
            expect(enzymeWrapper.find("circle").at(11).prop('cy')).toEqual("25");
            expect(enzymeWrapper.find("circle").at(11).prop('r')).toEqual("5");
            expect(enzymeWrapper.find("circle").at(11).prop('fill')).toEqual("rgba(0, 0, 0, 0.9)");
        })
    })
})