const Mongodb=require("../db/setup");
const CustomAPIError=require("../errors/custom-error");
const jwt=require("jsonwebtoken");
const dashbord =async (req,res)=>{
	const luckyNumber=Math.floor(Math.random()*999);
	try{
		let token = req.headers.authorization.split(' ')[1];
		const data = jwt.verify(token,process.env.JWT);
		res.status(200).json({msg:`hello ${data.username} your lucky Number is ${luckyNumber}`,secret:"so much better"});
	}catch(err){
		console.log(err);
		throw CustomAPIError("invalide Route ",401);
	}
}
const login=async  (req,res)=>{
	const { username, password } = req.body;
	if(!(username && password)){
		throw new CustomAPIError("wrong password and username",401);
	}
	console.log("pss")
	/*const deleted=await Mongodb.deleteMany({});*/
	const search=await Mongodb.findOne({username,password});
	if(search){
		throw new CustomAPIError("already existe ",401);
	}
	const tokened = jwt.sign({username},process.env.JWT,{expiresIn:"1d"});
	const data = {msg:"ok",token:tokened};
	const datasend = Mongodb.create({username,password});
	res.status(200).json(data);
}


module.exports = {login,dashbord};