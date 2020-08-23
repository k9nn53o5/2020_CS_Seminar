var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var CartDao = require("../model/Cart").CartDao;

router.get('/',function(req,res){
    console.log("load to cusConfirmOrder");
    
    CartDao.findByCId(req.params.cId,function(items){
        res.render('confirmCartBeforeSubmit',{
            rId:req.params.id,
            cname:req.params.cname,
            cId:req.params.cId,
            status:req.params.status,
            msg: '',
            items: items
        });
    });
});

module.exports = router;