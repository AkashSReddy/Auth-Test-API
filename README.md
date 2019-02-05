
# API for testing authentication

## This API is Hosted at [Click Here](https://auth-test-api.herokuapp.com/)
This API can be used to test auth for your applications 

API Documentation :

```
route : /register
request type : POST
Body : {email : , password : }
failure response : {error message} ("User already registered" if user already registered)
success response : {success}
```

```
route : /login
request type : POST
Body : {email : , password : }
failure response : {User not found!/Incorrect Password}
success response : {{ success: true }}
Header Included in response 
```

``` 
route : /session 
request type : GET 
Header : Must Be included
failure response : {"Auth-Test-API"}
success response : {{ success: true }}
```
```
Header Content:
Content-Type:application/x-www-form-urlencoded
token: {The response}
```
### The Token expires in 15 Days
