function Order_goods(id,orderId,dishId,number,price,status,create_time,update_time){
    this.id = id;
    this.orderId = orderId;
    this.dishId = dishId;
    this.number = number;
    this.price = price;
    this.status = status;
    this.create_time = create_time;
    this.update_time = update_time;
}

function Order_goodsDao(){
}

Order_goodsDao.prototype.newAOrder_goods = function(orderId,dishId,number,price,status,create_time,update_time){
    var sqlCode = "INSERT INTO order_goods (og_orderId,og_dishId,og_number,og_price,og_status,og_create_time,og_update_time)\
                   VALUES ?";
    
    MySQL
        .query(sqlCode,[ [orderId],[dishId],[number],[price],[null],[create_time],[update_time] ],function(err){
            if(err)
                throw err;
        });
}

Order_goodsDao.prototype.findOrder_goodsBy_orderId = function(orderId,callback){
    var sqlCode = 'SELECT *\
                   FROM order_goods\
                   WHERE og_orderId = ?';

    MySQL
        .query(sqlCode,[[orderId]],function(err,rows){
            if(err)
                    throw err;
            var results = [];
            rows.forEach(function(element) {
                results.push(new Order_goods(element.og_id,element.og_orderId,element.og_dishId,
                    element.og_number,element.og_price,null,
                    element.og_create_time,element.og_update_time));
            });
            callback(results);
        });
}

//same oeder can't add same dish to order_good twice
Order_goodsDao.prototype.dishIdCanNotBeDuplicateInOrder_goods = function(orderId,dishId,callback){
    var sqlCode = "SELECT *\
                   FROM order_goods\
                   WHERE og_orderId = ? AND og_dishId = ? AND og_status != 'Finish' ";
    MySQL
    .query(sqlCode,[ [orderId],[dishId] ],function(err,rows){
            if(err)
                throw err;
            if(rows.length >= 1){
                callback("HaveDuplicateData");
            }
            else{
                callback("OK");
            }   
        });
}


module.exports.Order_goods = Order_goods;
module.exports.Order_goodsDao = new Order_goodsDao();