module.exports = {
    register : async(req,res)=>{
        try {
            //metodo

            




        } catch (error) {
            return res.json({
                error:{
                    status:200,
                    detail:'error en la peticion al servidor',
                    error
                }
            })
        }
        
    },
    login : async(req,res)=>{
        try {
            //metodo
        } catch (error) {
            return res.json({
                error:{
                    status:200,
                    detail:'error en la peticion al servidor',
                    error
                }
            })
        }

    },
    recovery : async(req,res)=>{
        try {
            //metodo
        } catch (error) {
            return res.json({
                error:{
                    status:200,
                    detail:'error en la peticion al servidor',
                    error
                }
            })
        }
    },
    delete: async(req,res)=>{
        try {
            //metodo
        } catch (error) {
            return res.json({
                error:{
                    status:200,
                    detail:'error en la peticion al servidor',
                    error
                }
            })
        }

    },   

};