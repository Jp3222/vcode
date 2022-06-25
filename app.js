const express = require('express');
const app = express();
const path = require('path')
const router = require('./routes/index.js') 
const bodyParse=require('body-parser')

app.set('port', process.env.PORT || 4000)
app.set('views',path.join(__dirname,'views'))

app.set('view engine', 'ejs')

//configuraciones
app.use((req,res,next)=>{
    console.log(`${req.url}-${req.method}`)
    next()
})

//mideware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
//rutas
app.use(router)

// static files
app.use(express.static(path.join(__dirname,'public')))

app.listen(app.get('port'), () => {
     console.log("servidor iniciado en el puerto", app.get('port'));
})