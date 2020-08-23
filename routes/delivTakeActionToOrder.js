var express = require('express');
var router = express.Router({ mergeParams: true });
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var CartDao = require('../model/Cart').CartDao;
var DeliveryManDao = require('../model/DeliveryMan').DeliveryManDao;

router.get('/',function(req,res){
    var currentDate = new Date();
    var time = currentDate.getHours()+":"+currentDate.getMinutes();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;

    
    if(req.params.oStatus == 'FoodWasCooked'){
        OrderDao.deliv_take_order(datetimeStr, req.params.delivId, req.params.oid);
        res.render('toTheURL',{
            msg:'',
            theURL:"/deliveryManLogin/"+String(req.params.delivId)
        });
        return;
    }
    else if(req.params.oStatus == 'Delivering'){
        OrderDao.cus_get_food(datetimeStr, req.params.oid);
        res.render('toTheURL',{
            msg:'',
            theURL:"/deliveryManLogin/"+String(req.params.delivId)
        });
        return;
    }
    else{
        res.send("customer have already gotten the food");
        return;
    }

})

module.exports = router;