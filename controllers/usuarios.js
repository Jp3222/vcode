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
    q = 'select * from proyectos where usuario = ?'
    cn.query(q,[id_usuario],(err,row,fil)=>{
        if (!err) {
            console.log(row)
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
        q2 ='insert into proyectos(titulo,des,usuario,jefe,col,git) values(?,?,?,?,?,?)' 
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
const usuarios = {
    getLogin,
    getEmpresa,
    getPanel,
    getRegistro,
    getPublicarCurso,
    getPublicarCursoE,
    getProyectos,
    postProyectos,
    postBuscarUsuario,
    postInsertarUsuario,
    id_usuario
}
module.exports = usuarios;