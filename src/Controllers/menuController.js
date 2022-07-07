let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    list: (req, res) => {        
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
    findOption: async (req,res)=>{
      
      try {

        db.MsAyudaMenu.findAll( {
              include :['msayuda'],
              where: {
                [Op.and]: [
                  { id_menu: req.params.id}
                ]
              }
            }).then((data)=>{
              res.json({
                    meta:{
                      status: 200,
                      total : data.length,
                      url : `http://${req.headers.host}/menu/${req.params.id}`
                    },
                    data: data
                    })
            })
        
      } catch (error) {
        
        console.log(error);
        res.json({
          status : 500,
          detail : 'Error interno en la peticion de la información'
        })
      }
    }
    
  };