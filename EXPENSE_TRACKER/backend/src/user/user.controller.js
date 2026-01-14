import Usermodel from "./user.model.js";

export const createUser =async (req,res) =>{
    try{
        const data =req.body;
         const user =new Usermodel(data);
         await user.save();
         res.json(user);

    }

    catch(err)
    {
        res.status(500).json({message : err.message});
    }
}


export const login =async (req,res) =>{
    try{
        const data =req.body;
        console.log(data);

    }

    catch(err)
    {
        res.status(500).json({messaage : err.message});
    }
}