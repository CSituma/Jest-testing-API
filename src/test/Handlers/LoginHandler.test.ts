import { LoginHandler } from "../../app/Handlers/LoginHandler"
import { HTTP_CODES, HTTP_METHODS } from "../../app/Models/ServerModels";
import { Utils } from "../../app/Utils/Utils";

describe('Login handler test suite', () => { 

let loginHandler:LoginHandler;

const requestMock ={
    method:''
}
const responseMock ={ writeHead: jest.fn()}
const authorizeMock ={}

const getRequestBodyMock = jest.fn()

beforeEach(()=>{
    loginHandler = new LoginHandler(
     requestMock as any,
    responseMock as any,
    authorizeMock as any,
    )
    Utils.getRequestBody = getRequestBodyMock;
})

afterEach(()=>{
    jest.clearAllMocks();
})
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

 test.only('post request with valid body', async() => { 
 requestMock.method= HTTP_METHODS.POST
    // await loginHandler.handleRequest();
getRequestBodyMock.mockReturnValueOnce({
    username: 'someUser',
    password:'password'
})
  })


 })