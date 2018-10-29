var SupplierType = require('../Model/lut_supplier_types');
var SupplierClass = require('../Model/lut_classes');
var Country = require('../Model/countries');
var PaymentMethod = require('../Model/lut_payment_methods');
var WayOfDelivery = require('../Model/lut_ways_of_delivery');


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
		}
}