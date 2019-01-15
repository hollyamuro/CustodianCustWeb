"use strict";

import { Unauthorized, NotFound, InternalServerError } from '../../src/SinoComponent/SinoErrorHandler'

describe('Handler', () => {
    describe('SinoErrorHandler', () => {
        describe('Unauthorized', () => {
            it('should return right value of error', () => {

                const error1 = new Unauthorized();
                expect(error1.message).toEqual("Unauthorized, please login in first.");
                expect(error1.type).toEqual("ERROR");
                expect(error1.title).toEqual("System Message");
                expect(error1.status).toEqual(401);

                const error2 = new Unauthorized("");
                expect(error2.message).toEqual("Unauthorized, please login in first.");
                expect(error2.type).toEqual("ERROR");
                expect(error2.title).toEqual("System Message");
                expect(error2.status).toEqual(401);

                const error3 = new Unauthorized("customized message");
                expect(error3.message).toEqual("customized message");
                expect(error3.type).toEqual("ERROR");
                expect(error3.title).toEqual("System Message");
                expect(error3.status).toEqual(401);
                
            })
        })

        describe('NotFound', () => {
            it('should return right value of error', () => {

                const error1 = new NotFound();
                expect(error1.message).toEqual("No Data.");
                expect(error1.type).toEqual("ERROR");
                expect(error1.title).toEqual("System Message");
                expect(error1.status).toEqual(404);

                const error2 = new NotFound("");
                expect(error2.message).toEqual("No Data.");
                expect(error2.type).toEqual("ERROR");
                expect(error2.title).toEqual("System Message");
                expect(error2.status).toEqual(404);

                const error3 = new NotFound("customized message");
                expect(error3.message).toEqual("customized message");
                expect(error3.type).toEqual("ERROR");
                expect(error3.title).toEqual("System Message");
                expect(error3.status).toEqual(404);
                
            })
        })

        describe('InternalServerError', () => {
            it('should return right value of error', () => {

                const error1 = new InternalServerError();
                expect(error1.message).toEqual("Error, please contact the customer service.");
                expect(error1.type).toEqual("ERROR");
                expect(error1.status).toEqual(500);

                const error2 = new InternalServerError("");
                expect(error2.message).toEqual("Error, please contact the customer service.");
                expect(error2.type).toEqual("ERROR");
                expect(error2.status).toEqual(500);

                const error3 = new InternalServerError("customized message");
                expect(error3.message).toEqual("customized message");
                expect(error3.type).toEqual("ERROR");
                expect(error3.status).toEqual(500);
                
            })
        })
    })
})