var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;


router.get('/',function(req,res){
    console.log('load to resGoManageMenu');
    RestaurantDao.findById(req.params.rid,function(restaurant){
        if(restaurant === undefined){
            res.send("error restaurant is undefine");
        }
        else{
            res.render('manageMenu2',{
                restaurant: restaurant,
                msg: ''
            })
            return;
        }

    });
});

module.exports = router;