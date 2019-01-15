import * as actions from '../../../src/Dashboard/actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

describe('actions', () => {
    describe('requestLoadDashboardCoupon', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.REQUEST_LOAD_DASHBOARD_COUPON,
                isLoading: true,
            }
            expect(actions.requestLoadDashboardCoupon()).toEqual(expected);
        })
    })

    describe('receiveLoadDashboardCoupon', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.RECEIVE_LOAD_DASHBOARD_COUPON,
                isLoading: false,
            }
            expect(actions.receiveLoadDashboardCoupon()).toEqual(expected);
        })
    })

    describe('loadDashboardCoupon ', () => {

        beforeEach(() => { moxios.install(); });

        afterEach(() => { moxios.uninstall(); });

        it('should redirect to home (/helper/user) since no unauthorized', () => {

            const middlewares = [thunk]
            const mockStore = configureStore(middlewares);
            const store = mockStore({ coupon: [] })
            const expected = {};
            // when no permission will redirect to home and get the page
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected, });

            return store.dispatch(actions.loadDashboardCoupon()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadDashboardCoupon());
            })

        })

        it('should redirect to home (/dashboard/read) since no unauthorized', () => {

            const middlewares = [thunk]
            const mockStore = configureStore(middlewares);
            const store = mockStore({ coupon: [] })
            const expectedUserData = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expectedDashboardData = {};

            // get data success
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedUserData });

            // when no permission will redirect to home and get the page
            moxios.stubRequest(location.protocol + "//" + location.host + "/dashboard/read", { status: 200, responseText: expectedDashboardData })

            return store.dispatch(actions.loadDashboardCoupon()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadDashboardCoupon());
            })

        })

        it('should return error (/helper/user) since get ERROR from API', () => {

            const middlewares = [thunk]
            const mockStore = configureStore(middlewares);
            const store = mockStore({ coupon: [] })

            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", {
                status: 200,
                responseText: expected,
            })

            return store.dispatch(actions.loadDashboardCoupon()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[0]).toEqual(actions.requestLoadDashboardCoupon());
                expect(store.getActions()[1]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }));
                expect(store.getActions()[2]).toEqual(actions.stopLoading());
            })

        })

        it('should return error (/dashboard/read) since get ERROR from API', () => {

            const middlewares = [thunk]
            const mockStore = configureStore(middlewares);
            const store = mockStore({ coupon: [] })

            const expectedUserData = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expectedDashboardData = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            // get data success
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedUserData });

            // when no permission will redirect to home and get the page
            moxios.stubRequest(location.protocol + "//" + location.host + "/dashboard/read", { status: 200, responseText: expectedDashboardData })

            return store.dispatch(actions.loadDashboardCoupon()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[0]).toEqual(actions.requestLoadDashboardCoupon());
                expect(store.getActions()[1]).toEqual(actions.showMessage({
                    type: "ERROR", title: "ERROR", text: expectedDashboardData.code.message,
                }));
                expect(store.getActions()[2]).toEqual(actions.stopLoading());
            })

        })

        it('should create an action to get data from server', () => {

            const middlewares = [thunk]
            const mockStore = configureStore(middlewares);
            const store = mockStore({ coupon: [] })

            const expectedUserData = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expectedDashboardData = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ a: '1' }, { a: '2' }, { a: '3' }],
            }

            // get data success
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedUserData });

            // when no permission will redirect to home and get the page
            moxios.stubRequest(location.protocol + "//" + location.host + "/dashboard/read", { status: 200, responseText: expectedDashboardData })

            return store.dispatch(actions.loadDashboardCoupon()).then(() => {
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual(actions.requestLoadDashboardCoupon());
                expect(store.getActions()[1]).toEqual(actions.receiveLoadDashboardCoupon(expectedDashboardData.data));
            })
        })
    })

    describe('showMessage', () => {
        it('should create an action to set show message state', () => {
            const msg = 'THIS IS TEST MSG.'
            const expected = {
                type: actions.SHOW_MESSAGE,
                isMsgShown: true,
                msg,
            }
            expect(actions.showMessage(msg)).toEqual(expected);
        })
    })

    describe('hideMessage', () => {
        it('should create an action to set show message state', () => {
            const msg = 'THIS IS TEST MSG.'
            const expected = {
                type: actions.HIDE_MESSAGE,
                isMsgShown: false,
            }
            expect(actions.hideMessage()).toEqual(expected);
        })
    })

    describe('startLoading', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.START_LOADING,
                isLoading: true,
            }
            expect(actions.startLoading()).toEqual(expected);
        })
    })

    describe('stopLoading', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.STOP_LOADING,
                isLoading: false,
            }
            expect(actions.stopLoading()).toEqual(expected);
        })
    })
})