// controllers folder will take all the functions from users routes
const pool = require('../sql/connections')

// const list =(req,res)=> {
//     pool.query("SELECT * FROM todos", function(err, row, fields) {
//     res.json(row)
//  })
// };

//get list of todos for specific user
const list =(req,res)=> {
    // console.log('req user: '+ req.user);
    const {id} = req.user;
    console.log(id)
    pool.query(
        `SELECT * FROM todos WHERE user_id =${id}`, 
        function(err, row, fields) {
    res.json(row)
 });
};

const show = (req,res)=> {
    // console.log(req.params.id)
    const {id} = req.params
    pool.query(`SELECT * FROM todos WHERE user_id =${id}`, function(err, row, fields) {
    
    res.json(row)
 })

};

const create = (req,res)=> {
    // console.log(req.body)
    // const {id} = req.params
    pool.query(`INSERT INTO todos(id, todo, user_id) VALUES (?, ?, ?)`, [null, req.body.todo, req.body.user_id], function(err, row, fields) {
    
    res.json(row)
 })
};

const update =  (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`UPDATE todos SET ? WHERE user_id= ?`, 
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [req.body, id],
    function(err, row, fields) {
    
    res.json(row)
 });
};

const remove = (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`DELETE FROM todos WHERE user_id= ?`, 
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




