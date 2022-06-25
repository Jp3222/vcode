const express = require('express');
const router = express.Router();
const cn = require('../conexion.js');

var id_usuario

const getLogin = (req, res) => {
    res.render('login', {
        title:'Inicio de sesion'
    })
}

const getEmpresa = (req, res) => {
    res.render('empresas/panel_empresa',{
        title:'Bienvenido',
        id:id_usuario
    })
}

const getPanel=(req, res) => {
    res.render('usuarios/panel_usuario', {
        title:'Bienvenido',
        id:id_usuario  
    })
}

const getRegistro = (req,res) => {
    res.render('usuarios/registro_usuarios', {
        title:'Mi nueva cuenta'
    })
}

const postBuscarUsuario = (req, res) => {
    const {user} = req.body
    const {pass} = req.body
    q = 'select id, usuario, pass, roll from usuarios where usuario=? and pass=?'
    cn.query(q,[user,pass],(err,row,fil) => {       
        if(!err){
          if(row.length > 0){
            id_usuario = row[0].id
            if(row[0].roll == 0){
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
}



const postInsertarUsuario = (req,res) => {
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
}

const getPublicarCurso = (req,res) => {
    q = 'select * from contenido where usuario=?'
    cn.query(q,[id_usuario],(err,row,fil) => {
        if(!err) {
            console.log(row)
            res.render('formularios/subir_curso.ejs', {
                title:'Nuevo curso',
                id:id_usuario,
                data:row
            })
        }
    })
}
const getPublicarCursoE = (req,res) => {
    q = 'select * from contenidoE where usuario=?'
    cn.query(q,[id_usuario],(err,row,fil) => {
        if(!err) {
            console.log(row)
            res.render('formularios/subir_curso_e.ejs', {
                title:'Nuevo curso',
                id:id_usuario,
                data:row
            })
        }
    })
}

const getProyectos = (req,res) => {
    q = 'select * from proyectosE where usuario = ?'
    cn.query(q,[id_usuario],(err,row,fil)=>{
        if (!err) {
            res.render('formularios/subir_proyecto_e',{
                title:'subir proyecto',
                data: row
            })
        }else{
            console.log(err)
        }
    })
}
const postProyectos=(req, res) => {
    const {titulo, rep, des} = req.body
    q = 'select nombre from usuarios where id=?'
    cn.query(q,[id_usuario],(err,row,fil)=>{
        const user = row[0].nombre
        q2 ='insert into proyectosE(titulo,des,usuario,jefe,col,git) values(?,?,?,?,?,?)' 
        col = 'na'
        datos = [titulo,des,id_usuario,user,col,rep]
        cn.query(q2,datos, (err2,row2,fil2) => {
            if(!err2){
                res.redirect('/publicar-proyecto-e')
            }else{
                console.log(err2)
            }
        })
    })
}
const postEliminarProyectos=(req, res) => {
    const { id } = req.param
    q = 'delete proyectosE where id = ?'
    cn.query(q,[id],(err,row,fil)=>{
            if(!err){
                res.redirect('/publicar-proyecto-e')
            }else{
                console.log(err)
                res.redirect('/publicar-proyecto-e')
                
            }
    })
}

const getProyectosU = (req,res) => {
    q = 'select * from proyectos where usuario = ?'
    cn.query(q,[id_usuario],(err,row,fil)=>{
        if (!err) {
            res.render('formularios/subir_proyecto',{
                title:'subir proyecto',
                data: row
            })
        }else{
            console.log(err)
        }
    })
}
const postProyectosU=(req, res) => {
    const {titulo, rep, des} = req.body
    q = 'select nombre from usuarios where id=?'
    cn.query(q,[id_usuario],(err,row,fil)=>{
        const user = row[0].nombre
        q2 ='insert into proyectos(titulo,des,usuario,jefe,col,git) values(?,?,?,?,?,?)' 
        col = 'na'
        datos = [titulo,des,id_usuario,user,col,rep]
        cn.query(q2,datos, (err2,row2,fil2) => {
            if(!err2){
                res.redirect('/publicar-proyecto')
            }else{
                console.log(err2)
            }
        })
    })
}
const postEliminarProyectosU=(req, res) => {
    const { id } = req.param
    q = 'delete proyectos where id = ?'
    cn.query(q,[id],(err,row,fil)=>{
            if(!err){
                res.redirect('/publicar-proyecto')
            }else{
                console.log(err)
                res.redirect('/publicar-proyecto')
                
            }
    })
}

const postCompartirCurso=(req,res)=>{
    const{titulo, link, des} = req.body
    q = 'insert into contenidoE(referencia,titulo,des,usuario) values(?,?,?,?)'
    const items = [link,titulo,des,id_usuario]
    cn.query(q,items,(err,row,fil)=>{
        if(!err){
            res.redirect('/publicar-curso-e')
        }else{
            console.log(err)
            res.redirect('/publicar-curso-e')
        }
    })
}
const postCompartirCursoU=(req,res)=>{
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
}
const getOfertas=(req, res)=>{
    q = 'select * from ofertas where usuario=?'
    cn.query(q,[id_usuario], (err,row,fil) => {
         res.render('formularios/subir_oferta',{
             title:'Ofertas Laborales',
             data:row
         })
    })
 }

 const postOfertas=(req,res)=>{
    const {titulo,des} = req.body
    const q = 'select nombre from usuarios where id=?'
    cn.query(q,[id_usuario],(err,row,fil)=>{
       if(!err){
            const nom = row[0].nombre
            q2 = 'insert into ofertas(usuario,titulo,des,empresa) values(?,?,?,?)'
            datos = [id_usuario,titulo,des,nom]
            cn.query(q2,datos,(err2,row2,fil2)=>{
                if(!err){
                    res.redirect('/publicar-ofertas-laborales')
                }else{
                    res.redirect('/publicar-ofertas-laborales')
                    console.log(err2)
                }
            })
       }else{
           console.log(err)
       }
    })
}
const usuarios = {
    getLogin,
    getEmpresa,
    getPanel,
    getRegistro,
    getPublicarCurso,
    getPublicarCursoE,
    getProyectos,
    getOfertas,
    postOfertas,
    postEliminarProyectos,
    postProyectos,
    postBuscarUsuario,
    postInsertarUsuario,
    postCompartirCurso,
    postCompartirCursoU,
    getProyectosU,
    postProyectosU,
    postEliminarProyectosU,
    id_usuario
}
module.exports = usuarios;