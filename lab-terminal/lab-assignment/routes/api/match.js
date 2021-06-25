const express = require('express');
let router = express.Router();

var {product, product} = require("../../models/product");
var {match} = require("../../models/match");
const validateProduct = require('../../middlewares/validateProducts');
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");



// get all products 
router.get("/",auth,async(req,res) =>{

    let matches = await match.find();
    
    return res.send(matches);
});
// get single products
router.get("/:id",async(req,res) =>{
    try {
        let single_prod = await product.findById(req.params.id);
        if(!single_prod) return res.status(400).send("product with given id is not present");
        return res.send(single_prod);
    } catch (err) {
        return res.status(400).send("invalid id");
    }
});

router.put("/:id",validateProduct,async(req,res)=>{
    let updated_product  = await product.findById(req.params.id);
    updated_product.name = req.body.name;
    updated_product.price = req.body.price;
    await updated_product.save();
    return res.send(updated_product);
});

router.delete("/:id",async(req,res)=>{
    let del_product  = await product.findByIdAndDelete(req.params.id);
    return res.send("product deleted");
});
// post match
router.post("/",async(req,res)=>{
    let new_match = new match();
    new_match.team1 = req.body.team1;
    new_match.team2 = req.body.team2;
    new_match.city = req.body.city;
    new_match.datetime = req.body.datetime;
    await new_match.save();
    return res.status(200).send(new_match);
});

module.exports = router;