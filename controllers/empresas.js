const express = require('express');
const router = express.Router();
const cn = require('../conexion.js');

const getPeticionEmpresa = (req,res) => {
    res.render('empresas/registros_empresa',{
        title: 'Bienvenido'
    });
}

const getGracias = (req,res) => {
    res.render('empresas/gracias', {
        title:'gracias por tu solicitud'
    })
}

const postRegistrarEmpresas = (req,res) => {
    const {nombre,correo,titular} = req.body
    q = 'insert into peticiones(correo, nombre, titular) value(?,?,?)'
    cn.query(q, [correo, nombre, titular], (err,row,fil) => {
        if(!err){
            res.redirect('/gracias')
        } else {
            res.redirect('/peticion-empresa')
        }
    })
}

const empresas = {
    getPeticionEmpresa,
    getGracias,
    postRegistrarEmpresas
}
module.exports = empresas