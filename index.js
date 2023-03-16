const express = require("express");
const app = express();
const pool = require("./sql/connections")
const userRoutes = require("./routes/users")
const todosRoutes = require("./routes/todos")

const PORT = process.env.PORT || 5000;

//need to add body parser as middlerware (body parser is part of express now, so don't need to install separately)
app.use(express.json());

//add app.use middleware to get call userRoutes (does the beginning of route, then in users.js routes - it's the rest of the route, function). So if they all have users, can put users here and shorten it in users.js routes
app.use("/", userRoutes);
app.use("/", todosRoutes);

//route is the '/', and ()=>{} function is the controller
app.get('/', (req,res)=> {
    res.json({message: "Hello Universe!"})

});



app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));

