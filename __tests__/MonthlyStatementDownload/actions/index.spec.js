import * as actions from '../../../src/MonthlyStatementDownload/actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

describe('actions', () => {

    describe('requestCheckPermission', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.REQUEST_CHECK_PERMISSION,
                isLoading: true,
            };
            expect(actions.requestCheckPermission()).toEqual(expected);
        })
    })

    describe('receiveCheckPermission', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.RECEIVE_CHECK_PERMISSION,
                isLoading: false,
            };
            expect(actions.receiveCheckPermission()).toEqual(expected);
        })
    })

    describe('checkPermission', () => {
        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        it('should redirect to home (/helper/user) since no unauthorized', () => {
            const store = configureStore([thunk])({});
            const expected = {}
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected });
            return store.dispatch(actions.checkPermission()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestCheckPermission());
            })
        })

        it('should return error (/helper/user) since get ERROR from API', () => {
            const store = configureStore([thunk])({});
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected });
            return store.dispatch(actions.checkPermission()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[0]).toEqual(actions.requestCheckPermission());
                expect(store.getActions()[1]).toEqual(actions.showMessage({
                    type: "ERROR", title: "ERROR", text: expected.code.message,
                }));
                expect(store.getActions()[2]).toEqual(actions.stopLoading());
            })
        })

        it('should create an action to get data from server', () => {
            const store = configureStore([thunk])({});
            const expected = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            }
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected });
            return store.dispatch(actions.checkPermission()).then(() => {
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual(actions.requestCheckPermission());
                expect(store.getActions()[1]).toEqual(actions.receiveCheckPermission());
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

    describe('setYM', () => {
        it('should create an action to set YM state', () => {
            const expected = {
                type: actions.SET_YM,
                ym: '2018/12',
            }
            expect(actions.setYM(expected.ym)).toEqual(expected);
        })
    })

})
