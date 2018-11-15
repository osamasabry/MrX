var Prodcut = require('../Model/product');



module.exports = {
		getProduct:function(req,res){
			Prodcut.findOne({Product_Code:Number(req.body.Product_Code)})
			.populate({ path: 'Category', select: 'Category_Name' })
			.populate({ path: 'Supplier', select: 'Supplier_Name' })
			.populate({ path: 'productclass', select: 'Class_Name' })
			.populate({ path: 'country', select: 'Country_Name Country_Tcode' })
			.populate({ path: 'productform', select: 'Form_Code Form_Name' })
			.populate({ path: 'productpacking', select: 'Packing_Code Packing_Name' })
			.populate({ path: 'productrelease', select: 'Release_Code Release_Name' })
			.populate({ path: 'productstrage', select: 'StorageType_Code StorageType_Name' })
			.populate({ path: 'productcategory', select: 'ProductCategory_Code ProductCategory_Name' })
			.populate({ path: 'customer', select: 'Customer_Code Customer_Name' })
			.lean()
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

		getAllProduct:function(req,res){
			Prodcut.find({})
			.populate({ path: 'Category', select: 'Category_Name' })
			.populate({ path: 'Supplier', select: 'Supplier_Name' })
			.populate({ path: 'productclass', select: 'Class_Name' })
			.populate({ path: 'country', select: 'Country_Name Country_Tcode' })
			.populate({ path: 'productform', select: 'Form_Code Form_Name' })
			.populate({ path: 'productpacking', select: 'Packing_Code Packing_Name' })
			.populate({ path: 'productrelease', select: 'Release_Code Release_Name' })
			.populate({ path: 'productstrage', select: 'StorageType_Code StorageType_Name' })
			.populate({ path: 'productcategory', select: 'ProductCategory_Code ProductCategory_Name' })
			.populate({ path: 'customer', select: 'Customer_Code Customer_Name' })
			.lean()
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

		searchProduct:function(req,res){
			var object  = {};
			if (req.body.type=='name') 
				object = {Product_Name:{$regex:req.body.Product_Name}};
			else
				object = {Product_Chemical_Name:{$regex:req.body.Product_Chemical_Name}};

			Prodcut.findOne({object})
				.populate({ path: 'Category', select: 'Category_Name' })
				.populate({ path: 'Supplier', select: 'Supplier_Name' })
				.populate({ path: 'productclass', select: 'Class_Name' })
				.populate({ path: 'country', select: 'Country_Name Country_Tcode' })
				.populate({ path: 'productform', select: 'Form_Code Form_Name' })
				.populate({ path: 'productpacking', select: 'Packing_Code Packing_Name' })
				.populate({ path: 'productrelease', select: 'Release_Code Release_Name' })
				.populate({ path: 'productstrage', select: 'StorageType_Code StorageType_Name' })
				.populate({ path: 'productcategory', select: 'ProductCategory_Code ProductCategory_Name' })
				.lean()
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

		addProduct:function(req,res){

			Prodcut.getLastCode(function(err,product){
				if (product) 
					InsertIntoProduct(product.Product_Code+1);
				else
					InsertIntoProduct(1);
			});

			function InsertIntoProduct(NextCode){
				var newProduct = new Prodcut();
				newProduct.Product_Code     	 		= NextCode;
				newProduct.Product_Name 	     		= req.body.Product_Name;
				newProduct.Product_Manufacturer 	    = req.body.Product_Manufacturer;
				newProduct.Product_Exporter 	     	= req.body.Product_Exporter;
				newProduct.Product_Chemical_Name   		= req.body.Product_Chemical_Name;
				newProduct.Product_Molecular_Formula	= req.body.Product_Molecular_Formula;
				newProduct.Product_Molecular_Weight	 	= req.body.Product_Molecular_Weight;
				newProduct.Product_CAS_Number	 		= req.body.Product_CAS_Number;
				newProduct.Product_EC_Number	 		= req.body.Product_EC_Number;
				newProduct.Product_Appearance	 		= req.body.Product_Appearance;
				newProduct.Product_Active_Content	 	= req.body.Product_Active_Content;
				newProduct.Product_pH	 				= req.body.Product_pH;
				newProduct.Product_Sp_gravity	 		= req.body.Product_Sp_gravity;
				newProduct.Product_Chloride	 			= req.body.Product_Chloride;
				newProduct.Product_Iron	 				= req.body.Product_Iron;
				newProduct.Product_Phosphorous_Acid	 	= req.body.Product_Phosphorous_Acid;
				newProduct.Product_O_phosphate	 		= req.body.Product_O_phosphate;
				newProduct.Product_Hazen_color	 		= req.body.Product_Hazen_color;
				newProduct.Product_Category_ID	 		= req.body.Product_Category_ID;
				newProduct.Product_Estba7s	 			= req.body.Product_Estba7s;
			 	newProduct.Product_Origin_Country_Code  = req.body.Product_Origin_Country_Code;
	        	newProduct.Product_Packing_Code         = req.body.Product_Packing_Code;
	        	newProduct.Product_Supplier_Codes       = req.body.Product_Supplier_Codes;
	        	newProduct.Product_Customer_Codes       = req.body.Product_Customer_Codes;
	        	newProduct.Product_MSDS         		= req.body.Product_MSDS;
	        	newProduct.Product_Classes_Code         = req.body.Product_Classes_Code;
	        	newProduct.Product_Assay         		= req.body.Product_Assay;
	        	newProduct.Product_Form_Code         	= req.body.Product_Form_Code;
	        	newProduct.Product_Certification        = req.body.Product_Certification;
	        	newProduct.Product_Release_Code         = req.body.Product_Release_Code;
	        	newProduct.Product_StorageType_Code     = req.body.Product_StorageType_Code;
	        	newProduct.Product_ProductCategory_Code = req.body.Product_ProductCategory_Code;
				
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
			}
		},

		editProduct:function(req,res){
			var newvalues = { $set: {
				Product_Name 	     			  : req.body.Product_Name,
				Product_Chemical_Name   		  : req.body.Product_Chemical_Name,
				Product_Manufacturer 	    	  : req.body.Product_Manufacturer,
				Product_Exporter 	     		  : req.body.Product_Exporter,
				Product_Molecular_Formula		  : req.body.Product_Molecular_Formula,
				Product_Molecular_Weight		  : req.body.Product_Molecular_Weight,
				Product_CAS_Number	 			  : req.body.Product_CAS_Number,
				Product_EC_Number	 			  : req.body.Product_EC_Number,
				Product_Appearance	 			  : req.body.Product_Appearance,
				Product_Active_Content	 		  : req.body.Product_Active_Content,
				Product_pH	 					  : req.body.Product_pH,
				Product_Sp_gravity	 			  : req.body.Product_Sp_gravity,
				Product_Chloride	 			  : req.body.Product_Chloride,
				Product_Iron	 				  : req.body.Product_Iron,
				Product_Phosphorous_Acid		  : req.body.Product_Phosphorous_Acid,
				Product_O_phosphate	 			  : req.body.Product_O_phosphate,
				Product_Hazen_color	 			  : req.body.Product_Hazen_color,
				Product_Category_ID	 			  : req.body.Product_Category_ID,
				Product_Estba7s	 				  : req.body.Product_Estba7s,
				Product_Origin_Country_Code 	  : req.body.Product_Origin_Country_Code,
        		Product_Packing_Code              : req.body.Product_Packing_Code,
        		Product_Supplier_Codes       	  : req.body.Product_Supplier_Codes,
        		Product_Customer_Codes       	  : req.body.Product_Customer_Codes,
	        	Product_MSDS         			  : req.body.Product_MSDS,
	        	Product_Classes_Code         	  : req.body.Product_Classes_Code,
	        	Product_Assay         			  : req.body.Product_Assay,
	        	Product_Form_Code         		  : req.body.Product_Form_Code,
	        	Product_Certification        	  : req.body.Product_Certification,
	        	Product_Release_Code         	  : req.body.Product_Release_Code,
	        	Product_StorageType_Code     	  : req.body.Product_StorageType_Code,
	        	Product_ProductCategory_Code 	  : req.body.Product_ProductCategory_Code,
			
			} };
			var myquery = { Product_Code: req.body.Product_Code }; 
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
		},

		copyProduct:function(req,res){
			Prodcut.findOne({Product_Code:Number(req.body.Product_Code)})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(!product) {
		    		res.send("not Product");
				}else{
		    		Prodcut.getLastCode(function(err,productCode){
						if (productCode) 
							copyNewProduct(productCode.Product_Code+1,product);
						else
							copyNewProduct(1,product);
					});	
				}
			})

			function copyNewProduct(NextCode,product){
				var newProduct = new Prodcut();
				newProduct.Product_Code     	 		= NextCode;
				newProduct.Product_Name 	     		= product.Product_Name;
				newProduct.Product_Manufacturer 	    = product.Product_Manufacturer;
				newProduct.Product_Exporter 	     	= product.Product_Exporter;
				newProduct.Product_Chemical_Name   		= product.Product_Chemical_Name;
				newProduct.Product_Molecular_Formula	= product.Product_Molecular_Formula;
				newProduct.Product_Molecular_Weight	 	= product.Product_Molecular_Weight;
				newProduct.Product_CAS_Number	 		= product.Product_CAS_Number;
				newProduct.Product_EC_Number	 		= product.Product_EC_Number;
				newProduct.Product_Appearance	 		= product.Product_Appearance;
				newProduct.Product_Active_Content	 	= product.Product_Active_Content;
				newProduct.Product_pH	 				= product.Product_pH;
				newProduct.Product_Sp_gravity	 		= product.Product_Sp_gravity;
				newProduct.Product_Chloride	 			= product.Product_Chloride;
				newProduct.Product_Iron	 				= product.Product_Iron;
				newProduct.Product_Phosphorous_Acid	 	= product.Product_Phosphorous_Acid;
				newProduct.Product_O_phosphate	 		= product.Product_O_phosphate;
				newProduct.Product_Hazen_color	 		= product.Product_Hazen_color;
				newProduct.Product_Category_ID	 		= product.Product_Category_ID;
				newProduct.Product_Estba7s	 			= product.Product_Estba7s;
			 	newProduct.Product_Origin_Country_Code  = product.Product_Origin_Country_Code;
	        	newProduct.Product_Packing_Code         = product.Product_Packing_Code;
	        	newProduct.Product_Supplier_Codes       = product.Product_Supplier_Codes;
	        	newProduct.Product_Customer_Codes       = product.Product_Customer_Codes;
	        	newProduct.Product_MSDS         		= product.Product_MSDS;
	        	newProduct.Product_Classes_Code         = product.Product_Classes_Code;
	        	newProduct.Product_Assay         		= product.Product_Assay;
	        	newProduct.Product_Form_Code         	= product.Product_Form_Code;
	        	newProduct.Product_Certification        = product.Product_Certification;
	        	newProduct.Product_Release_Code         = product.Product_Release_Code;
	        	newProduct.Product_StorageType_Code     = product.Product_StorageType_Code;
	        	newProduct.Product_ProductCategory_Code = product.Product_ProductCategory_Code;
				
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
			}
		},


}