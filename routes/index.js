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

router.post('/login-usuario',(req,res)=>{
    const {user} = req.body;
    const {pass} = req.body;
    const q = 'select usuarios, contra from usuarios where usuarios=? and contra=?';
    cn.query(q, [user,pass], (err,row,fiel)=>{
        if(!err){
            console.log('consulta hecha',row);
            if(row.length > 0 && user===row[0].usuarios&&pass===row[0].contra){
                res.render('panel_usuario',{
                    title:'Bienvenido ' + user + '!'
                })
            }else{
                console.log('todo no nice')
            }
            
        }else{
            console.log(err)
            res.render('login',{
                title:'Inicio de sesion'
            })
        }
    })
    
});

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

router.get('/registrarse',(req,res)=>{
    res.render('registro',{
        title:'Registrarse'
    })
})

router.get('/empresa',(req,res)=>{
    res.render('registros_empresa',{
        title:'Contacto para empresas'
    })
})

router.get('/panel-usuario',(req,res)=>{
    res.render('panel_usuario',{
        title:'Usuario'
    })
})



module.exports = router;