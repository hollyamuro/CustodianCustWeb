import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ToolBar from '../../../src/MonthlyStatementDownload/components/ToolBar'
import ShowYMPicker from '../../../src/MonthlyStatementDownload/containers/ShowYMPicker'
import ShowDownLoadButton from '../../../src/MonthlyStatementDownload/containers/ShowDownLoadButton'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

Enzyme.configure({ adapter: new Adapter() })

const setup = () => {
    const store = configureStore()({
        isLoading: false,
        isMsgShown: false,
        msg: {
            type: "",
            title: "",
            text: "",
        },
        ym: "",
    })
    const props = {};
    return {
        props,
        enzymeWrapper: mount(<Provider store={store} ><ToolBar /></Provider>),
    }
}

describe('components', () => {
    describe('ToolBar', () => {
        it('should render self and subcomponents', () => {
            const { props, enzymeWrapper } = setup();

            expect(enzymeWrapper.find(ShowYMPicker).length).toBe(1);
            expect(enzymeWrapper.find(ShowDownLoadButton).length).toBe(1);
        })
    })
})