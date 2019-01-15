import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DownLoadButton from '../../../src/MonthlyStatementDownload/components/DownLoadButton'
import SinoRoundButton from '../../../src/SinoComponent/SinoRoundButton'

Enzyme.configure({ adapter: new Adapter() })

const setupDefault = () => {
    const props = {};
    return {
        props,
        enzymeWrapper: mount(<DownLoadButton {...props} />),
    }
}

const setupInit = () => {
    const props = {
        YM: "",
    };
    return {
        props,
        enzymeWrapper: mount(<DownLoadButton {...props} />),
    }
}

const setup = () => {
    const props = {
        YM: "2018/01",
    };
    return {
        props,
        enzymeWrapper: mount(<DownLoadButton {...props} />),
    }
}

describe('components', () => {
    describe('DownLoadButton', () => {
        it('should render self and subcomponents (default)', () => {
            const { props, enzymeWrapper } = setupDefault();

            expect(enzymeWrapper.find('form').length).toBe(1);
            expect(enzymeWrapper.find('form').prop('action')).toEqual(location.protocol + "//" + location.host + "/S001C002F001/download");
            expect(enzymeWrapper.find('form').prop('method')).toEqual("post");

            expect(enzymeWrapper.find(SinoRoundButton).length).toBe(1);
            expect(enzymeWrapper.find(SinoRoundButton).prop('text')).toEqual("Download");
            expect(enzymeWrapper.find(SinoRoundButton).prop('octicons_icon')).toEqual("cloud-download");

            expect(enzymeWrapper.find('input').length).toBe(1);
            expect(enzymeWrapper.find('input').prop('type')).toEqual("hidden");
            expect(enzymeWrapper.find('input').prop('id')).toEqual("YM");
            expect(enzymeWrapper.find('input').prop('name')).toEqual("YM");
            expect(enzymeWrapper.find('input').prop('value')).toEqual("");
        })

        it('should render self and subcomponents when no data', () => {
            const { props, enzymeWrapper } = setupInit();

            expect(enzymeWrapper.find('form').length).toBe(1);
            expect(enzymeWrapper.find('form').prop('action')).toEqual(location.protocol + "//" + location.host + "/S001C002F001/download");
            expect(enzymeWrapper.find('form').prop('method')).toEqual("post");

            expect(enzymeWrapper.find(SinoRoundButton).length).toBe(1);
            expect(enzymeWrapper.find(SinoRoundButton).prop('text')).toEqual("Download");
            expect(enzymeWrapper.find(SinoRoundButton).prop('octicons_icon')).toEqual("cloud-download");

            expect(enzymeWrapper.find('input').length).toBe(1);
            expect(enzymeWrapper.find('input').prop('type')).toEqual("hidden");
            expect(enzymeWrapper.find('input').prop('id')).toEqual("YM");
            expect(enzymeWrapper.find('input').prop('name')).toEqual("YM");
            expect(enzymeWrapper.find('input').prop('value')).toEqual("");
        })

        it('should render self and subcomponents', () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.find('form').length).toBe(1);
            expect(enzymeWrapper.find('form').prop('action')).toEqual(location.protocol + "//" + location.host + "/S001C002F001/download");
            expect(enzymeWrapper.find('form').prop('method')).toEqual("post");

            expect(enzymeWrapper.find(SinoRoundButton).length).toBe(1);
            expect(enzymeWrapper.find(SinoRoundButton).prop('text')).toEqual("Download");
            expect(enzymeWrapper.find(SinoRoundButton).prop('octicons_icon')).toEqual("cloud-download");

            expect(enzymeWrapper.find('input').length).toBe(1);
            expect(enzymeWrapper.find('input').prop('type')).toEqual("hidden");
            expect(enzymeWrapper.find('input').prop('id')).toEqual("YM");
            expect(enzymeWrapper.find('input').prop('name')).toEqual("YM");
            expect(enzymeWrapper.find('input').prop('value')).toEqual(props.YM);
        })      
    })
})