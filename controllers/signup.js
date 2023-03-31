const bcrypt = require("bcrypt");
const pool = require("../sql/connections");

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      `INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)`,
      [null, name, email, hashedPassword],
      function (err, row, fields) {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Internal server error" });
        }
        res.json(row);
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
};

// const bcrypt =require('bcrypt');
// const pool = require('../sql/connections')


// //signup fxn must be asynchronous, because bcrypt returns a promise

// const signup = async (req, res) => {
//     const{name, email, password} =req.body;
    

//     const hashedPassword = await bcrypt.hash(password, 10, function(err, hash){
//         if(err){
//             console.log(err);
//             return;
//         }
//     });

   
//     pool.query(`INSERT INTO users(id, name, email, password) VALUES (?, ?, ?, ?)`, 
//     [null, name, email, hashedPassword], 
//     function(err, row, fields) {
//         res.json(row)
//      });
// }

// module.exports = {
//     signup
// }