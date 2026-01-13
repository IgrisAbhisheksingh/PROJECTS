export const createUser = async(req,res)=>{
    try{
       const data = req.body;
       console.log(data);
       res.json({message: "Request Received"})
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}

export const login = async(req,res)=>{
    try{
       const data = req.body;
       console.log(data);
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
}