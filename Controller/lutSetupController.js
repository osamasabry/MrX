var SupplierType 	= require('../Model/lut_supplier_types');
var SupplierClass 	= require('../Model/lut_classes');
var Country 		= require('../Model/countries');
var PaymentMethod 	= require('../Model/lut_payment_methods');
var WayOfDelivery 	= require('../Model/lut_ways_of_delivery');
var Form 			= require('../Model/lut_form');
var Packing 		= require('../Model/lut_packing');
var ProductCategory = require('../Model/lut_product_category');
var Release 		= require('../Model/lut_release');
var StorageType 	= require('../Model/lut_storage_type');




module.exports = {

		getCountries:function(req,res){
			Country.find({})
			.select('Country_Code Country_Name')
			.exec(function(err, ctry) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(ctry) {
		    		res.send(ctry);
				}else{
		    		res.send("no Country");
				}
			})
		},

		getSupplierTypes:function(req,res){
			SupplierType.find({})
			.select('SupplierType_Code SupplierType_Name')
			.exec(function(err, supptype) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(supptype) {
		    		res.send(supptype);
				}else{
		    		res.send("no data");
				}
			})
		},

		getClasses:function(req,res){
			SupplierClass.find({})
			.select('Class_Code Class_Name')
			.exec(function(err, suplierclass) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(suplierclass) {
		    		res.send(suplierclass);
				}else{
		    		res.send("no data");
				}
			})
		},
		
		getPaymentMethods:function(req,res){
			PaymentMethod.find({})
			.select('PaymentMethod_Code PaymentMethod_Name')
			.exec(function(err, paymentMethod) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(paymentMethod) {
		    		res.send(paymentMethod);
				}else{
		    		res.send("no data");
				}
			})
		},

		getWaysOfDelivery:function(req,res){
			WayOfDelivery.find({})
			.select('WayOfDelivary_Code WayOfDelivary_Name')
			.exec(function(err, waysofDelivery) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(waysofDelivery) {
		    		res.send(waysofDelivery);
				}else{
		    		res.send("no data");
				}
			})
		},

		getForm:function(req,res){
			Form.find({})
			.select('Form_Code Form_Name')
			.exec(function(err, form) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(form) {
		    		res.send(form);
				}else{
		    		res.send("no Form");
				}
			})
		},

		getPacking:function(req,res){
			Packing.find({})
			.select('Packing_Code Packing_Name')
			.exec(function(err, packing) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(packing) {
		    		res.send(packing);
				}else{
		    		res.send("no Packing");
				}
			})
		},

		getProductCategory:function(req,res){
			ProductCategory.find({})
			.select('ProductCategory_Code ProductCategory_Name')
			.exec(function(err, product_category) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product_category) {
		    		res.send(product_category);
				}else{
		    		res.send("no Product Category");
				}
			})
		},

		getRelease:function(req,res){
			Release.find({})
			.select('Release_Code Release_Name')
			.exec(function(err, release) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(release) {
		    		res.send(release);
				}else{
		    		res.send("no Release");
				}
			})
		},

		getStorageType:function(req,res){
			StorageType.find({})
			.select('StorageType_Code StorageType_Name')
			.exec(function(err, storagetype) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(storagetype) {
		    		res.send(storagetype);
				}else{
		    		res.send("no Storage Type");
				}
			})
		},

		

}