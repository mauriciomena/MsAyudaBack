let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        console.log('list');
        db.TareasDiarias.findAll( { offset: 15, limit: 15 })
          .then((tareas) => {
            //res.render("products/productList.ejs", { products });
            //res.json(tareas)
            res.json({
              meta:{
                status: 200,
                total : tareas.length,
                url : `http://${req.headers.host}/tareas`
              },
              data: tareas
          })          
        }).catch((error) => res.send(error));
    },
    art: (req, res) => {
      console.log('articulos');
      db.Articulo.findAll( )
        .then((tareas) => {
          //res.render("products/productList.ejs", { products });
          //res.json(tareas)
          res.json({
            meta:{
              status: 200,
              total : tareas.length,
              url : `http://${req.headers.host}/tareas/articulos`
            },
            data: tareas
        })          
      }).catch((error) => res.send(error));
  },
  senasa: (req, res) => {
    console.log(req);
    
    try {
      const bodyrec =  req.body
      const paramsrec =  req.query
      
      console.log(bodyrec);
      // return res.json({bodyRecibido: JSON.stringify(bodyrec),
      // parametrosRecibidos: JSON.stringify(paramsrec)})

      res.json({
         bodyRecibido: bodyrec,
         parametrosRecibidos: paramsrec
        });
        
      
    } catch (error) {
      console.log(error);
    }   
},
  };