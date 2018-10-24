var Supplier = require('../Model/supplier');



module.exports = {
		getSupplier:function(req,res){
			Supplier.find({})
			.select('Supplier_Code Supplier_Name')
			.exec(function(err, supplier) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(supplier) {
		    		res.send(supplier);
				}else{
		    		res.send("not Supplier");
				}
			})
		},

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

		GetNextCode:function(req,res){
    		Supplier.getLastCode(function(err,supplier){
				if (supplier) 
					res.send( Number(supplier.Supplier_Code)+1);
				else
					res.send(1);
			})
		},

		addSupplier:function(req,res,NextCode){
			var newSupplier = new Supplier();
			newSupplier.Supplier_Code     	 	 	= NextCode;
			newSupplier.Supplier_Name 	     	 	= request.body.Supplier_Name;
			newSupplier.Supplier_Email   		 	= request.body.Supplier_Email;
			newSupplier.Supplier_Country	 	 	= request.body.Supplier_Country;
			newSupplier.Supplier_City	 		 	= request.body.Supplier_City;
			newSupplier.Supplier_Address	 	 	= request.body.Supplier_Address;
			newSupplier.Supplier_Phone	 		 	= request.body.Supplier_Phone;
			newSupplier.Supplier_Contact	 	 	= request.body.Supplier_Contact;
			newSupplier.Supplier_FaceBook        	= request.body.Supplier_FaceBook;
			newSupplier.Supplier_PaymentMethod   	= request.body.Supplier_PaymentMethod;
			newSupplier.Supplier_TimeOfDelivery  	= request.body.Supplier_TimeOfDelivery;
			newSupplier.Supplier_Agency 		 	= request.body.Supplier_Agency;	 
			newSupplier.Supplier_Certificate	 	= request.body.Supplier_Certificate;
			newSupplier.Supplier_StoreAddress	 	= request.body.Supplier_StoreAddress;
			newSupplier.Supplier_WayOfDelivery	 	= request.body.Supplier_WayOfDelivery;
			newSupplier.Supplier_AddressGPSLocation = request.body.Supplier_AddressGPSLocation;
			newSupplier.Supplier_StoreGPSLocation 	= request.body.Supplier_StoreGPSLocation;
			newSupplier.Supplier_Category			= request.body.Supplier_Category;
			newSupplier.Supplier_Type				= request.body.Supplier_Type;
			newSupplier.save(function(error, doneadd){
				if(error){
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
		},

		editSupplier:function(req,res){
			var newvalues = { $set: {
				Product_Name 	    		: request.body.Product_Name,
				Supplier_Name   			: request.body.Supplier_Name,
				Supplier_Email				: request.body.Supplier_Email,
				Supplier_Country			: request.body.Supplier_Country,
				Supplier_City	 			: request.body.Supplier_City,
				Supplier_Address	 		: request.body.Supplier_Address,
				Supplier_Phone	 			: request.body.Supplier_Phone,
				Supplier_Contact	 		: request.body.Supplier_Contact,
				Supplier_Product_Ids		: request.body.Supplier_Product_Ids,
				Supplier_FaceBook        	: request.body.Supplier_FaceBook,
				Supplier_PaymentMethod   	: request.body.Supplier_PaymentMethod,
				Supplier_TimeOfDelivery  	: request.body.Supplier_TimeOfDelivery,
				Supplier_Agency 		 	: request.body.Supplier_Agency,	 
				Supplier_Certificate	 	: request.body.Supplier_Certificate,
				Supplier_StoreAddress	 	: request.body.Supplier_StoreAddress,
				Supplier_WayOfDelivery	 	: request.body.Supplier_WayOfDelivery,
				Supplier_AddressGPSLocation : request.body.Supplier_AddressGPSLocation,
				Supplier_StoreGPSLocation 	: request.body.Supplier_StoreGPSLocation,
				Supplier_Category			: request.body.Supplier_Category,
				Supplier_Type				: request.body.Supplier_Type,
			} };
			var myquery = { Supplier_Code: request.body.Supplier_Code }; 
			Supplier.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Supplier not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		}
}