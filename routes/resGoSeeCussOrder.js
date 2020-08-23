var express = require('express');
var router = express.Router({ mergeParams: true });
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var CartDao = require('../model/Cart').CartDao;

router.get('/',function(req,res){
    
        OrderDao.findOrderBy_rId(req.params.rid,function(orders){
            res.render('resGoSeeCussOrderPage',{
                msg: '',
                rid: req.params.rid,
                orders: orders,
            });
        });

    
})

module.exports = router;