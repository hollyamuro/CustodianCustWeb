"use strict"

import * as actions from '../../../src/PositionInquiry/actions'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { NotFound } from "../../../src/SinoComponent/SinoErrorHandler";

describe('actions', () => {
    describe('requestLoadPosition', () => {
        it('should return an action to set loading state', () => {
            const expected = {
                type: actions.REQUEST_LOAD_POSITION,
                isLoading: true,
            }
            expect(actions.requestLoadPosition()).toEqual(expected);
        })
    })

    describe('receiveLoadPosition', () => {
        it('should return an action to set loading state', () => {
            const position = {
                cash: [{ a: '1' }, { a: '2' }, { a: '3' }],
                bond: [{ a: '1' }, { a: '2' }, { a: '3' }],
                rp: [{ a: '1' }, { a: '2' }, { a: '3' }],
                rs: [{ a: '1' }, { a: '2' }, { a: '3' }],
            };
            const expected = {
                type: actions.RECEIVE_LOAD_POSITION,
                isLoading: false,
                position: position,
            }
            expect(actions.receiveLoadPosition(position)).toEqual(expected);
        })
    })

    describe('loadPosition', () => {

        beforeEach(() => {
            moxios.install();
        });

        afterEach(() => {
            moxios.uninstall();
        });

        it('should redirect to home (/helper/user) since no unauthorized', () => {
            const store = configureStore([thunk])({});
            const expected = {};
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected, });
            return store.dispatch(actions.loadPosition()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());
            })
        })

        it('should redirect to home (/S001C001F001/read) since no unauthorized', () => {
            const store = configureStore([thunk])({});
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
            const expectedPositionData = {};
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedUserData, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedPositionData, });
            return store.dispatch(actions.loadPosition()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());
            })
        })

        it('should return error (/helper/user) since get ERROR from API', () => {
            const store = configureStore([thunk])({});
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expected, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.loadPosition()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());
                expect(store.getActions()[1]).toEqual(actions.requestResetAll()); //call reset & should return
                expect(store.getActions()[2]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }));
                expect(store.getActions()[3]).toEqual(actions.stopLoading());
            })
        })

        it('should return error (/S001C001F001/read) since get ERROR from API', () => {
            const store = configureStore([thunk])({});
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
            const expectedPositionData = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            };
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedUserData, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedPositionData, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.loadPosition()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());
                expect(store.getActions()[1]).toEqual(actions.requestResetAll()); //call reset & should return
                expect(store.getActions()[2]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expectedPositionData.code.message, }));
                expect(store.getActions()[3]).toEqual(actions.stopLoading());
            })
        })

        it('should create an action to get data from server but no data', () => {
            const position = { cash: [], bond: [], rp: [], rs: [], };
            const store = configureStore([thunk])({ position, });
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
            const expectedPositionData = {
                "code": { "type": "INFO", "message": "", },
                "data": position,
            };
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedUserData, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedPositionData, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.loadPosition()).then(() => {
                // expect(store.getActions().length).toBe(4);
                // expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());
                // expect(store.getActions()[1]).toEqual(actions.requestResetAll()); //call reset & should return
                // expect(store.getActions()[2]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: new NotFound().message, }));
                // expect(store.getActions()[3]).toEqual(actions.stopLoading());

                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());
                expect(store.getActions()[1]).toEqual(actions.receiveLoadPosition(expectedPositionData.data));
            })
        })

        it('should create an action to get data from server', () => {
            const position = { cash: [], bond: [], rp: [], rs: [], };
            const store = configureStore([thunk])({ position, });
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
            const expectedPositionData = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    cash: [{ a: '1' }, { a: '2' }, { a: '3' }],
                    bond: [{ a: '1' }, { a: '2' }, { a: '3' }],
                    rp: [{ a: '1' }, { a: '2' }, { a: '3' }],
                    rs: [{ a: '1' }, { a: '2' }, { a: '3' }],
                },
            };
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedUserData, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedPositionData, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.loadPosition()).then(() => {
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()[0]).toEqual(actions.requestLoadPosition());
                expect(store.getActions()[1]).toEqual(actions.receiveLoadPosition(expectedPositionData.data));
            })
        })
    })

    describe('setQueryDate', () => {
        it('should return an action to set queryDate state', () => {
            const queryDate = '2018-01-01'
            const expected = {
                type: actions.SET_QUERY_DATE,
                queryDate,
            }
            expect(actions.setQueryDate(expected.queryDate)).toEqual(expected);
        })
    })

    describe('setPosition', () => {
        it('should return an action to set setPosition state', () => {
            const position = {
                cash: [{ a: '1' }, { a: '2' }, { a: '3' }],
                bond: [{ a: '1' }, { a: '2' }, { a: '3' }],
                rp: [{ a: '1' }, { a: '2' }, { a: '3' }],
                rs: [{ a: '1' }, { a: '2' }, { a: '3' }],
            };
            const expected = {
                type: actions.SET_POSITION,
                position,
            }
            expect(actions.setPosition(position.cash, position.bond, position.rp, position.rs)).toEqual(expected);
        })
    })

    describe('requestResetAll', () => {
        it('should return an action to set all state for reset', () => {
            const expected = {
                type: actions.REQUEST_RESET_ALL,
                isLoading: true,
            }
            expect(actions.requestResetAll()).toEqual(expected);
        })
    })

    describe('receiveResetAll ', () => {
        it('should return an action to set all state for reset', () => {
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
            const expected = {};
            const store = configureStore([thunk])({});
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, })
            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()[0]).toEqual(actions.requestResetAll());
            })
        })

        it('should return error (/helper/previous_work_day) since get ERROR from API', () => {
            const expected = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }
            const store = configureStore([thunk])({});
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, })
            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(3);
                expect(store.getActions()[0]).toEqual(actions.requestResetAll());
                expect(store.getActions()[1]).toEqual(actions.showMessage({ type: "ERROR", title: "ERROR", text: expected.code.message, }));
                expect(store.getActions()[2]).toEqual(actions.stopLoading());
            })
        })

        it('should create an action to get data from server', () => {
            const position = { cash: [], bond: [], rp: [], rs: [], };
            const expected = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const store = configureStore([thunk])({});
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, })
            return store.dispatch(actions.resetAll()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()[0]).toEqual(actions.requestResetAll());
                expect(store.getActions()[1]).toEqual(actions.setQueryDate(expected.data));
                expect(store.getActions()[2]).toEqual(actions.setPosition(position.cash, position.bond, position.rp, position.rs));
                expect(store.getActions()[3]).toEqual(actions.receiveResetAll());
            })
        })
    })

    describe('requestInitQuery', () => {
        it('should create an action to set loading state', () => {
            const expected = {
                type: actions.REQUEST_INIT_QUERY,
                isLoading: true,
            }
            expect(actions.requestInitQuery()).toEqual(expected);
        })
    })

    describe('receiveInitQuery', () => {
        it('should create an action to set loading state', () => {
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
            const expected = {};
            const store = configureStore([thunk])({});
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expected, })
            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(1);
                expect(store.getActions()).toEqual([actions.requestInitQuery()]);
            })
        })

        it('should redirect to home (/helper/user) since no unauthorized', () => {
            const store = configureStore([thunk])({});
            const expectedRes1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expectedRes2 = {}
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expectedRes1, })
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedRes2, });
            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setQueryDate(expectedRes1.data),
                ]);
            })
        })

        it('should redirect to home (/S001C001F001/read) since no unauthorized', () => {
            const store = configureStore([thunk])({});
            const expectedRes1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expectedRes2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            };
            const expectedRes3 = {};
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expectedRes1, })
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedRes2, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedRes3, });
            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(2);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setQueryDate(expectedRes1.data),
                ]);
            })
        })

        it('should return error (/helper/previous_work_day) since get ERROR from API', () => {
            const store = configureStore([thunk])({});
            const expectedRes1 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expectedRes1, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.requestResetAll(),
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expectedRes1.code.message, }),
                    actions.stopLoading(),
                ]);
            })
        })

        it('should return error (/helper/user) since get ERROR from API', () => {
            const store = configureStore([thunk])({});
            const expectedRes1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }
            const expectedRes2 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expectedRes1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedRes2, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(5);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setQueryDate(expectedRes1.data),
                    actions.requestResetAll(), //call reset & should return
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expectedRes2.code.message, }),
                    actions.stopLoading(),
                ])
            })
        })

        it('should return error (/S001C001F001/read) since get ERROR from API', () => {
            const store = configureStore([thunk])({});
            const expectedRes1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }

            const expectedRes2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            }

            const expectedRes3 = {
                "code": { "type": "ERROR", "message": "this is error message", },
                "data": {}
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expectedRes1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedRes2, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedRes3, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(5);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setQueryDate(expectedRes1.data),
                    actions.requestResetAll(), //call reset & should return
                    actions.showMessage({ type: "ERROR", title: "ERROR", text: expectedRes3.code.message, }),
                    actions.stopLoading(),
                ])
            })
        })

        it('should create an action to get data from server but no data', () => {
            const store = configureStore([thunk])({});
            const expectedRes1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }

            const expectedRes2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            }

            const expectedRes3 = {
                "code": { "type": "INFO", "message": "", },
                "data": { cash: [], bond: [], rp: [], rs: [] }
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expectedRes1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedRes2, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedRes3, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.initQuery()).then(() => {
                // expect(store.getActions().length).toBe(5);
                // expect(store.getActions()).toEqual([
                //     actions.requestInitQuery(),
                //     actions.setQueryDate(expectedRes1.data),
                //     actions.requestResetAll(), //call reset & should return
                //     actions.showMessage({ type: "ERROR", title: "ERROR", text: new NotFound().message, }),
                //     actions.stopLoading(),
                // ])
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setQueryDate(expectedRes1.data),
                    actions.setPosition(expectedRes3.data.cash, expectedRes3.data.bond, expectedRes3.data.rp, expectedRes3.data.rs),
                    actions.receiveInitQuery(),
                ])
            })
        })

        it('should create an action to get data from server but no data', () => {
            const store = configureStore([thunk])({});
            const expectedRes1 = {
                "code": { "type": "INFO", "message": "", },
                "data": '2018-01-01',
            }

            const expectedRes2 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    "user": '',
                    "user_name": '',
                    "sino_account": '',
                    "dept": '',
                    "dept_name": '',
                }
            }

            const expectedRes3 = {
                "code": { "type": "INFO", "message": "", },
                "data": {
                    cash: [{ a: '1' }, { a: '2' }, { a: '3' }],
                    bond: [{ a: '1' }, { a: '2' }, { a: '3' }],
                    rp: [{ a: '1' }, { a: '2' }, { a: '3' }],
                    rs: [{ a: '1' }, { a: '2' }, { a: '3' }],
                }
            }

            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/previous_work_day", { status: 200, responseText: expectedRes1, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: expectedRes2, });
            moxios.stubRequest(location.protocol + "//" + location.host + "/S001C001F001/read", { status: 200, responseText: expectedRes3, });

            // call reset 
            moxios.stubRequest(location.protocol + "//" + location.host + "/helper/user", { status: 200, responseText: {}, });

            return store.dispatch(actions.initQuery()).then(() => {
                expect(store.getActions().length).toBe(4);
                expect(store.getActions()).toEqual([
                    actions.requestInitQuery(),
                    actions.setQueryDate(expectedRes1.data),
                    actions.setPosition(expectedRes3.data.cash, expectedRes3.data.bond, expectedRes3.data.rp, expectedRes3.data.rs),
                    actions.receiveInitQuery(),
                ])
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