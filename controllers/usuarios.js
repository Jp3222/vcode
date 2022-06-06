const express = require('express');
const router = express.Router();
const cn = require('../conexion.js');

const getUsuario = (req,res, next) => {
    res.render('login',{
        title: 'Inicio de sesion',
    })
}

const login = (req,res) => {
}

const getPanel=(req, res) => {
    const {email} = req.body;    
    const {contra} = req.body;    
    const {nombre} = req.body;    
    const {usuario} = req.body;    
    const q = 'insert into usuarios(correo, contra, nombre, usuarios) values(?,?,?,?)';
    cn.query(q, [email,contra,nombre,usuario], (err,row,fil)=>{
        if (!err){
            res.render('login',{
                title: 'Inicio de sesion'
            })
        }else{
            res.render('login',{
                title: 'Inicio de sesion erroneo'
            })    
        }
    })
}

const getRegistro = (req,res)=>{
    res.render('usuarios/registro_usuarios',{
        title:'Registrarse'
    })
}

const getPanel2 = (req,res )=>{
    res.render()
}

function insertar () {
    q = 'insert into usuarios(id, usuario, pass, nombre, roll) values(?, ?, ?, ?)'
    cn.query(q, lista, (err,row,fields)=>{
        if(!err){

        }
    });
}


const usuarios = {
    getUsuario, login, getPanel,getRegistro,getPanel2
}
module.exports = usuarios;