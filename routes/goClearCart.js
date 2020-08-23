var express = require('express');
var router = express.Router({ mergeParams: true });
var CartDao = require("../model/Cart").CartDao;

router
.get('/',function(req,res){

    CartDao.cleanCustomerCartWhereFoodArrive(req.params.cId,0,function(result){
        var resultMsg='';
        if(result === "Delete successfully"){
            resultMsg = "clear All items in Cart (the items that are sended out can't be clear)";
        }
        else{
            resultMsg = "fail to clear";
        }
        res.render('goClearCart',{
            rid: req.params.id, 
            cname: req.params.cname,
            msg: resultMsg
        })
    });
})

module.exports = router;