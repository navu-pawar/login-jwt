## Start MongoDB Server
For eg.
Windows: 
C:\Program Files\MongoDB\Server\3.4\bin>mongod --dbpath=D:\mongodata\data  

Path of Server ->>>C:\Program Files\MongoDB\Server\4.0\bin>
Path of database files to be created ->>>D:\mongodata\data 


## Install Backend - NodeJs
Go to Folder "/login-jwt" then run "npm install"
After installation completes run "npm start"

Link:http://localhost:5500/api/


#### API's

Postman Collection:
https://www.getpostman.com/collections/96e70c2e0fa9fb23d201

## SignUp
POST : /api/user/signUp
Body:{  "email": "testuser@yopmail.com", "password": "user1234",  "firstname": "test", "lastname": "user"}
Headers:{"Content-Type":"application/json"}

## SignIn
POST : /api/user/signUp 
Body:{  "email": "testuser@yopmail.com", "password": "user1234"}
Headers:{"Content-Type":"application/json"}

## User Info
GET : /api/user/userInfo 
Headers:{"access_token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoZWNrQHlvcG1haWwuY29tIiwiaWF0IjoxNTUzNTg0Mzk1LCJleHAiOjE1NTM2NzA3OTV9.6WkP_sWLrhUMQzqjngpNzaqCEzmi4qDJKq619Dns0Yk',
     'Content-Type': 'application/json' }




"# login-jwt" 
