
var RequestPrice = require('../Model/request_price');

var Customer = require('../Model/customer');
var Supplier = require('../Model/supplier');
var Prodcut = require('../Model/product');





module.exports = {
		// getCustomer:function(request,res){
		// 	Customer.find({})
		// 	.select('Customer_Code Customer_Name')
		// 	.exec(function(err, customer) {
		// 		if (err){
		//     		return res.send({
		// 				message: err
		// 			});
		//     	} else if(customer) {
		//     		res.send(customer);
		// 		}else{
		//     		res.send("not Customer");
		// 		}
		// 	})
		// },
		
		// 
		// searchSupplier:function(req,res){
		// 	var object  = {};
		// 	if (req.body.type=='name') 
		// 		object = {Product_Name:{$regex:req.body.Product_Name}};
		// 	else
		// 		object = {Product_Chemical_Name:{$regex:req.body.Product_Chemical_Name}};

		// 	Prodcut.findOne({object})
		// 		.exec(function(err, product) {
		// 		if (err){
		//     		return res.send({
		// 				message: err
		// 			});
		//     	} else if(product) {
		//     		res.send(product);
		// 		}else{
		//     		res.send("not Product");
		// 		}
		// 	})
		// },

		// GetNextCode:function(){
		// 	return new Promise((resolve, reject) => {
		// 		Supplier.getLastCode(function(err,supplier){
		// 			if (supplier)
		// 				resolve( Number(supplier.Supplier_Code)+1);
		// 			else
		// 				resolve (1);
		// 		})
		// 	})
		// },

		addRequestPrice:function(request,res){
			RequestPrice.getLastCode(function(err,requestprice){
				if (requestprice) 
					InsertIntoRequestPrice(requestprice.RequestPrice_Code+1);
				else
					InsertIntoRequestPrice(1);
			});

			function InsertIntoRequestPrice(NextCode){

				var newRequestPrice = new RequestPrice();

				newRequestPrice.RequestPrice_Code        	        = NextCode;
		        newRequestPrice.RequestPrice_Customer_ID    	    = request.body.RequestPrice_Customer_ID;
		        newRequestPrice.RequestPrice_Product           		= request.body.RequestPrice_Product;
				newRequestPrice.RequestPrice_Supplier     	 	 	= request.body.RequestPrice_Supplier;
				newRequestPrice.RequestPrice_Status 	     	 	= request.body.RequestPrice_Status;
				
				newRequestPrice.save(function(error, doneadd){
					if(error){
						console.log(error)
						return res.send({
							message: error
						});
					}
					else{
						return res.send({
							message: true
						});
					}
				});
			}
		},


		updateRequestPrice:function(request,res){
			var myquery = { 
					_id	 						: request.body.ID,
					'RequestPrice_Supplier._id' : request.body.RequestPrice_Supplier_ID 
			}; 

			var newvalues = { 
					$set: {"RequestPrice_Supplier.$.Valid_Till" : request.body.Valid_Till },
					 	
					$push:{"RequestPrice_Supplier.$.Price_Details" : request.body.Price_Details }, 

			 },options = {upsert: true};


			RequestPrice.findOneAndUpdate( myquery,newvalues,options, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Request Price not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		}
}