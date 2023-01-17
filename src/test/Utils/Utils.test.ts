import { IncomingMessage } from "http";
import { Utils } from "../../app/Utils/Utils";

describe('Utils test Suite', () => { 


    test('getRequestPath valid request', () => 
    { 
    const request = {
        url: 'http://localhost:8080/login'
    }as IncomingMessage
    const requestPath = Utils.getRequestBasePath(request);
     expect(requestPath).toBe('login') })



     test('getRequestPath with no path name', () => 
     { 
     const request = {
         url: 'http://localhost:8080/'
     }as IncomingMessage
     const requestPath = Utils.getRequestBasePath(request);
      expect(requestPath).toBeFalsy()})
 

     test('getRequestPath with no path name', () => 
     { 
     const request = {
         url: ''
     }as IncomingMessage
     const requestPath = Utils.getRequestBasePath(request);
      expect(requestPath).toBeFalsy()})
 

 })