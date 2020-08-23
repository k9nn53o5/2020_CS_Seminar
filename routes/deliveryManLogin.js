var express = require('express');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var OrderDao =  require('../model/Order').OrderDao;
var DeliveryManDao = require('../model/DeliveryMan').DeliveryManDao;
var CustomerDao = require('../model/Customer').CustomerDao;

router.get('/', function(req, res) {
	// operations not supported
    console.log("load to DeliveryManLoginPage");
    res.render('DeliveryManLogin',{
        msg: 'Hello! Please Login to see the foods near by'
    });
});

router.post('/',function(req,res){
    if (!req.body.dName || !req.body.dPW) { // user name empty
		res.render('DeliveryManLogin',{
            msg: 'Please fill in your name and your password'
        });
        return;
	}
    DeliveryManDao.cName2cId(req.body.dName,function(dId){
        if(dId === undefined){
            console.log('no such user: ' + req.body.dName);
            res.render('DeliveryManLogin',{
                msg: 'no such user:' + req.body.dName
            });
            return;
        }
        DeliveryManDao.findById(dId,function(deliv){
            if(deliv.password !== req.body.dPW){
                console.log('password incorrect');
                res.render('DeliveryManLogin',{
                    msg: 'password incorrect'
                });
                return;  
            }
            res.render('showDeliveryManData',{
                deliv:deliv
            });     
        });
    });
    
});


module.exports = router;