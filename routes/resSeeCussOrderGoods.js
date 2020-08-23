var express = require('express');
var router = express.Router({ mergeParams: true });
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;

router.get('/',function(req,res){
    Order_goodsDao.findOrder_goodsBy_orderId(req.params.oid,function(order_goods){
        res.render('resShowOrderGoods',{
            msg: '',
            rid: req.params.rid,
            order_goods: order_goods
        });
    });
});

module.exports = router;