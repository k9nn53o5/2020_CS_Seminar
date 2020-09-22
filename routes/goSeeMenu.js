var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var CartDao = require("../model/Cart").CartDao;

router.get('/',function(req,res){
    console.log("load to goSeeMenu");
    //console.log(req.params.id);
    
    RestaurantDao.findById(req.params.id,function(restaurant){
        if(restaurant == undefined){
            res.send(req.params.id);
            return;
        }
        CustomerDao.cName2cId(req.params.cname,function(cId){
            if(cId == undefined){
                console.log("no such cId");
                //res.send(req.params.id);
                return;
            }

            MenuDao.findByRestId(req.params.id,function(foods){
                if(foods == undefined){
                    console.log("no such foods");
                    //res.send(req.params.id);
                    return;
                }
                
                //CartDao.delAllIllegalFood()
                CartDao.findByCId(cId,function(items){
                    if(items == undefined){
                        console.log("no such items");
                        //res.send(req.params.id);
                        return;
                    }

                    res.render('showCusResMenu',{
                        URL1: req.params.cname,
                        cId: cId,
                        restaurant: restaurant,
                        foods: foods,
                        cname:req.params.cname,
                        items:items,
                        msg:''
                    });
                });
            });
        });
    });

    
})
module.exports = router;