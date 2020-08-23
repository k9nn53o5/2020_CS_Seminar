var express = require('express');
var router = express.Router();
var CustomerDao = require('../model/Customer').CustomerDao;

router.get('/', function(req, res) {
	// operations not supported
    res.render('customerResgister',{
        msg: 'Create a account'
    });
});

router.post('/',function(req,res){
    if(!req.body.cusName || !req.body.cusAddress || !req.body.cusPhone || !req.body.cusPW){
        res.render('customerResgister',{
            msg: 'Please fill in all the form'
        });
        return;
    }

    CustomerDao.canNotBeDuplicate(req.body.cusName,req.body.cusPhone,function(dupResult){
        if(dupResult == "HaveDuplicateData"){
            res.render('customerResgister',{
                msg: 'Same Phone Number or Customer Name has already been registered'
            });
            return;
        }
        else if(dupResult == "OK"){
            
            CustomerDao.newCustomer([req.body.cusAddress,req.body.cusPhone
                ,req.body.cusName,req.body.cusPW]);
            res.render('success',()=>{
                res.redirect('/cusLogin');
            }); 
        }
        else{
            throw Error;
        }
    })
});


module.exports = router;