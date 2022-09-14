// Express
const express = require('express');
const app = express();
const port = process.env.PORT;
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors    = require('cors')


app.use(bodyParser.json());


//Rutas
const mainRoutes        = require('./Routes/mainRoutes');
const tareasRoutes       = require('./Routes/tareas/tareasRoutes');
const menuRoutes       = require('./Routes/menuRoutes');

//Middleware de Session
//const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

// app.use(session({
//     secret: 'verduSecret, shh!',
//     resave: false,
//     saveUninitialized: false,
// }));


app.use(express.static('public'));
app.set('view engine','ejs');
//app.set('views', __dirname + '/src/views');

app.use(cors());
// URL encode para capturar informacion del formulario en req.body
app.use(express.urlencoded({ extended: false }));

// Middlewares nivel APP
app.use(methodOverride('_method'));
//app.use(cookies());
//app.use(userLoggedMiddleware);


// Routes
app.use('/', mainRoutes) ;
app.use('/tareas', tareasRoutes) ;
app.use('/menu', menuRoutes) ;

//app.use((req,res,next)=>{res.status(404).render('not-found')});

// Server
app.listen(port || 8000, () => {
    console.log('msayuda backend '+ port);
});