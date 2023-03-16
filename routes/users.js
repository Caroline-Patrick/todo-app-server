const express =require('express');
const router = express.Router();


//get list of users
router.get('/users');

// get - user by id
router.get('/users/:id');

router.post('/users/');

router.put('/users/:id', (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`UPDATE users SET ? WHERE id= ?`, 
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [req.body, id],
    function(err, row, fields) {
    
    res.json(row)
 });
});


router.delete('/users/:id', (req,res)=> {
    // console.log(req.params.id)
   const {id} = req.params;

    pool.query(`DELETE FROM users WHERE id= ?`, 
    //put whatever updates that come in from req.body; could be 1 or all (i.e.  email, name, etc.) where id=id coming in
    [id],
    function(err, row, fields) {
    res.json(row)
 });
});

module.exports = router;