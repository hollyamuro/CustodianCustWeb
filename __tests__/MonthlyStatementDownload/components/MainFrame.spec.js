import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import MainFrame from '../../../src/MonthlyStatementDownload/components/MainFrame'
import ToolBar from '../../../src/MonthlyStatementDownload/components/ToolBar'
import ShowLoading from '../../../src/MonthlyStatementDownload/containers/ShowLoading'
import ShowMessage from '../../../src/MonthlyStatementDownload/containers/ShowMessage'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const props = {};
    const store = configureStore()({
        isLoading: false,
        isMsgShown: false,
        msg: {
            type: "",
            title: "",
            text: "",
        },
        ym: "",
    });
    return {
        props,
        enzymeWrapper: mount(<Provider store={store}><MainFrame /></Provider>),
    }
}

describe('component', () => {
    describe('MainFrame', () => {
        it('should render self and subcomponents', () => {
            const { props, enzymeWrapper } = setup();
            expect(enzymeWrapper.find(ToolBar).length).toBe(1);
            expect(enzymeWrapper.find(ShowLoading).length).toBe(1);
            expect(enzymeWrapper.find(ShowMessage).length).toBe(1);
        })
    })
})