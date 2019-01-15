"use strict"

import * as actions from '../../../src/Safekeeping/actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'

describe('actions', () => {
    describe('requestLoadSafekeeping', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.REQUEST_LOAD_SAFEKEEPING,
                isLoading: true,
            }
            expect(actions.requestLoadSafekeeping()).toEqual(expected);
        })
    })

    describe('receiveLoadSafekeeping ', () => {
        it('should create an action to set loading state', () => {
            const balance = [{ a: '1' }, { a: '2' }, { a: '3' }];
            const holding = [{ b: '1' }, { b: '2' }, { b: '3' }];
            const expected = {
                type: actions.RECEIVE_LOAD_SAFEKEEPING,
                isLoading: false,
                balance,
                holding,
            }
            expect(actions.receiveLoadSafekeeping(balance, holding)).toEqual(expected);
        })
    })

    describe('doLoadSafekeeping', () => {

        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        it('should redirect to home (/S001C001F004/read/balance) since no unauthorized', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });
            const expected1 = {};
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ b: '1' }, { b: '2' }, { b: '3' }],
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected2, }
            );

            return store.dispatch(actions.doLoadSafekeeping()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadSafekeeping());
            })
        })

        it('should redirect to home (/S001C001F004/read/holding) since no unauthorized', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ a: '1' }, { a: '2' }, { a: '3' }],
            }
            const expected2 = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected2, }
            );

            return store.dispatch(actions.doLoadSafekeeping()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadSafekeeping());
            })
        })

        it('should return error (/S001C001F004/read/balance) since get ERROR from API', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });
            const expected1 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": [],
            };
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ b: '1' }, { b: '2' }, { b: '3' }],
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected2, }
            );

            return store.dispatch(actions.doLoadSafekeeping()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()).toEqual([
                    actions.requestLoadSafekeeping(),
                    actions.requestResetAll(), //call reset & should return
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expected1.code.message, }),
                    actions.stopLoading(),
                ]);
            })
        })

        it('should return error (/S001C001F004/read/holding) since get ERROR from API', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ a: '1' }, { a: '2' }, { a: '3' }],
            }
            const expected2 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": [],
            };

            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected2, }
            );

            return store.dispatch(actions.doLoadSafekeeping()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()).toEqual([
                    actions.requestLoadSafekeeping(),
                    actions.requestResetAll(), //call reset & should return
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expected2.code.message, }),
                    actions.stopLoading(),
                ]);
            })
        })

        it('should create an action to get data from server', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ a: '1' }, { a: '2' }, { a: '3' }],
            }
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ b: '1' }, { b: '2' }, { b: '3' }],
            };

            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected2, }
            );

            return store.dispatch(actions.doLoadSafekeeping()).then(() => {
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()).toEqual([
                    actions.requestLoadSafekeeping(),
                    actions.receiveLoadSafekeeping(expected1.data, expected2.data),
                ]);
            })
        })
    })

    describe('setFromPositionDate', () => {
        it('should create an action to set from position date', () => {
            const from = '2018-01-01'
            const expected = {
                type: actions.SET_FROM_POSITION_DATE,
                from,
            }
            expect(actions.setFromPositionDate(from)).toEqual(expected);
        })
    })

    describe('setToPositionDate', () => {
        it('should create an action to set to position date', () => {
            const to = '2018-01-31'
            const expected = {
                type: actions.SET_TO_POSITION_DATE,
                to,
            }
            expect(actions.setToPositionDate(to)).toEqual(expected);
        })
    })

    describe('setFromMaturityDate', () => {
        it('should create an action to set from maturity date', () => {
            const from = '2018-01-01';
            const expected = {
                type: actions.SET_FROM_MATURITY_DATE,
                from
            };
            expect(actions.setFromMaturityDate(from)).toEqual(expected);
        })
    })

    describe('setToMaturityDate', () => {
        it('should create an action to set to maturity date', () => {
            const to = '2018-01-31';
            const expected = {
                type: actions.SET_TO_MATURITY_DATE,
                to,
            };
            expect(actions.setToMaturityDate(to)).toEqual(expected);
        })
    })

    describe('setAccount', () => {
        it('should create an action to set account', () => {
            const account = 'ThisIsTestAccount';
            const expected = {
                type: actions.SET_ACCOUNT,
                account,
            }
            expect(actions.setAccount(account)).toEqual(expected);
        })
    })

    describe('setIsin', () => {
        it('should create an action to set isin', () => {
            const isin = 'AB123456789';
            const expected = {
                type: actions.SET_ISIN,
                isin,
            }
            expect(actions.setIsin(isin)).toEqual(expected);
        })
    })

    describe('setSafekeeping', () => {
        it('should create an action to set safekeeping', () => {
            const balance = [{ a: '1' }, { a: '2' }, { a: '3' }];
            const holding = [{ b: '1' }, { b: '2' }, { b: '3' }];
            const expected = {
                type: actions.SET_SAFEKEEPING,
                balance,
                holding,
            }
            expect(actions.setSafekeeping(balance, holding)).toEqual(expected);
        })
    })

    describe('requestResetAll', () => {
        it('should create an action to set loading', () => {
            const expected = {
                type: actions.REQUEST_RESET_ALL,
                isLoading: true,
            }
            expect(actions.requestResetAll()).toEqual(expected);
        })
    })

    describe('receiveResetAll', () => {
        it('should create an action to set loading', () => {
            const expected = {
                type: actions.RECEIVE_RESET_ALL,
                isLoading: false,
            }
            expect(actions.receiveResetAll()).toEqual(expected);
        })
    })

    describe('resetAll', () => {
        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        it('should redirect to home (/helper/previous_work_day) since no unauthorized', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });
            const expected1 = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected1, }
            );

            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestResetAll());
            })
        })

        it('should return error (/helper/previous_work_day) since get ERROR from API', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": [],
            };
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected, }
            );

            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()).toEqual([
                    actions.requestResetAll(),
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }),
                    actions.stopLoading(),
                ]);
            })
        })

        it('should create an action to get data from server', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected, }
            );

            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(9);
                expect(store.getActions()).toEqual([
                    actions.requestResetAll(),
                    actions.setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(expected.data))),
                    actions.setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())),
                    actions.setFromMaturityDate(""),
                    actions.setToMaturityDate(""),
                    actions.setAccount(""),
                    actions.setIsin(""),
                    actions.setSafekeeping([], []),
                    actions.receiveResetAll(),
                ]);
            })
        })
    })

    describe('requestInitQuery', () => {
        it('should create an action to set loading', () => {
            const expected = {
                type: actions.REQUEST_INIT_QUERY,
                isLoading: true,
            }
            expect(actions.requestInitQuery()).toEqual(expected);
        })
    })

    describe('receiveInitQuery', () => {
        it('should create an action to set loading', () => {
            const expected = {
                type: actions.RECEIVE_INIT_QUERY,
                isLoading: false,
            }
            expect(actions.receiveInitQuery()).toEqual(expected);
        })
    })

    describe('initQuery', () => {
        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        it('should redirect to home (/helper/previous_work_day) since no unauthorized', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });
            const expected1 = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected1, }
            );

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestInitQuery());
            })
        })

        it('should return error (/helper/previous_work_day) since get ERROR from API', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": [],
            };
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected, }
            );

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.requestResetAll(), //call reset & should return
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }),
                    actions.stopLoading(),
                ]);
            })
        })

        it('should redirect to home (/S001C001F004/read/balance) since no unauthorized', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expected2 = {};
            const expected3 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ b: '1' }, { b: '2' }, { b: '3' }],
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected2, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected3, }
            );

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(7);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(expected1.data))),
                    actions.setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())),
                    actions.setFromMaturityDate(""),
                    actions.setToMaturityDate(""),
                    actions.setAccount(""),
                    actions.setIsin(""),
                ]);
            })
        })

        it('should redirect to home (/S001C001F004/read/holding) since no unauthorized', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ a: '1' }, { a: '2' }, { a: '3' }],
            }
            const expected3 = {};

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected2, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected3, }
            );

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(7);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(expected1.data))),
                    actions.setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())),
                    actions.setFromMaturityDate(""),
                    actions.setToMaturityDate(""),
                    actions.setAccount(""),
                    actions.setIsin(""),
                ]);
            })
        })

        it('should return error (/S001C001F004/read/balance) since get ERROR from API', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expected2 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": [],
            };
            const expected3 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ b: '1' }, { b: '2' }, { b: '3' }],
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected2, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected3, }
            );

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(10);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(expected1.data))),
                    actions.setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())),
                    actions.setFromMaturityDate(""),
                    actions.setToMaturityDate(""),
                    actions.setAccount(""),
                    actions.setIsin(""),
                    actions.requestResetAll(), //call reset & should return
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expected2.code.message, }),
                    actions.stopLoading(),
                ]);
            })
        })

        it('should return error (/S001C001F004/read/holding) since get ERROR from API', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ a: '1' }, { a: '2' }, { a: '3' }],
            };
            const expected3 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": [],
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected2, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected3, }
            );

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(10);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(expected1.data))),
                    actions.setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())),
                    actions.setFromMaturityDate(""),
                    actions.setToMaturityDate(""),
                    actions.setAccount(""),
                    actions.setIsin(""),
                    actions.requestResetAll(), //call reset & should return
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expected3.code.message, }),
                    actions.stopLoading(),
                ]);
            })
        })

        it('should create an action to get data from server', () => {
            const store = configureStore([thunk])({
                queryPositionDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
                account: 'TEST_ACCOUNT',
                isin: 'TEST_ISIN,',
                queryMaturityDate: {
                    from: "2018-01-01",
                    to: "2018-01-31",
                },
            });

            const expected1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expected2 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ a: '1' }, { a: '2' }, { a: '3' }],
            };
            const expected3 = {
                "code": { "type": "INFO", "message": "", },
                "data": [{ b: '1' }, { b: '2' }, { b: '3' }],
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day",
                { status: 200, responseText: expected1, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/balance",
                { status: 200, responseText: expected2, }
            );
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F004/read/holding",
                { status: 200, responseText: expected3, }
            );

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(9);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setFromPositionDate(require("date-format")("yyyy-MM-dd", new Date(expected1.data))),
                    actions.setToPositionDate(require("date-format")("yyyy-MM-dd", new Date())),
                    actions.setFromMaturityDate(""),
                    actions.setToMaturityDate(""),
                    actions.setAccount(""),
                    actions.setIsin(""),
                    actions.setSafekeeping(expected2.data, expected3.data),
                    actions.receiveInitQuery()
                ]);
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