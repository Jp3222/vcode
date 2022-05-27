const express = require('express')
const router = express.Router();
const my = require('mysql')
const cn = require('../conexion.js');
const q = require('../Queys');
function getUsuario(req,res, next) {
    res.render('login',{
        title: 'Inicio de sesion'
    })
}

function getConsulta(req,res,next){
    cn.query(q.actualizar('usuarios', 'correo && contra',''))
}




const usuarios = {
    getUsuario
}

module.exports = usuarios;