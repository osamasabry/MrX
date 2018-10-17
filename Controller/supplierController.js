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
			newSupplier.Supplier_Code     	 	 = NextCode;
			newSupplier.Supplier_Name 	     	 = request.body.Supplier_Name;
			newSupplier.Supplier_Email   		 = request.body.Supplier_Email;
			newSupplier.Supplier_Password		 = request.body.Supplier_Password;
			newSupplier.Supplier_Country	 	 = request.body.Supplier_Country;
			newSupplier.Supplier_City	 		 = request.body.Supplier_City;
			newSupplier.Supplier_Address	 	 = request.body.Supplier_Address;
			newSupplier.Supplier_Phone	 		 = request.body.Supplier_Phone;
			newSupplier.Supplier_Contact	 	 = request.body.Supplier_Contact;
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
				Product_Name 	    	: request.body.Product_Name,
				Supplier_Name   		: request.body.Supplier_Name,
				Supplier_Email			: request.body.Supplier_Email,
				Supplier_Country		: request.body.Supplier_Country,
				Supplier_City	 		: request.body.Supplier_City,
				Supplier_Address	 	: request.body.Supplier_Address,
				Supplier_Phone	 		: request.body.Supplier_Phone,
				Supplier_Contact	 	: request.body.Supplier_Contact,
				Supplier_Product_Ids	: request.body.Supplier_Product_Ids,
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