const express = require("express");
const app = express();

const pool = require("./sql/connections")
const PORT = process.env.PORT || 5000;

//need to add body parser as middlerware (body parser is part of express now, so don't need to install separately)
app.use(express.json());

//route is the '/', and ()=>{} function is the controller
app.get('/', (req,res)=> {
    res.json({message: "Hello Universe!"})

});

//get list of users
app.get('/users', (req,res)=> {
    pool.query("SELECT * FROM users", function(err, rows, fields) {
    // Connection is automatically released when query resolves
    res.json(rows)
 })

});

// get - user by id
app.get('/users/:id', (req,res)=> {
    // console.log(req.params.id)
    const {id} = req.params
    pool.query(`SELECT * FROM users WHERE id =${id}`, function(err, rows, fields) {
    
    res.json(rows)
 })

});

app.post('/users/', (req,res)=> {
    console.log(req.body)
    // const {id} = req.params
    pool.query(`INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)`, [null, req.body.name, req.body.email, req.body.password], function(err, row, fields) {
    
    res.json(row)
 })
});

app.put('/users/:id', (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`UPDATE users SET ? WHERE id= ?`, 
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [req.body, id],
    function(err, rows, fields) {
    
    res.json(rows)
 });
});


app.delete('/users/:id', (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`DELETE FROM users WHERE id= ?`, 
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [id],
    function(err, rows, fields) {
    
    res.json(rows)
 });
});

app.listen(PORT, ()=> console.log(`Listening @ http://localhost:${PORT}`));



// app.post('/users/', (req,res)=> {
//     console.log(req.body)
//     // const {id} = req.params
//     pool.query(`INSERT INTO users(id, name, email, password) VALUES (null, ${req.body.name}, ${req.body.email}, ${req.body.password})`, function(err, row, fields) {
    
//     res.json(row)
//  })
// });

