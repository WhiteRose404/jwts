const mongose=require("mongoose");
const Schema=new mongose.Schema({username:String,password:String});
const mymodel=mongose.model("JWT",Schema);
module.exports=mymodel;

