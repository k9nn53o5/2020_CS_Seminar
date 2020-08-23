var express = require('express');
var router = express.Router();
var DeliveryManDao = require('../model/DeliveryMan').DeliveryManDao;

router.get('/', function(req, res) {
	// operations not supported
    res.render('deliverymanResgisterPage',{
        msg: 'Create a account'
    });
});

router.post('/',function(req,res){
    if(!req.body.delivName || !req.body.delivPhone || !req.body.delivPW || !req.body.iId){
        res.render('deliverymanResgisterPage',{
            msg: 'Please fill in all the form'
        });
        return;
    }

    DeliveryManDao.canNotBeDuplicate(req.body.delivName,req.body.delivPhone,function(dupResult){
        if(dupResult == "HaveDuplicateData"){
            res.render('deliverymanResgisterPage',{
                msg: 'Same Phone Number or DeliveryMan Name has already been registered'
            });
            return;
        }
        else if(dupResult == "OK"){
            
            DeliveryManDao.newDeliveryMan([req.body.delivName,req.body.delivPhone
            ,req.body.delivPW,null,null,req.body.iId]);
            res.render('success'); 
            return;
        }
        else{
            throw Error;
        }
    })
});


module.exports = router;