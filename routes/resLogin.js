var express = require('express');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;

router.get('/', function(req, res) {
	// operations not supported
    //console.log("load to showRes");
    res.render('resLoginPage',{
        msg: 'Welcome! Restaurant owner'
    });
});

router.post('/',function(req,res){
    if (!req.body.resName) { // user name empty
		res.render('resLoginPage',{
            msg: 'Please fill in your Restaurant name'
        });
        return;
	}

    RestaurantDao.rName2rId(req.body.resName,function(rId){

        if(rId === undefined){
            console.log('no such user:' + req.body.resName);
            res.render('resLoginPage',{
                msg: 'no such user:' + req.body.resName
            });
            return;
        }

        RestaurantDao.findById(rId,function(restaurant){
            if (restaurant.password !== req.body.resPW) {
                console.log('password incorrect');
                res.render('resLoginPage',{
                    msg: 'password incorrect'
                });
                return;
            }
            MenuDao.findByRestId(rId,function(foods){
                res.render('showResData',{
                    restaurant: restaurant,
                    foods: foods
                });
            });
        });
        
    });

    
});

module.exports = router;