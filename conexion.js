const mysql = require('mysql');
const cn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'12345',
    database:'vcode'
});

cn.connect((err)=>{
    if(!err){
        console.log("conexion exitosa")
    }else{
       console.log(err)
    }
});


module.exports = cn;