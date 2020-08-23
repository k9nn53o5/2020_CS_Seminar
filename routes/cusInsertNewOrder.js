var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var CartDao = require("../model/Cart").CartDao;

router.get('/',function(req,res){
    console.log("load to cusCreateOrder");

    CartDao.findByCId(req.params.cId,function(items){

        if(items.length == 0){
            res.render('cusCreateOrder',{
                msg: 'Your have no food in cart, go order somethings',
                rId:req.params.id,
                cname:req.params.cname,
                items: items
            });
            return
        }

        // init all parameters in newOrder(...) and insert a new order
        var param_order_num = items.length; // how many diff type of food
        var param_cId = req.params.cId;
        var param_pay_price=0; //1
        var param_is_pay = 0 ; var param_pay_time = null;
        var param_is_ship = 0; var param_ship_time = null;
        var param_is_receipt = 0; var param_receipt_time = null; 
        var param_ship_number = null; var param_status = "Sending";
        var param_create_time; //2
        var param_update_time = null; var param_ship_man_id = null;
        var param_rId = req.params.id;

        var currentDate = new Date();
        var time = currentDate.getHours()+":"+currentDate.getMinutes();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
        param_create_time = datetimeStr;

        //1
        /*
        items.forEach(element => {
            MenuDao.findFoodPrice(element.dishId,(foodprice)=>{
                this.param_pay_price += (element.num * foodprice);
            });
        });
        console.log(param_pay_price);
        //param_pay_price = 0;
        
        //2
        var currentDate = new Date();
        var time = currentDate.getHours()+":"+currentDate.getMinutes();
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        var datetimeStr = year + "-" + (month+1) + "-" + date + " " + time;
        param_create_time = datetimeStr;

        OrderDao.newOrder( [ param_order_num,param_cId,param_pay_price,param_is_pay,param_pay_time,param_is_ship,param_ship_time,param_is_receipt,param_receipt_time,param_ship_number,param_status,param_create_time,param_update_time,param_ship_man_id,param_rId ] );
        
        //init all parameter in order_good and insert all food that cus order into order_goods
        
        var curOrderId;
        var curPrice;


        items.forEach(element => {
            MenuDao.findFoodPrice(element.dishId,(thePrice)=>{curPrice=thePrice;});
            OrderDao.findOrderIdBy_cId_create_time(element.cId,param_create_time,(oId)=>{ curOrderId=oId; });
            Order_goodsDao.newAOrder_goods( [ curOrderId,element.dishId,element.num,curPrice,0,param_create_time,null ] );
        });
        */


        //for test
        OrderDao.newOrder( [ param_order_num,param_cId,param_pay_price,param_is_pay,param_pay_time,param_is_ship,param_ship_time,param_is_receipt,param_receipt_time,param_ship_number,param_status,param_create_time,param_update_time,param_ship_man_id,param_rId ] )
        
        var curOrderId=-1;
        var curPrice=0;
        items.forEach(element => {
            //MenuDao.findFoodPrice(element.dishId,(thePrice)=>{curPrice=thePrice;});
            //OrderDao.findOrderIdBy_cId_create_time(element.cId,param_create_time,(oId)=>{ curOrderId=oId; });
            Order_goodsDao.newAOrder_goods( [ curOrderId,element.dishId,element.num,curPrice,0,param_create_time,null ] );
        });

        res.render('cusCreateOrder',{
                msg: 'Your Order is Sended to restaurant',
                rId:req.params.id,
                cname:req.params.cname,
                items: items
        });
        
        CartDao.cleanGoodsByCid(req.params.cId,()=>{});
        return
    });
})

module.exports = router;