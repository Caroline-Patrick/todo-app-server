const bcrypt =require('bcrypt');
const pool = require('../sql/connections')


//signup fxn must be asynchronous, because bcrypt returns a promise

const signup = async (req, res) => {
    const{name, email, password} =req.body;
    

    const hashedPassword = await bcrypt.hash(password, 10);

   
    pool.query(`INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)`, 
    [null, name, email, hashedPassword], 
    function(err, row, fields) {
        res.json(row)
     });
}

module.exports = {
    signup
}