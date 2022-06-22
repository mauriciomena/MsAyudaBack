let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {
    list: (req, res) => {
        console.log('list');
        //db.Menu.findAll( { offset: 15, limit: 15 })
        db.Menu.findAll()
          .then((menu) => {
            //res.render("products/productList.ejs", { products });
            //res.json(menu)
            res.json({
              meta:{
                status: 200,
                total : menu.length,
                url : `http://${req.headers.host}/menu`
              },
              data: menu
          })          
        }).catch((error) => res.send(error));
    },
    art: (req, res) => {
      console.log('articulos');
      db.Articulo.findAll( )
        .then((menu) => {
          //res.render("products/productList.ejs", { products });
          //res.json(menu)
          res.json({
            meta:{
              status: 200,
              total : menu.length,
              url : `http://${req.headers.host}/menu/articulos`
            },
            data: menu
        })          
      }).catch((error) => res.send(error));
  }
  };