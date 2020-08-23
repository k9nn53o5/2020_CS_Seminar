var express = require('express');
//const { CartDao } = require('../model/Cart');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var CartDao = require('../model/Cart').CartDao;

router.get('/', function(req, res) {
	// operations not supported
    console.log("load to cusLoginPage");
    res.render('customerLogin',{
        msg: 'Hello! Please Login to see the foods near by'
    });
});

router.post('/',function(req,res){
    if (!req.body.cusName || !req.body.cusPW) { // user name empty
		res.render('customerLogin',{
            msg: 'Please fill in your name and your password'
        });
        return;
	}
    
    CustomerDao.cName2cId(req.body.cusName,function(cId){
        if(cId === undefined){
            console.log('no such user:' + req.body.cusName);
            res.render('customerLogin',{
                msg: 'no such user:' + req.body.cusName
            });
            return;
        }

        CustomerDao.findById(cId,function(customer){
            if(customer.password !== req.body.cusPW){
                console.log('password incorrect');
                res.render('customerLogin',{
                    msg: 'password incorrect'
                });
                return;  
            }

            RestaurantDao.getAll(
                function(restaurants){
                    res.render('showCusAllResNearBy',{
                        name: req.body.cusName,
                        restaurants: restaurants
                    }); 
                    
                CartDao.cleanGoodsByCid(cId,()=>{});
            });
        });
    });
    
});


module.exports = router;