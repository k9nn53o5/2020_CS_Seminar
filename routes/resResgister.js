var express = require('express');
var router = express.Router();
var RestaurantDao = require('../model/Restaurant').RestaurantDao;

router.get('/', function(req, res) {
	// operations not supported
    res.render('resResgister',{
        msg: 'resgister'
    });
});

router.post('/',function(req,res){
    if(!req.body.address || !req.body.phone || !req.body.name || !req.body.password){
        res.render('resResgister',{
            msg: 'Please fill in all the form'
        });
        return;
    }

    RestaurantDao.canNotBeDuplicate(req.body.phone,req.body.name,function(dupResult){
        if(dupResult == "HaveDuplicateData"){
            res.render('resResgister',{
                msg: 'Same Phone Number or Restaurant Name has been registered'
            });
            return;
        }
        else if(dupResult == "OK"){
            RestaurantDao.newRestaurant([req.body.address,req.body.phone
                ,req.body.name,req.body.password]);
            res.render('success',()=>{

                res.redirect('/resLogin');
            });
        }
        else{
            throw Error;
        }
    });

    
});


module.exports = router;