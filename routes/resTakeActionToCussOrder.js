var express = require('express');
var router = express.Router({ mergeParams: true });
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var CartDao = require('../model/Cart').CartDao;

router.get('/',function(req,res){
    if(req.params.oStatus == 'Sending'){
        OrderDao.r_start_cooking(req.params.oid);
        res.render('toTheURL',{
            msg:'now start cooking food',
            theURL:"/resLogin/" + String(req.params.rid) + "/resGoSeeCussOrder"
        });
        return;
    }
    else if(req.params.oStatus == 'Cooking'){
        OrderDao.r_finish_cooking(req.params.oid);
        res.render('toTheURL',{
            msg:'now food are ready',
            theURL:"/resLogin/" + String(req.params.rid) + "/resGoSeeCussOrder"
        });
        return;
    }
    else{
        res.send("The food is delivering to customer");
        return;
    }

})

module.exports = router;