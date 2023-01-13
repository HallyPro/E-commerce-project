# E-commerce-project
Basic nodejs store API project 

//node-modules... type in terminal
      ~ $ npm install   //to install all modules 

//Start application 
      ~ $ npm start 

// test application 
      ~ $ npm test 

// Port 
  * runs on http://localhost:3000

//API Endpoints
 - Authentication 
 - Login user 
 - Register user 
 - Get products 
 - Get all carts 
 - Get single cart 
 - Create cart 
 - Delete cart 
 
 //Validation steps 
  * Connecting to database (mongoDB)
  * Build schemas ... mongoose validation
  * Validating registration user details
  * Hash password (bcryptjs)
  * Create user token (jwt)
  * Validating login user details
  * Validating password (bcryptjs)
  * Create user token 
  * Authentication endpoint //checking if token exist in authorization headers
  * Populate product to database 
  * Products endpoint
  * Carts endpoint 
  * Mongoose validation error handling //User friendly error handling 
  
  //Setting token automatically on postman authorization header 
  - Go to tests in your postman Register user and Login user request's page
    type: 
          const jsonData = pm.response.json()
          pm.globals.set('accessToken', jsonData.token)   //this will set your token as a global variable on postman, and everytime you register or login user, the token                                                            will be overwritten with the new one
          
  - Now set this accessToken in the authorization header for each endpoints that requires authentication
  
  This is my first ever backend project, so you might discover some laxity ... Please, kindly inform when you do, with suggestion on how to make it better. 
  THANK YOU!!!
