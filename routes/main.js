const express=require("express");
const router=express.Router();
const {login,dashbord}=require("../controllers/main");
router.post("/login",login);
router.get("/dashboard",dashbord);

module.exports=router;