var express = require('express');
var router = express.Router({ mergeParams: true });
var RestaurantDao = require('../model/Restaurant').RestaurantDao;
var MenuDao = require('../model/Menu').MenuDao;

router.get('/',function(req,res){
    console.log('load to goManageMenu');
    RestaurantDao.findById(req.params.rid,function(restaurant){
        if(restaurant === undefined){
            res.redirect('/resLogin');
        }

        if(req.params.crud === 'Delete' ||  req.params.crud === 'Add'){
            res.render('CURDMenu',{
                backURL1: req.params.crud,
                backURL2: req.params.rid,
                resName: restaurant.name,
                msg: 'Your are going to ' + req.params.crud + ' food to the menu'
            });
        }
        else{
          res.redirect('/resLogin');
        }
    });

}).post('/',function(req,res){
    console.log(req.params.rid);

    RestaurantDao.findById(req.params.rid,function(restaurant){
        if(!req.body.dishName || !req.body.price){
            res.render('CURDMenu',{
                backURL1: req.params.crud,
                backURL2: req.params.rid,
                resName: restaurant.name,
                msg: 'Please fill in all the form'
            });
            return;
        }

        if(req.params.crud === 'Delete'){
            MenuDao.canNotBeDuplicate(req.body.dishName,function(dupResult){
                if(dupResult === "OK"){
                    res.render('CURDMenu',{
                        backURL1: req.params.crud,
                        backURL2: req.params.rid,
                        resName: restaurant.name,
                        msg: "You don't have this dish"
                    });
                    return;
                }
                else if(dupResult === "HaveDuplicateData"){
                    MenuDao.deleteMenu(req.body.dishName);
                    res.render('CURDMenu',{
                        backURL1: req.params.crud,
                        backURL2: req.params.rid,
                        resName: restaurant.name,
                        msg: String(req.body.dishName)+"Deleted"
                    });
                    
                }
            });
        }
        else if(req.params.crud === 'Add'){
            MenuDao.canNotBeDuplicate(req.body.dishName,function(dupResult){
                if(dupResult === "OK"){
                    MenuDao.insertMenu([req.body.dishName,req.params.rid,req.body.price]);
                    res.render('CURDMenu',{
                        backURL1: req.params.crud,
                        backURL2: req.params.rid,
                        resName: restaurant.name,
                        msg: String(req.body.dishName)+"add to the menu"
                    });
                }
                else if(dupResult === "HaveDuplicateData"){
                    res.render('CURDMenu',{
                        backURL1: req.params.crud,
                        backURL2: req.params.rid,
                        resName: restaurant.name,
                        msg: "You already have this dish"
                    });
                    return;
                }
            });
        }
    });
    
});

module.exports = router;