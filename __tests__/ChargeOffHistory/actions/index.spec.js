"use strict"

import * as actions from '../../../src/ChargeOffHistory/actions'
import moxios from 'moxios'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe('actions', () => {

    describe('requestLoadChargeOff', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.REQUEST_LOAD_CHARGE_OFF,
                isLoading: true,
            }
            expect(actions.requestLoadChargeOff()).toEqual(expected);
        })
    })

    describe('receiveLoadChargeOff', () => {
        it('should create an action to set loading state', () => {
            const chargeOff = [{ a: '1' }, { a: '2' }, { a: '3' }];
            const expected = {
                type: actions.RECEIVE_LOAD_CHARGE_OFF,
                isLoading: false,
                chargeOff,
            }
            expect(actions.receiveLoadChargeOff(chargeOff)).toEqual(expected);
        })
    })

    describe('loadChargeOff', () => {
        beforeEach(() => { moxios.install() })
        afterEach(() => { moxios.uninstall() })

        it('should redirect to home (/helper/user) since no unauthorized', () => {

            const store = configureStore([thunk])({});
            const expected = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected, });

            return store.dispatch(actions.loadChargeOff()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadChargeOff());
            })

        })

        it('should return error (/helper/user) since get ERROR from API', () => {

            const store = configureStore([thunk])({});
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", {
                status: 200,
                responseText: expected,
            })

            return store.dispatch(actions.loadChargeOff()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()[0]).toEqual(actions.requestLoadChargeOff());
                expect(store.getActions()[1]).toEqual(actions.requestResetAll());  //call reset & should return
                expect(store.getActions()[2]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }));
                expect(store.getActions()[3]).toEqual(actions.stopLoading());
            })

        })

        it('should redirect to home (/S001C001F003/read) since no unauthorized', () => {

            const store = configureStore([thunk])({
                chargeOff: { cash: [], holdings: [], },
                queryDate: { from: "", to: "", },
                isLoading: "",
                isMsgShown: false,
                msg: { type: "", title: "", text: "", }
            });
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expected2 = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F003/read", { status: 200, responseText: expected2, });

            return store.dispatch(actions.loadChargeOff()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadChargeOff());
            })

        })

        it('should return error (/S001C001F003/read) since get ERROR from API', () => {

            const store = configureStore([thunk])({
                chargeOff: { cash: [], holdings: [], },
                queryDate: { from: "", to: "", },
                isLoading: "",
                isMsgShown: false,
                msg: { type: "", title: "", text: "", }
            });
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expected2 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected1, })
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F003/read", { status: 200, responseText: expected2, });

            return store.dispatch(actions.loadChargeOff()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()[0]).toEqual(actions.requestLoadChargeOff());
                expect(store.getActions()[1]).toEqual(actions.requestResetAll());  //call reset & should return
                expect(store.getActions()[2]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected2.code.message, }));
                expect(store.getActions()[3]).toEqual(actions.stopLoading());
            })
        })

        it('should create an action to get data from server', () => {
            const store = configureStore([thunk])({
                chargeOff: { cash: [], holdings: [], },
                queryDate: { from: "", to: "", },
                isLoading: "",
                isMsgShown: false,
                msg: { type: "", title: "", text: "", }
            });
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    cash: [{ a: "a1" }, { a: "a2" }, { a: "a3" }],
                    holdings: [{ b: "b1" }, { b: "b2" }, { b: "b3" }],
                }
            };

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected1, })
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F003/read", { status: 200, responseText: expected2, });

            return store.dispatch(actions.loadChargeOff()).then(() => {
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual(actions.requestLoadChargeOff());
                expect(store.getActions()[1]).toEqual(actions.receiveLoadChargeOff(expected2.data));
            })
        })
    })

    describe('setFromQueryDate', () => {
        it('should create an action to set from query date state', () => {
            const from = '2018-01-01';
            const expected = {
                type: actions.SET_FROM_QUERY_DATE,
                from,
            }
            expect(actions.setFromQueryDate(from)).toEqual(expected);
        })
    })

    describe('setToQueryDate', () => {
        it('should create an action to set from query date state', () => {
            const to = '2018-01-01';
            const expected = {
                type: actions.SET_TO_QUERY_DATE,
                to,
            }
            expect(actions.setToQueryDate(to)).toEqual(expected);
        })
    })

    describe('setChargeOff', () => {
        it('should create an action to set charge off data state', () => {
            const cash = [{ a: "a1" }, { a: "a2" }, { a: "a3" }];
            const holdings = [{ b: "b1" }, { b: "b2" }, { b: "b3" }];
            const expected = {
                type: actions.SET_CHARGE_OFF,
                chargeOff: {
                    cash,
                    holdings,
                },
            }
            expect(actions.setChargeOff(cash, holdings)).toEqual(expected);
        })
    })

    describe('requestResetAll', () => {
        it('should create an action to set loading state', () => {
            const from = '2018-01-01';
            const expected = {
                type: actions.REQUEST_RESET_ALL,
                isLoading: true,
            }
            expect(actions.requestResetAll(from)).toEqual(expected);
        })
    })

    describe('receiveResetAll', () => {
        it('should create an action to set loading state', () => {
            const to = '2018-01-01';
            const expected = {
                type: actions.RECEIVE_RESET_ALL,
                isLoading: false,
            }
            expect(actions.receiveResetAll(to)).toEqual(expected);
        })
    })

    describe('resetAll', () => {
        beforeEach(() => { moxios.install() })
        afterEach(() => { moxios.uninstall() })

        it('should redirect to home (/helper/previous_work_day) since no unauthorized', () => {
            const store = configureStore([thunk])({});
            const expected = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, });

            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestResetAll());
            })
        })

        it('should return error (/helper/previous_work_day) since get ERROR from API', () => {

            const store = configureStore([thunk])({});
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, })

            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[0]).toEqual(actions.requestResetAll());
                expect(store.getActions()[1]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }));
                expect(store.getActions()[2]).toEqual(actions.stopLoading());
            })

        })

        it('should create an action to get data from server', () => {
            const store = configureStore([thunk])({});
            const expected = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01'
            };

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, })

            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(5);
                expect(store.getActions()[0]).toEqual(actions.requestResetAll());
                expect(store.getActions()[1]).toEqual(actions.setFromQueryDate(expected.data));
                expect(store.getActions()[2]).toEqual(actions.setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));
                expect(store.getActions()[3]).toEqual(actions.setChargeOff([], []));
                expect(store.getActions()[4]).toEqual(actions.receiveResetAll());
            })
        })
    })

    describe('requestInitQuery', () => {
        it('should create an action to set loading state', () => {
            const from = '2018-01-01';
            const expected = {
                type: actions.REQUEST_INIT_QUERY,
                isLoading: true,
            }
            expect(actions.requestInitQuery(from)).toEqual(expected);
        })
    })

    describe('receiveInitQuery', () => {
        it('should create an action to set loading state', () => {
            const to = '2018-01-01';
            const expected = {
                type: actions.RECEIVE_INIT_QUERY,
                isLoading: false,
            }
            expect(actions.receiveInitQuery(to)).toEqual(expected);
        })
    })

    describe('initQuery', () => {
        beforeEach(() => { moxios.install() })
        afterEach(() => { moxios.uninstall() })

        it('should redirect to home (/helper/previous_work_day) since no unauthorized', () => {

            const store = configureStore([thunk])({});
            const expected = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
            })
        })

        it('should return error (/helper/previous_work_day) since get ERROR from API', () => {

            const store = configureStore([thunk])({});
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, })

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
                expect(store.getActions()[1]).toEqual(actions.requestResetAll());  //call reset & should return
                expect(store.getActions()[2]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }));
                expect(store.getActions()[3]).toEqual(actions.stopLoading());
            })

        })

        it('should redirect to home (/helper/user) since no unauthorized', () => {
            const store = configureStore([thunk])({});
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01'
            };
            const expected2 = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected2, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
                expect(store.getActions()[1]).toEqual(actions.setFromQueryDate(expected1.data));
                expect(store.getActions()[2]).toEqual(actions.setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));
            })
        })

        it('should return error (/helper/user) since get ERROR from API', () => {
            const store = configureStore([thunk])({});
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01'
            };
            const expected2 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected2, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(6);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
                expect(store.getActions()[1]).toEqual(actions.setFromQueryDate(expected1.data));
                expect(store.getActions()[2]).toEqual(actions.setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));
                expect(store.getActions()[3]).toEqual(actions.requestResetAll());
                expect(store.getActions()[4]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected2.code.message, }));
                expect(store.getActions()[5]).toEqual(actions.stopLoading());
            })
        })

        it('should redirect to home (/S001C001F003/read) since no unauthorized', () => {
            const store = configureStore([thunk])({
                chargeOff: { cash: [], holdings: [], },
                queryDate: { from: "", to: "", },
                isLoading: "",
                isMsgShown: false,
                msg: { type: "", title: "", text: "", }
            });
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01'
            };
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expected3 = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected2, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F003/read", { status: 200, responseText: expected3, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
                expect(store.getActions()[1]).toEqual(actions.setFromQueryDate(expected1.data));
                expect(store.getActions()[2]).toEqual(actions.setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));
            })
        })

        it('should return error (/S001C001F003/read) since get ERROR from API', () => {
            const store = configureStore([thunk])({
                chargeOff: { cash: [], holdings: [], },
                queryDate: { from: "", to: "", },
                isLoading: "",
                isMsgShown: false,
                msg: { type: "", title: "", text: "", }
            });
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01'
            };
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expected3 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected2, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F003/read", { status: 200, responseText: expected3, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(6);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
                expect(store.getActions()[1]).toEqual(actions.setFromQueryDate(expected1.data));
                expect(store.getActions()[2]).toEqual(actions.setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));
                expect(store.getActions()[3]).toEqual(actions.requestResetAll());  //call reset & should return
                expect(store.getActions()[4]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected3.code.message, }));
                expect(store.getActions()[5]).toEqual(actions.stopLoading());
            })
        })

        it('should create an action to get data from server', () => {
            const store = configureStore([thunk])({
                chargeOff: { cash: [], holdings: [], },
                queryDate: { from: "", to: "", },
                isLoading: "",
                isMsgShown: false,
                msg: { type: "", title: "", text: "", }
            });
            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01'
            };
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expected3 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    cash: [{ a: "a1" }, { a: "a2" }, { a: "a3" }],
                    holdings: [{ b: "b1" }, { b: "b2" }, { b: "b3" }],
                }
            };

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected2, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F003/read", { status: 200, responseText: expected3, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(5);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
                expect(store.getActions()[1]).toEqual(actions.setFromQueryDate(expected1.data));
                expect(store.getActions()[2]).toEqual(actions.setToQueryDate(require("date-format")("yyyy-MM-dd", new Date())));
                expect(store.getActions()[3]).toEqual(actions.setChargeOff(expected3.data.cash, expected3.data.holdings));
                expect(store.getActions()[4]).toEqual(actions.receiveInitQuery());
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
