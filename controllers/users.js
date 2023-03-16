// controllers folder will take all the functions from users routes
const pool = require('../sql/connections')

const list =(req,res)=> {
    pool.query("SELECT * FROM users", function(err, row, fields) {
    res.json(row)
 })
};

const show = (req,res)=> {
    // console.log(req.params.id)
    const {id} = req.params
    pool.query(`SELECT * FROM users WHERE id =${id}`, function(err, row, fields) {
    
    res.json(row)
 })

};

const create = (req,res)=> {
    console.log(req.body)
    // const {id} = req.params
    pool.query(`INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)`, [null, req.body.name, req.body.email, req.body.password], function(err, row, fields) {
    
    res.json(row)
 })
};

const update =  (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`UPDATE users SET ? WHERE id= ?`, 
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [req.body, id],
    function(err, row, fields) {
    
    res.json(row)
 });
};

const remove = (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`DELETE FROM users WHERE id= ?`, 
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [id],
    function(err, row, fields) {
    res.json(row)
 });
};


module.exports = { 
    list, 
    show, 
    create, 
    update, 
    remove
};




