const express = require('express');
const router = express.Router();
const cn = require('../conexion.js');
const usuarios = require('../controllers/usuarios.js');
const empresa = require('../controllers/empresas')
const inicio = require('../controllers/inicio.js');
const { id_usuario } = require('../controllers/usuarios.js');
const { render } = require('express/lib/response');

//Usuario
router.get('/login',usuarios.getLogin);
router.get('/panel-usuario',usuarios.getPanel);
router.get('/registrarse',usuarios.getRegistro)
router.post('/buscar-usuario', usuarios.postBuscarUsuario)
router.post('/nuevo-usuario', usuarios.postInsertarUsuario)

//Empresas
router.get('/panel-empresa', usuarios.getEmpresa)
router.get('/peticion-empresa',empresa.getPeticionEmpresa)
router.get('/gracias',empresa.getGracias)
router.post('/registrar-empresa', empresa.postRegistrarEmpresas)

//
router.get('/publicar-curso', usuarios.getPublicarCurso)
router.get('/publicar-curso-e',usuarios.getPublicarCursoE)

router.post('/compartir-curso',(req,res)=>{
    const{titulo, link, des} = req.body
    q = 'insert into peticion_contenido(referencia,titulo,des,usuario) values(?,?,?,?)'
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
router.post('/compartir-curso-e',(req,res)=>{
    const{titulo, link, des} = req.body
    q = 'insert into contenidoE(referencia,titulo,des,usuario) values(?,?,?,?)'
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

router.get('/aprendeE', (req, res) => {
    q = 'select * from contenidoE'
    cn.query(q, (err, row, fil) => {
        res.render('empresas/cursos',{
            title:'Cursos por empresas',
            data:row
        })
    })
})

router.get('/ofertas-laborales',(req,res)=>{
    res.render('empresas/irOfertas.ejs',{
        title:'Ofertas Laborales'
    })
});

router.get('/publicar-proyecto-e', usuarios.getProyectos)
router.post('/publicar-proyecto-e',usuarios.postProyectos)
//empresas

module.exports = router;