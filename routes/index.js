const express = require('express');
const router = express.Router();
const cn = require('../conexion.js');
//
const usuarios = require('../controllers/usuarios.js');
const inicio = require('../controllers/inicio.js');
const { redirect } = require('express/lib/response');
let id_usuario;
//Metodos get
//Usuario
router.get('/login',(req, res)=>{
    res.render('login', {
        title:'Inicio de sesion'
    })
});

router.get('/panel-usuario',(req, res)=>{
    res.render('usuarios/panel_usuario', {
        title:'Bienvenido',
        id:id_usuario  
    })
});
router.get('/panel-empresa', (req,res) => {
    res.render('empresas/panel_empresa',{
        title:'Bienvenido',
        id:id_usuario
    })
})
router.get('/registrarse',(req,res)=>{
    res.render('usuarios/registro_usuarios', {
        title:'Mi nueva cuenta'
    })
})

router.post('/buscar-usuario',(req, res)=>{
    const {user} = req.body
    const {pass} = req.body
    q = 'select id, usuario, pass, roll from usuarios where usuario=? and pass=?'
    cn.query(q,[user,pass],(err,row,fil) => {       
        if(!err){
          if(row.length > 0){
            id_usuario = row[0].id
            if(row.roll == 0){
                res.redirect('/panel-usuario')
            }else{
                res.redirect('/panel-empresa')
            }
          }else{
            res.redirect('/login') 
          }
        }else{
            console.log(err)
            res.redirect('/login') 
        }
    })
})

router.post('/nuevo-usuario', (req,res) => {
    const {user}=req.body
    const {pass}=req.body
    const {nom}=req.body
    const roll = 0
    const q = 'insert into usuarios(usuario, pass, nombre, roll) values(?,?,?,?)'
    cn.query(q,[user,pass,nom,roll],(err,row,fil)=>{
        if(!err) {
            res.redirect('login')
        }else{
            res.redirect('/nuevo-usuario')
        }
    })
})
//
router.get('/publicar-curso',(req,res)=>{
    q = 'select * from contenido where usuario=?'
    cn.query(q,[id_usuario],(err,row,fil)=>{
        if(!err){
            console.log(row)
            res.render('formularios/subir_curso.ejs',{
                title:'Nuevo curso',
                id:id_usuario,
                data:row
            })
        }
    })
    
})
router.post('/compartir-curso',(req,res)=>{
    const{titulo, link, des} = req.body
    q = 'insert into contenido(referencia,titulo,des,usuario) values(?,?,?,?)'
    const items = [link,titulo,des,id_usuario]
    cn.query(q,items,(err,row,fil)=>{
        if(!err){
            res.redirect('/publicar-curso')
        }else{
            console.log(err)
            res.redirect('/publicar-curso')
        }
    })
})
router.get('/eliminar-video/:id',(req,res)=>{
    const {id} = req.params;
    q = 'delete from contenido where id=?'
    cn.query(q,[id],(err,row,fil)=>{
        if(!err) {
            res.redirect('/publicar-curso')
        }
    })
})

//Inicio
router.get('/',inicio.getInicio);
router.get('/conocenos',inicio.getConocenos)
router.get('/aprende',inicio.getAprendeV);
router.get('/libros', inicio.getAprendeV);

router.get('/ofertas-laborales',(req,res)=>{
    res.render('empresas/irOfertas.ejs',{
        title:'Ofertas Laborales'
    })
});
//empresas

module.exports = router;