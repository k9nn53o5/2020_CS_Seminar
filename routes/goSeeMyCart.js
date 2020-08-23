var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var CartDao = require("../model/Cart").CartDao;

router.get('/',function(req,res){
    console.log("load to goSeeMyCart");
    //console.log(req.params.id);
    
    RestaurantDao.findById(req.params.id,function(restaurant){
        if(restaurant == undefined){
            res.send(req.params.id);
            return;
        }
        CustomerDao.cName2cId(req.params.cname,function(cId){
            CartDao.findByCId(cId,function(items){
                res.render('showCusTheirCart',{
                    URL1: req.params.cname,
                    items: items,
                    msg:''
                });
            });
        })
        
    });
})

module.exports = router;