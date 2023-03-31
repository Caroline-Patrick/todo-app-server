const express = require("express");
const jwt =require("jsonwebtoken");
const cors = require("cors");

const app = express();
const pool = require("./sql/connections");
const userRoutes = require("./routes/users");
const todosRoutes = require("./routes/todos");
const signupRoutes= require("./routes/signup");
const signinRoutes = require("./routes/signin");

const PORT = process.env.PORT || 5000;

//create function to authenticate token that we get back from the signin route
//this is middleware function, it'll run the function first, then say "next" --> can go onto the route controller
const authenticateToken=(req, res, next) => {
    //Get meta information for our request
    const authHeader = req.headers.authorization;
    // console.log({auth: authHeader})

    if(!authHeader) return res.sendStatus(403);
    //take the Bearer token (if it exists) and split it at the space and then take the 2nd item in array
    const token = authHeader.split(' ')[1];
    console.log(token);

    //error 403 (not found) sent
    if(!token) return res.sendStatus(403); 
    
    //if token exists, let's verify it. need to match token + our secret string (would usually hide the secret string in a .env)
    // if first 2 args are good, then callback fxn fires
    jwt.verify(token, 'tacos are good', (err, user)=> {
        if(err) return res.sendStatus( 403);

        // add property called user to the request object
        console.log({user})
        req.user = user;
    });

    next();
}

// applies cors to every route
app.use(cors());

//when we create middleware fxns, they get the 3 parameters
//we want this function to run on every single route (unlike authenticateToken)
app.use(function(req, res, next) {
    //allow this url to access
    res.setHeader(
        "Access-Control-Allow-Origin",
        "http://localhost:3000"
    );

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "POST");

    //request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    //this is for setting cookies
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

//need to add body parser as middlerware (body parser is part of express now, so don't need to install separately)
app.use(express.json());

//add app.use middleware to get call userRoutes (does the beginning of route, then in users.js routes - it's the rest of the route, function). So if they all have users, can put users here and shorten it in users.js routes
app.use("/users", authenticateToken, userRoutes);
app.use("/todos", authenticateToken, todosRoutes);
app.use("/signup", signupRoutes);
app.use("/signin", signinRoutes)

//route is the '/', and ()=>{} function is the controller
app.get('/', (req,res)=> {
    res.json({message: "Hello Universe!"})

});



app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));

