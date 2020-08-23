var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var OrderDao =  require('../model/Order').OrderDao;
var DeliveryManDao = require('../model/DeliveryMan').DeliveryManDao;
var CustomerDao = require('../model/Customer').CustomerDao;

router.get('/', function(req, res) {
    OrderDao.findOrder_All(
        function(orders){
            var CustomersAddress = [];
            //console.log(req.params.delivId);
            //don't work
            /*
            orders.forEach(element => {
                CustomerDao.findById(element.cId,(customers)=>{
                    CustomersAddress.push(customers.address);
                })
            });
            */
            res.render('showDeliveryManOrders',{
                address:CustomersAddress,
                delivId:req.params.delivId,
                orders: orders
            });     
    }); 
});



module.exports = router;