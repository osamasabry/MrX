var Prodcut = require('../Model/product');



module.exports = {
		getProduct:function(req,res){
			Prodcut.findOne({Product_Code:Number(req.body.Product_Code)}, function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("not Product");
				}
			})
		},

		getAllProduct:function(req,res){
			Prodcut.find({}, function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("not Product");
				}
			})
		},

		searchProduct:function(req,res){
			var object  = {};
			if (req.body.type=='name') 
				object = {Product_Name:{$regex:req.body.Product_Name}};
			else
				object = {Product_Chemical_Name:{$regex:req.body.Product_Chemical_Name}};

			Prodcut.findOne({object})
				.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("not Product");
				}
			})
		},

		GetNextCode:function(req,res){
    		Prodcut.getLastCode(function(err,prodcut){
				if (prodcut) 
					res.send( Number(prodcut.Product_Code)+1);
				else
					res.send(1);
			})
		},

		addPrdouct:function(req,res,NextCode){
			var newProduct = new Prodcut();
			newProduct.Product_Code     	 		= NextCode;
			newProduct.Product_Name 	     		= request.body.Product_Name;
			newProduct.Product_Manufacturer 	    = request.body.Product_Manufacturer;
			newProduct.Product_Exporter 	     	= request.body.Product_Exporter;
			newProduct.Product_Chemical_Name   		= request.body.Product_Chemical_Name;
			newProduct.Product_Molecular_Formula	= request.body.Product_Molecular_Formula;
			newProduct.Product_Molecular_Weight	 	= request.body.Product_Molecular_Weight;
			newProduct.Product_CAS_Number	 		= request.body.Product_CAS_Number;
			newProduct.Product_EC_Number	 		= request.body.Product_EC_Number;
			newProduct.Product_Appearance	 		= request.body.Product_Appearance;
			newProduct.Product_Active_Content	 	= request.body.Product_Active_Content;
			newProduct.Product_pH	 				= request.body.Product_pH;
			newProduct.Product_Sp_gravity	 		= request.body.Product_Sp_gravity;
			newProduct.Product_Chloride	 			= request.body.Product_Chloride;
			newProduct.Product_Iron	 				= request.body.Product_Iron;
			newProduct.Product_Phosphorous_Acid	 	= request.body.Product_Phosphorous_Acid;
			newProduct.Product_O_phosphate	 		= request.body.Product_O_phosphate;
			newProduct.Product_Hazen_color	 		= request.body.Product_Hazen_color;
			newProduct.Product_Category_ID	 		= request.body.Product_Category_ID;
			newProduct.Product_Estba7s	 			= request.body.Product_Estba7s;
		 	newProduct.Product_OriginCountry       	= request.body.Product_OriginCountry;
        	newProduct.Product_Packing             	= request.body.Product_Packing;
        	newProduct.Product_SupplierIds         	= request.body.Product_SupplierIds;
			newProduct.save(function(error, doneadd){
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

		editProduct:function(req,res){
			var newvalues = { $set: {
				Product_Name 	     		: request.body.Product_Name,
				Product_Chemical_Name   	: request.body.Product_Chemical_Name,
				Product_Manufacturer 	    : request.body.Product_Manufacturer,
				Product_Exporter 	     	: request.body.Product_Exporter,
				Product_Molecular_Formula	: request.body.Product_Molecular_Formula,
				Product_Molecular_Weight	: request.body.Product_Molecular_Weight,
				Product_CAS_Number	 		: request.body.Product_CAS_Number,
				Product_EC_Number	 		: request.body.Product_EC_Number,
				Product_Appearance	 		: request.body.Product_Appearance,
				Product_Active_Content	 	: request.body.Product_Active_Content,
				Product_pH	 				: request.body.Product_pH,
				Product_Sp_gravity	 		: request.body.Product_Sp_gravity,
				Product_Chloride	 		: request.body.Product_Chloride,
				Product_Iron	 			: request.body.Product_Iron,
				Product_Phosphorous_Acid	: request.body.Product_Phosphorous_Acid,
				Product_O_phosphate	 		: request.body.Product_O_phosphate,
				Product_Hazen_color	 		: request.body.Product_Hazen_color,
				Product_Category_ID	 		: request.body.Product_Category_ID,
				Product_Estba7s	 			: request.body.Product_Estba7s,
				Product_OriginCountry       : request.body.Product_OriginCountry,
        		Product_Packing             : request.body.Product_Packing,
        		Product_SupplierIds         : request.body.Product_SupplierIds,
			} };
			var myquery = { Product_Code: request.body.Product_Code }; 
			Product.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Product not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		}
}