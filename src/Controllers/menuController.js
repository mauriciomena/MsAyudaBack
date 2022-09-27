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

    listTreeMenu: (req, res) => {  
      
       //lista de eventos
       console.log('------------------------------ listTreeMenu ------------------------------');
      //  buscador con LIKE para cuando se ponga lento
      //  db.Vw_menu.findAll({
      //   where: { opcion: { [Op.like]: '%' + req.body.busco + '%' } },
      //   offset: 10,
      //   limit: 10
      // }

        db.Vw_menu.findAll()
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
    vinculaDocConMenu: async (req,res)=>{

      console.log('-----------------------vinculaDocConMenu------------------------');
      
     console.log(req.body);
      try {
        let vinc = await db.MsAyudaMenu.create({
          id: req.body.idAyuda,
          id_menu: req.body.idOpcion
        })
        res.json({
          meta:{
            status: 200,
            total : vinc.length,
          },
          data: vinc   })   
        
      } catch (error) {
         
        console.log(error);
        res.json({
          status : 500,
          detail : 'Error interno en la peticion de la información'
        })
      }  
      console.log('-----------------------vinculaDocConMenu------------------------');
    },
    
    findEventos: async (req,res)=>{

      //lista de eventos
      console.log('------------------------------ findeventos ------------------------------');
      console.log(req.body);
      try {
        
        //const datoMenu = await db.Menu.findByPk(req.params.id);
        //const buscar = req.params.buscar       

        const eventos = await db.MsAyuda.findAll( {
            where: {
              denominacion: {
                [Op.like]: '%'+req.body.buscar+'%'
              }
            },
            limit: 20
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
    catalog: async (req,res)=>{

      //lista de eventos
      console.log('------------------------------ catalog ------------------------------');
      console.log(req.body);
      try {
        
        //const datoMenu = await db.Menu.findByPk(req.params.id);
        //const buscar = req.params.buscar       

        const eventos = await db.MsAyuda.findAll( {
            limit: 35,
            order: [
              ['id', 'DESC'],
            ]
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

        const evento    = await db.MsAyuda.findAll( {
          include :['archivos'],
            where: {
              [Op.and]: [
                { id: req.params.id}
              ]
            }
          })

        const opcMenu  = await db.MsAyudaMenu.findAll( {
          include :['vw_menu'],
            where: {
              [Op.and]: [
                { id: req.params.id}
              ]
            }
          })
        
        
        Promise.all(([valoresPosibles,evento,opcMenu]))
          .then(([data,dataevento,opcionesMenu])=>{
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
            
          let ayuda = {
            id: dataevento[0].id,
            denominacion: dataevento[0].denominacion,
            destalle: dataevento[0].destalle ,
            etiquetas: dataevento[0].etiquetas,
            palabra_clave: dataevento[0].palabra_clave,
            tipo: dataevento[0].tipo,
            imgurl: dataevento[0].archivos[0]? `http://${req.headers.host}/files/${dataevento[0].archivos[0].nombre}` :'',
            opciones: opcionesMenu
            

          }
          res.json({
            
            meta:{
              status: 200,
              total : datavalor.length
            },
            evento: ayuda,
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
        
        function formatoFecha(fecha, formato) {
          const map = {
              dd: fecha.getDate(),
              mm: fecha.getMonth() + 1,
              yy: fecha.getFullYear().toString().slice(-2),
              yyyy: fecha.getFullYear()
          }
      
          return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
      }
      

        let  fecha = new Date();
        let unaFecha  = formatoFecha(fecha,'yyyy-mm-dd')
        console.log('unaFecha',unaFecha);
        const añoActual = fecha.getFullYear();
        const hoy = fecha.getDate();
        const mesActual = fecha.getMonth() + 1; 
        console.log('fecha',fecha);
        console.log('añoActual',añoActual);
        console.log('hoy',hoy);
        console.log('mesActual', mesActual);

        fecha = new Date(añoActual+'-'+mesActual+'-'+hoy);

        const resultEditValidation = validationResult(req);
        if (resultEditValidation.errors.length > 0) {
          return res.json({
            errors: resultEditValidation.mapped(),
            oldData: req.body
          })
        } else {
          let doc = await db.MsAyuda.create({
              tipo: req.body.tipo,
              denominacion: req.body.titulo,
              destalle:req.body.descripcion,
              etiquetas:req.body.etiquetas
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
                msg: 'imagen actualizada',               
                documento: {
                  id: doc.id,
                  denominacion: doc.denominacion, 
                  destalle:doc.destalle,
                  etiquetas:doc.etiquetas,
                  archivo:`http://${req.headers.host}/files/${arc.nombre}`
                }
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
        console.log(error);
        res.json({
          errors: {
            status : 500,
            detail : 'Error interno en la peticion de la información',
            msg: 'Error al grabar en el servidor'
          }
          
        })
      }
    },
    listDocumentos: async (req, res) => {
      
    },
    delayuda : async (req,res) => {
      //asi hay que buscar para elminar
//       select * from ms_ayuda where id = 158889 ;
// select * from ms_ayuda_menu_general where id = 158889 ;
// select * from ms_ayuda_archivos where id_ayuda = 158889 ;
    }
  };