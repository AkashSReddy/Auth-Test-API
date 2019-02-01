
# API for testing authentication

## This API is Hosted at [Click Here](https://auth-test-api.herokuapp.com/)
This API can be used to test auth for your applications 

API Documentation :

| Route         | Method        |  JSON response | Body Content |
| ------------- | ------------- |   -----------  | ------------ |
| /register     | POST          |      register is Success          |  [email:"",password:""] |
|  /login  | POST  |  Auth Success  |[email:"",password:""] |
| /logout  | GET  | Logged Out   | - |
| /session  | GET  | session running(if still logged in)   | - |
| /session  | GET  | Auth-Test-API(if logged out)   | - |


