const express = require('express');
const router = express.Router();
const cn = require('../conexion.js');
//

const getInicio=(req,res,next)=>{
    res.render('index',{
        title:'inicio'
    })
}

const getConocenos = (req,res,next) => {
    res.render('inicio/conocenos',{
        title:'conocenos'
    })
}

const getAprendeV = (req, res) => {
    cn.query('select * from contenido',(err,row,fiels)=>{
        if(!err){
            res.render('inicio/aprende', {
                title:'aprende con videos',
                data: row
            })
        }else{
            console.log(err)
        }
    })
}

const getAprendeL = (req, res)=>{
    res.render('aprende_libros', {
        title:'aprende con libros'
    })    
};

const inicio={
    getInicio, getConocenos, getAprendeV, getAprendeL
}

module.exports = inicio;