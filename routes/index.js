const express = require('express');
const router = express.Router();
const cn = require('../conexion.js');
const usuarios = require('../controllers/usuarios.js');
const empresa = require('../controllers/empresas')
const inicio = require('../controllers/inicio.js');
const { id_usuario } = require('../controllers/usuarios.js');

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

router.post('/compartir-curso',usuarios.postCompartirCursoU)
router.post('/compartir-curso-e',usuarios.postCompartirCurso)

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

router.get('/ofertas-laborales', (req,res) => {
    const q = 'select * from ofertas'
    cn.query(q, (err,row,fil)=>{
        res.render('empresas/irOfertas.ejs',{
            title:'Ofertas Laborales',
            data: row
        })
    })
});

router.get('/publicar-ofertas-laborales',usuarios.getOfertas)

router.post('/publicar-ofertas-laborales',usuarios.postOfertas)

router.get('/eliminar-oferta-laboral/:id',(req,res)=>{
    const {id} = req.params
    q = 'delete from ofertas where id= ?'
    cn.query(q,[id],(err,row,fil)=>{
        if(!err){
            res.redirect('/publicar-ofertas-laborales')
        }else{
            res.redirect('/publicar-ofertas-laborales')
            console.log(err)
        }
    }) 
})

router.get('/publicar-proyecto-e', usuarios.getProyectos)
router.post('/publicar-proyecto-e',usuarios.postProyectos)

router.get('/proyectos-por-empresas',(req, res)=>{
    q = 'select * from proyectosE'
    cn.query(q, (err,row,fil) => {
        res.render('secciones/proyectos_publicados',{
            title:'proyectos de empresas',
            data:row
        })
    })
})

router.get('/eliminar-proyecto-e/:id',(req, res) => {
    const { id } = req.params
    q = 'delete from proyectosE where id = ?'
    cn.query(q,[id],(err,row,fil)=>{
            if(!err){
                res.redirect('/publicar-proyecto-e')
            }else{
                console.log(err)
                res.redirect('/publicar-proyecto-e')
                
            }
    })
})

router.get('/publicar-proyecto', usuarios.getProyectosU)
router.post('/publicar-proyecto',usuarios.postProyectosU)

router.get('/proyectos',(req, res)=>{
    q = 'select * from proyectos'
    cn.query(q, (err,row,fil) => {
        res.render('secciones/proyectos_publicados',{
            title:'proyectos de usuario',
            data:row
        })
    })
})

router.get('/eliminar-proyecto/:id',(req, res) => {
    const { id } = req.params
    q = 'delete from proyectos where id = ?'
    cn.query(q,[id],(err,row,fil)=>{
            if(!err){
                res.redirect('/publicar-proyecto-e')
            }else{
                console.log(err)
                res.redirect('/publicar-proyecto-e')
            }
    })
})

//empresas

module.exports = router;