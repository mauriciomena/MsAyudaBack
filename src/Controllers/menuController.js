const { promiseImpl } = require('ejs');
let db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    list: (req, res) => {   
      //Lista de Menu completo
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
      //lista de eventos
      try {

        const datoMenu = await db.Menu.findByPk(req.params.id);
        const eventos = await db.MsAyudaMenu.findAll( {
          include :['msayuda'],
            where: {
              [Op.and]: [
                { id_menu: req.params.id}
              ]
            }
          })

        Promise.all(([datoMenu,eventos]))
          .then(([datamMenu,data])=>{
            res.json({
              meta:{
                status: 200,
                total : data.length,
                url : `http://${req.headers.host}/menu/${req.params.id}`
              },
              opcion: { ... datamMenu },
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
    },
    getValores: async (req,res)=>{
      //lista de valores de eventos
      try {
        const valoresPosibles = await db.MsAyudaValoresPosibles.findAll( {
            where: {
              [Op.and]: [
                { id_ayuda: req.params.id}
              ]
            }
          });

        const evento = await db.MsAyuda.findByPk(req.params.id ) ;

        Promise.all(([valoresPosibles,evento]))
          .then(([data,dataevento])=>{
          res.json({
            meta:{
              status: 200,
              total : data.length,
              url : `http://${req.headers.host}/menu/evento/${req.params.id}`
            },
            evento: dataevento,
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

