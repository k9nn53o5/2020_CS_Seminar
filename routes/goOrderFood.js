var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var CartDao = require("../model/Cart").CartDao;

// req.params.id have id(rid), cname, orderfoodId
router.get('/',function(req,res){
    console.log("load to goOrderFood");
    //console.log(req.params.id);
    
    RestaurantDao.findById(req.params.id,function(restaurant){
        if(restaurant == undefined){
            res.send(req.params.id);
            return;
        }
        MenuDao.findFoodBydishId(req.params.orderfoodId,function(food){
            //console.log(restaurant);
            //console.log(food);
            res.render('showCusResMenuTheFood-v2',{
                restaurant: restaurant,
                food: food,
                cname:req.params.cname,
                msg:''
            });
        })
    });
}).post('/',function(req,res){
    /*
    RestaurantDao.findById(req.params.id,function(restaurant){
        if(restaurant == undefined){
            res.send(req.params.id);
            console.log("no such restaurant id");
            return;
        }
        MenuDao.findFoodBydishId(req.params.orderfoodId,function(food){
            CustomerDao.cName2cId(req.params.cname,function(cId){
                CartDao.dishIdCanNotBeDuplicateInCart(cId,req.params.orderfoodId,function(result){
                    if(result == "HaveDuplicateData"){
                        res.render('showCusResMenuTheFood-v2',{
                            restaurant: restaurant,
                            food: food,
                            cname:req.params.cname,
                            msg:'it is already in the cart'
                        });
                        return;
                    }
                    else if(result == "OK"){
                        var currentDate = new Date();
                        var time = currentDate.getHours()+":"+currentDate.getMinutes();
                        var date = currentDate.getDate();
                        var month = currentDate.getMonth();
                        var year = currentDate.getFullYear();
    
                        var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
                        CartDao.newGoodToCart([cId,Number(req.params.orderfoodId),Number(req.body.num),0,datetimeStr,null]);
                        res.render('showCusResMenuTheFood-v2',{
                            restaurant: restaurant,
                            food: food,
                            cname:req.params.cname,
                            msg:'add to cart successfully'
                        });
                        return;
                    }
                });
            });
        });
    
   
   //console.log(req.body.num);
   //res.redirect('/cusLogin/req.params.id/req.params.cname');
    });
    */


    //v2
    RestaurantDao.findById(req.params.id,function(restaurant){
    if(restaurant == undefined){
        res.send(req.params.id);
        console.log("no such restaurant id");
        return;
    }
        MenuDao.findFoodBydishId(req.params.orderfoodId,function(food){
            CustomerDao.cName2cId(req.params.cname,function(cId){
                var currentDate = new Date();
                var time = currentDate.getHours()+":"+currentDate.getMinutes();
                var date = currentDate.getDate();
                var month = currentDate.getMonth();
                var year = currentDate.getFullYear();

                var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
                
                res.render('showCusResMenuTheFood-v2',{
                    restaurant: restaurant,
                    food: food,
                    cname:req.params.cname,
                    msg:'add to cart successfully'
                });
                return;
                });
            });
        });
})

module.exports = router;
