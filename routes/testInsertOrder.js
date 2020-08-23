var mysql = require('mysql');
global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});


var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;
var CustomerDao = require('../model/Customer').CustomerDao;
var OrderDao = require('../model/Order').OrderDao;
var Order_goodsDao = require('../model/Order_goods').Order_goodsDao;
var CartDao = require("../model/Cart").CartDao;

CartDao.findByCId(1,function(items){
    if(items.length == 0){
        console.log("can't find cId");
        return
    }

    // init all parameters in newOrder(...) and insert a new order
    var param_order_num = items.length; // how many diff type of food
    var param_cId = 1;
    var param_pay_price = 0; //1
    var param_is_pay = 0 ; var param_pay_time = null;
    var param_is_ship = 0; var param_ship_time = null;
    var param_is_receipt = 0; var param_receipt_time = null; 
    var param_ship_number = null; var param_status = "Sending";
    var param_create_time; //2
    var param_update_time = null; var param_ship_man_id = null;
    var param_rId = 1;
    //1
   
    
    var total = 0;

    for (let i = 0; i < items.length; i++) {
        MenuDao.findFoodPrice(items[i].dishId,(foodprice)=>{
            
            console.log( Object.prototype.toString.call(total) );
            total += (foodprice*items.num);
            //console.log(foodprice);
        })       
    } 
    
    console.log(total);


    //console.log(param_pay_price);
    //param_pay_price = 0;
    /*
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
        MenuDao.findFoodPrice(element.dishId,(thePrice)=>{this.curPrice=thePrice;});
        OrderDao.findOrderIdBy_cId_create_time(element.cId,param_create_time,(oId)=>{ this.curOrderId=oId; });
        Order_goodsDao.newAOrder_goods( [ curOrderId,element.dishId,element.num,curPrice,0,param_create_time,null ] );
    });
     
*/
});
