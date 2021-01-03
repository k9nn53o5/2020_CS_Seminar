var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require("../model/Restaurant").RestaurantDao;
var MenusDao = require("../model/Menu").MenuDao;
var OrderDao = require("../model/Order").OrderDao;
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
        MenusDao.findFoodBydishId(items[0].dishId,function(info){
            console.log(items[0].dishId+"//////////");
            console.log(info.dishStoreId+"//////////");
    
            
            let goodNum = 0;
            let ogs = [];
    
            for(let i=0;i<items.length;i++){
                goodNum += items[i].num;
                let tmpOg = {
                    og_dishId :items[i].dishId,
                    og_number :items[i].num,
                    og_price : 0,
                };
                ogs.push(tmpOg);
            }
            OrderDao.insertOrderAndOrderFood_by_oId(goodNum,req.params.cId,0,info.storeId,ogs,function(result){
                console.log(result);
            });
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