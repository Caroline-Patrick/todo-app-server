const express = require("express");
const app = express();
const jwt =require("jsonwebtoken");
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
        if(err) return res.sendStatus(403);

        // add property called user to the request object
        console.log({user})
        req.user = user;
    });

    next();
}

//need to add body parser as middlerware (body parser is part of express now, so don't need to install separately)
app.use(express.json());

//add app.use middleware to get call userRoutes (does the beginning of route, then in users.js routes - it's the rest of the route, function). So if they all have users, can put users here and shorten it in users.js routes
app.use("/", authenticateToken, userRoutes);
app.use("/", authenticateToken, todosRoutes);
app.use("/", signupRoutes);
app.use("/", signinRoutes)

//route is the '/', and ()=>{} function is the controller
app.get('/', (req,res)=> {
    res.json({message: "Hello Universe!"})

});



app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));

