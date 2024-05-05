const express = require("express");
const router = express.Router();
const db= require("./DBconnect.js");
const cors=require(cors);
db();


router.get("/home_search",async(req,res)=>{
  try{
      const page=parseInt(req.query.page)-1||0;
      const limit=parseInt(req.query.limit)||5;
      const search=req.query.search||"";
      let services=req.query.services||"All";
      //let sort=req.query.sort||"loc";
      const ServicesTypes=[
        "plumbing",
        "electrician",
      ]; 
      sercices==="ALL"
      services === "All"
        ? (services = [...ServicesTypes])
        : (services = req.query.services.split(","));
      // req.query.sort? (sort = req.query.sort.split(",")) : (sort = [sort]);
      // req.query.sort
      //   ? (sort = req.query.sort.split(",")) // If sort query parameter exists, split it by comma and assign to sort
      //   : (sort = [sort]);

        const search_service = await db.find({ name: { $regex: search, $options: "i" } })
          .where("services")
          .in([...services])
          .sort(sortBy)
          .skip(page * limit)
          .limit(limit);
          
          const total = await db.countDocuments({ 
            services:{$in:[...services]},
            name:{$regex:search,$options:"i"},
          })
          const response={
            error:false,
            total,
            page:page+1,
            limit,
            services:ServicesTypes,
            name,
          };
    }catch(err){
    console.log(err);
    res.status(500).json({error:true,message:"Internal server error"})
  }

});


module.exports = { router };