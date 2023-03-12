const express = require("express");
const app = express();

const pool = require("./sql/connections")
const PORT = process.env.PORT || 5000;


//route is the '/', and ()=>{} function is the controller
app.get('/', (req,res)=> {
    res.json({message: "Hello Universe!"})

});

app.get('/users', (req,res)=> {
    pool.query("SELECT * FROM users", function(err, rows, fields) {
    // Connection is automatically released when query resolves
    res.json(rows)
 })

});

app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));


