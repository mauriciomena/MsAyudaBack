let db = require('../database/models');
const Op = db.Sequelize.Op;
const {	validationResult } = require('express-validator');

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
    findEventos: async (req,res)=>{

      //lista de eventos
      console.log('------------------------------ findeventos ------------------------------');
      console.log(req.params.bus);
      try {
        
        //const datoMenu = await db.Menu.findByPk(req.params.id);
        //const buscar = req.params.buscar       

        const eventos = await db.MsAyuda.findAll( {
            where: {
              denominacion: {
                [Op.like]: '%'+req.params.bus
              }
            }
          })

        Promise.all(([eventos]))
          .then(([data])=>{
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
            let datavalor = []


            data.map(val=>{
                datavalor.push({
                  id: val.id,
                  id_ayuda: val.id_ayuda,
                  valor: val.valor,
                  denominacion_valor: val.denominacion_valor,
                  imgurl:  val.imagen ? `http://${req.headers.host}/images/${val.imagen}` :''
                 })                 
            });

          console.log(datavalor);
          res.json({
            
            meta:{
              status: 200,
              total : datavalor.length
            },
            evento: dataevento,
            data: datavalor
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

    upImagenValoresPosibles: async (req, res) => {
      console.log('update id',req.body.id);
      try {
        const resultEditValidation = validationResult(req);
        if (resultEditValidation.errors.length > 0) {
          return res.json({
            errors: resultEditValidation.mapped(),
            oldData: req.body
          })
        } else {
          
          db.MsAyudaValoresPosibles.update({ imagen: req.file.filename }, {
            where: {
              id: req.body.id
            }
          })
          return res.json({
            errors:{
              msg: 'imagen actualizada'
            }
          })
        }
      } catch (error) {
        res.json(error);
      }
    },
    addDocumentos: async (req, res) => {
      
      try {
        const resultEditValidation = validationResult(req);
        if (resultEditValidation.errors.length > 0) {
          return res.json({
            errors: resultEditValidation.mapped(),
            oldData: req.body
          })
        } else {
          let doc = await db.MsAyuda.create({
              tipo: 'INT',
              denominacion: req.body.titulo,
              destalle:req.body.descripcion,
              etiquetas:req.body.etiquetas,
            })
                    
          let arc = await db.Archivos.create({
           nombre: req.file.filename ,
           extension: '.pdf'
          })
          let rel = await db.MsAyudaArchivos.create({
            id_ayuda: doc.id,
            id_archivo: arc.id,
           })
           
          if (rel.id > 0 ){
            return res.json({
              errors:{
                msg: 'imagen actualizada'
              }
            })
          } else{
            return res.json({
              errors:{
                msg: 'Ocurrió un error al grabar el archivo'
              }
            })
          }
        }
      } catch (error) {
        res.json(error);
      }
    },
    listDocumentos: async (req, res) => {
      
    }
  };