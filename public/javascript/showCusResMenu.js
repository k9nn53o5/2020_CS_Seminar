var mysql = require('mysql');
var CartDao = require('../../model/Cart').CartDao;

global.MySQL = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'k9nn53o5', 
	database : 'dbtest2020_4_2'
});

clearCusAllCart = function(cId){
    CartDao.cleanCustomerCartWhereFoodArrive(cId,0,()=>{});
}