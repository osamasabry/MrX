var Supplier = require('../Model/supplier');
var Category = require('../Model/category');

var SupplierType 	= require('../Model/lut_supplier_types');
var SupplierClass 	= require('../Model/lut_classes');
var Country 		= require('../Model/countries');
var PaymentMethod 	= require('../Model/lut_payment_methods');
var WayOfDelivery 	= require('../Model/lut_ways_of_delivery');

module.exports = {
		getSupplier:function(req,res){
			Supplier.find({})
			.select('Supplier_Code Supplier_Name Supplier_Email')
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
		
		getAllSuppliers:function(req,res){
			Supplier.find({})
			.populate({ path: 'Category', select: 'Category_Name' })
			.populate({ path: 'SupplierType', select: 'SupplierType_Name' })
			.populate({ path: 'supplierclass', select: 'Class_Name' })
			.populate({ path: 'country', select: 'Country_Name Country_Tcode' })
			.populate({ path: 'PaymentMethod', select: 'PaymentMethod_Name' })
			.populate({ path: 'WayOfDelivery', select: 'WayOfDelivary_Name' })
			.lean()
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

		addSupplier:function(request,res){
			Supplier.getLastCode(function(err,supplier){
				if (supplier) 
					InsertIntoSupplier(supplier.Supplier_Code+1);
				else
					InsertIntoSupplier(1);
			});

			function InsertIntoSupplier(NextCode){

				var newSupplier = new Supplier();
				newSupplier.Supplier_Code     	 	 		= NextCode;
				newSupplier.Supplier_Name 	     	 		= request.body.Supplier_Name;
				newSupplier.Supplier_Email   		 		= request.body.Supplier_Email;
				newSupplier.Supplier_Country_Code	 		= request.body.Supplier_Country_Code;
				// newSupplier.Supplier_City	 		 		= request.body.Supplier_City;
				// newSupplier.Supplier_Address	 	 		= request.body.Supplier_Address;
				// newSupplier.Supplier_Phone	 		 		= request.body.Supplier_Phone;
				// newSupplier.Supplier_FaceBook        		= request.body.Supplier_FaceBook;
				// newSupplier.Supplier_PaymentMethod_Codes   	= request.body.Supplier_PaymentMethod_Codes;
				// newSupplier.Supplier_TimeOfDelivery  		= request.body.Supplier_TimeOfDelivery;
				// newSupplier.Supplier_Agencies 		 		= request.body.Supplier_Agencies;	 
				// newSupplier.Supplier_Certificates	 		= request.body.Supplier_Certificates;
				// newSupplier.Supplier_StoreAddress	 		= request.body.Supplier_StoreAddress;
				// newSupplier.Supplier_WayOfDelivery_Codes	= request.body.Supplier_WayOfDelivery_Codes;
				// newSupplier.Supplier_AddressGPSLocation 	= request.body.Supplier_AddressGPSLocation;
				// newSupplier.Supplier_StoreGPSLocation 		= request.body.Supplier_StoreGPSLocation;
				// newSupplier.Supplier_Category_IDs			= request.body.Supplier_Category_IDs;
				// newSupplier.Supplier_SupplierType_Codes		= request.body.Supplier_SupplierType_Codes;
				// newSupplier.Supplier_Rate					= request.body.Supplier_Rate;
				// newSupplier.Supplier_Class_Code 			= request.body.Supplier_Class_Code;
				newSupplier.Supplier_IsActive 				= 1;
				newSupplier.Supplier_Category_IDs			= [1];
				
				newSupplier.save(function(error, doneadd){
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

		editSupplier:function(request,res){
			var newvalues = { $set: {
				Supplier_Name   				: request.body.Supplier_Name,
				Supplier_Email					: request.body.Supplier_Email,
				Supplier_Country_Code			: request.body.Supplier_Country_Code,
				Supplier_City	 				: request.body.Supplier_City,
				Supplier_Address	 			: request.body.Supplier_Address,
				Supplier_Phone	 				: request.body.Supplier_Phone,
				Supplier_FaceBook        		: request.body.Supplier_FaceBook,
				Supplier_PaymentMethod_Codes   	: request.body.Supplier_PaymentMethod_Codes,
				Supplier_TimeOfDelivery  		: request.body.Supplier_TimeOfDelivery,
				Supplier_Agencies	 		 	: request.body.Supplier_Agencies,	 
				Supplier_Certificates	 		: request.body.Supplier_Certificates,
				Supplier_StoreAddress	 		: request.body.Supplier_StoreAddress,
				Supplier_WayOfDelivery_Codes	: request.body.Supplier_WayOfDelivery_Codes,
				Supplier_AddressGPSLocation 	: request.body.Supplier_AddressGPSLocation,
				Supplier_StoreGPSLocation 		: request.body.Supplier_StoreGPSLocation,
				Supplier_Category_IDs			: request.body.Supplier_Category_IDs,
				Supplier_SupplierType_Codes		: request.body.Supplier_SupplierType_Codes,
				Supplier_Rate					: request.body.Supplier_Rate,
				Supplier_Class_Code				: request.body.Supplier_Class_Code,
				Supplier_IsActive				: request.body.Supplier_IsActive
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
		},

		editSupplierContact:function(request,res){
			console.log(request.body)
			var myquery = { Supplier_Code: request.body.Supplier_Code }; 

			var newvalues = { 
				Supplier_Contact	 		: request.body.Supplier_Contact,
			 };
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