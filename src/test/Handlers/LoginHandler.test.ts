import { LoginHandler } from "../../app/Handlers/LoginHandler"
import { HTTP_CODES, HTTP_METHODS, SessionToken } from "../../app/Models/ServerModels";
import { Utils } from "../../app/Utils/Utils";

describe('Login handler test suite', async () => { 

let loginHandler:LoginHandler;

const requestMock ={
    method:''
}
const responseMock = {
    writeHead: jest.fn(),
    write: jest.fn(),
    statusCode: 0
};
const authorizerMock = {
    generateToken: jest.fn()
};

const getRequestBodyMock = jest.fn()

beforeEach(()=>{
    loginHandler = new LoginHandler(
     requestMock as any,
    responseMock as any,
    authorizerMock as any,
    )
    requestMock.method= HTTP_METHODS.POST
    Utils.getRequestBody = getRequestBodyMock;
})

afterEach(()=>{
    jest.clearAllMocks();
})

const someSessionToken: SessionToken = {
    tokenId: 'someTokenId',
    userName: 'someUserName',
    valid: true,
    expirationTime: new Date(),
    accessRights: [1, 2, 3]
}

//the options
test('options request', async() => { 
    requestMock.method = HTTP_METHODS.OPTIONS
    await loginHandler.handleRequest();
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.OK)
 })

 //the break
 test('not handled http request', async() => { 
    requestMock.method = 'random test'
    await loginHandler.handleRequest();
    expect(responseMock.writeHead).not.toHaveBeenCalled()
 })

 //the POST Auth

 test('post request with valid body', async() => { 

 getRequestBodyMock.mockReturnValueOnce({
    username: 'someUser',
    password:'password'
})
  authorizerMock.generateToken.mockReturnValueOnce(someSessionToken);
  await loginHandler.handleRequest();
  expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED);
  expect(responseMock.writeHead).toBeCalledWith(
      HTTP_CODES.CREATED, { 'Content-Type': 'application/json' }
  );
  expect(responseMock.write).toBeCalledWith(JSON.stringify(someSessionToken));


 })


 test('post request with invalid body', async() => { 
  
    getRequestBodyMock.mockReturnValueOnce({
       username: 'someUser',
       password:'password'
   })
     authorizerMock.generateToken.mockReturnValueOnce(null);
     await loginHandler.handleRequest();
     expect(responseMock.statusCode).toBe(HTTP_CODES.NOT_fOUND);
     expect(responseMock.write).toBeCalledWith('wrong username or password');
    })

    test('post request with unexpected error', async() => { 
        
        getRequestBodyMock.mockRejectedValueOnce(new Error('something went wrong!'))
        authorizerMock.generateToken.mockReturnValueOnce(null);
        await loginHandler.handleRequest();
        expect(responseMock.statusCode).toBe(HTTP_CODES.INTERNAL_SERVER_ERROR);
        expect(responseMock.write).toBeCalledWith('Internal error: something went wrong!');
        })

})