const express = require('express')
const router = express.Router();
//
const usuarios = require('../controllers/usuarios.js');
const cn = require('../conexion.js');
const q = require('../Queys.js')

router.get('/',(req,res,next)=>{
    res.render('index',{
        title:'inicio'
    })
})

router.get('/login',usuarios.getUsuario);

router.get('/aprende', (req, res)=>{
   
    cn.query('select * from contenido',(err,row,fiels)=>{
        if(!err){
            res.render('aprende', {
                title:'aprende con videos',
                data: row
            });
        }else{
            console.log(err)
        }
    })
});
router.get('/libros', (req, res)=>{
    res.render('aprende_libros', {
        title:'aprende con libros'
    })
    
});
router.get('/conocenos',(req,res,next)=>{
    res.render('conocenos',{
        title:'conocenos'
    })
})




module.exports = router;