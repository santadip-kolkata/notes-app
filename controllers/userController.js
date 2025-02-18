const authService = require("../services/authService");


const login =async (req,res)=>
{
    const user = req.body;
    const response = await authService.login(user);
    if(response.status==200 && response.message=='success')
    {
        res.cookie("username",response.username,{ httpOnly: true, secure: false, sameSite: "Strict"});
        res.cookie("token", response.token, { httpOnly: true, secure: false, sameSite: "Strict" });
    }
    return res.status(response.status).json({message:response.message,status:response.status});
}

const register = async (req,res)=>{
    try{
        const user = req.body;
        const response = await authService.register(user);
        if(response==null)
        {
            return res.status(500).json({error:"some error occured"});
        }
        return res.status(response.status).json(response.message);
    }
    catch(error){
        return res.status(500).json({error});
    }
        
}

module.exports={
    login,
    register
}