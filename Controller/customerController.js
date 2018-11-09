var Customer = require('../Model/customer');

var Supplier = require('../Model/supplier');
var Category = require('../Model/category');

var SupplierType 	= require('../Model/lut_supplier_types');
var SupplierClass 	= require('../Model/lut_classes');
var Country 		= require('../Model/countries');
var PaymentMethod 	= require('../Model/lut_payment_methods');
var WayOfDelivery 	= require('../Model/lut_ways_of_delivery');




module.exports = {
		getCustomer:function(req,res){
			Customer.find({})
			.select('Customer_Code Customer_Name')
			.exec(function(err, customer) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(customer) {
		    		res.send(customer);
				}else{
		    		res.send("not Customer");
				}
			})
		},
		
		getAllCustomer:function(req,res){
			Customer.find({})
			.populate({ path: 'Category', select: 'Category_Name' })
			.populate({ path: 'CustomerType', select: 'SupplierType_Name' })
			.populate({ path: 'CustomerClass', select: 'Class_Name' })
			.populate({ path: 'country', select: 'Country_Name Country_Tcode' })
			.populate({ path: 'PaymentMethod', select: 'PaymentMethod_Name' })
			.populate({ path: 'WayOfDelivery', select: 'WayOfDelivary_Name' })
			.populate({ path: 'SellingArea', select: 'SellingArea_Name' })
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

		addCustomer:function(request,res){
			Customer.getLastCode(function(err,customer){
				if (customer) 
					InsertIntoCustomer(customer.Customer_Code+1);
				else
					InsertIntoCustomer(1);
			});

			function InsertIntoCustomer(NextCode){

				var newCustomer = new Customer();
				newCustomer.Customer_Code     	 	 		= NextCode;
				newCustomer.Customer_Name 	     	 		= request.body.Customer_Name;
				newCustomer.Customer_Email   		 		= request.body.Customer_Email;
				newCustomer.Customer_Country_Code	 		= request.body.Customer_Country_Code;
				newCustomer.Customer_City	 		 		= request.body.Customer_City;
				newCustomer.Customer_Address	 	 		= request.body.Customer_Address;
				newCustomer.Customer_Phone	 		 		= request.body.Customer_Phone;
				newCustomer.Customer_FaceBook        		= request.body.Customer_FaceBook;
				newCustomer.Customer_PaymentMethod_Codes   	= request.body.Customer_PaymentMethod_Codes;
				newCustomer.Customer_Agencies 		 		= request.body.Customer_Agencies;	 
				newCustomer.Customer_Certificates	 		= request.body.Customer_Certificates;
				newCustomer.Customer_StoreAddress	 		= request.body.Customer_StoreAddress;
				newCustomer.Customer_WayOfDelivery_Codes	= request.body.Customer_WayOfDelivery_Codes;
				newCustomer.Customer_AddressGPSLocation 	= request.body.Customer_AddressGPSLocation;
				newCustomer.Customer_StoreGPSLocation 		= request.body.Customer_StoreGPSLocation;
				newCustomer.Customer_Category_IDs			= request.body.Customer_Category_IDs;
				newCustomer.Customer_CustomerType_Codes		= request.body.Customer_CustomerType_Codes;
				newCustomer.Customer_Rate					= request.body.Customer_Rate;
				newCustomer.Customer_Class_Code 			= request.body.Customer_Class_Code;
				newCustomer.Customer_IsActive 				= 1;
				newCustomer.Customer_SellingAreaCodes       = request.body.Customer_SellingAreaCodes;
				newCustomer.save(function(error, doneadd){
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

		editCustomer:function(request,res){
			var newvalues = { $set: {
				Customer_Name   			: request.body.Customer_Name,
				Customer_Email				: request.body.Customer_Email,
				Customer_Country			: request.body.Customer_Country,
				Customer_City	 			: request.body.Customer_City,
				Customer_Address	 		: request.body.Customer_Address,
				Customer_Phone	 			: request.body.Customer_Phone,
				Customer_FaceBook        	: request.body.Customer_FaceBook,
				Customer_PaymentMethod   	: request.body.Customer_PaymentMethod,
				Customer_Agency 		 	: request.body.Customer_Agency,	 
				Customer_Certificate	 	: request.body.Customer_Certificate,
				Customer_StoreAddress	 	: request.body.Customer_StoreAddress,
				Customer_WayOfDelivery	 	: request.body.Customer_WayOfDelivery,
				Customer_AddressGPSLocation : request.body.Customer_AddressGPSLocation,
				Customer_StoreGPSLocation 	: request.body.Customer_StoreGPSLocation,
				Customer_Category			: request.body.Customer_Category,
				Customer_Type				: request.body.Customer_Type,
				Customer_SellingAreaCodes   : request.body.Customer_SellingAreaCodes,
			} };
			var myquery = { Customer_Code: request.body.Customer_Code }; 
			Customer.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Customer not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

		editCustomerContact:function(request,res){
			var myquery = { Customer_Code: request.body.Customer_Code }; 

			var newvalues = { 
				Customer_Contact	 		: request.body.Customer_Contact,
			 };
			Customer.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Customer not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		}
}