var Customer = require('../Model/customer');
var Supplier = require('../Model/supplier');
var Category = require('../Model/category');
var Product = require('../Model/product');



module.exports = {

		getCustomerByProductID:function(req,res){
			Product.findOne({Product_Code:req.body.Product_Code})
			.populate({path: 'customer', select: 'Customer_Code Customer_Name'})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("Product not found");
				}
			})
		},

		getSupplierByProductID:function(req,res){
			Product.findOne({Product_Code:req.body.Product_Code})
			.populate({path: 'Supplier', select: 'Supplier_Code Supplier_Name'})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("Product not found");
				}
			})
		},

		getProductBySupplierID:function(req,res){
			Product.findOne({Product_Supplier_Codes:req.body.Product_Supplier_Codes})
			// .populate({path: 'Supplier', select: 'Supplier_Code Supplier_Name'})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("Product not found");
				}
			})
		},

		getCustomerByName:function(req,res){
			var Searchquery = req.body.Customer_Name;
			Customer.findOne({Customer_Name:{ $regex: new RegExp("^" + Searchquery.toLowerCase(), "i") }})
			.exec(function(err, customer) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(customer) {
		    		res.send(customer);
				}else{
		    		res.send("Customer not found");
				}
			})
		},

		getSupplierByName:function(req,res){
			var Searchquery = req.body.Supplier_Name;
			Supplier.findOne({Supplier_Name:{ $regex: new RegExp("^" + Searchquery.toLowerCase(), "i") }})
			.exec(function(err, supplier) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(supplier) {
		    		res.send(supplier);
				}else{
		    		res.send("Supplier not found");
				}
			})
		},

		getProductByName:function(req,res){
			var Searchquery = req.body.Product_Name;
			Product.findOne({Product_Name:{ $regex: new RegExp("^" + Searchquery.toLowerCase(), "i") }})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("Product not found");
				}
			})
		},

		getCustomerByCategoryID:function(req,res){
			Customer.findOne({Customer_Category_IDs:req.body.Customer_Category_ID})
			.populate({path: 'Category', select: 'Category_ID Category_Name'})
			.exec(function(err, customer) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(customer) {
		    		res.send(customer);
				}else{
		    		res.send("Customer not found");
				}
			})
		},

		getSupplierByCategoryID:function(req,res){
			Supplier.findOne({Supplier_Category_IDs:req.body.Supplier_Category_ID})
			.populate({path: 'Category', select: 'Category_ID Category_Name'})
			.exec(function(err, supplier) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(supplier) {
		    		res.send(supplier);
				}else{
		    		res.send("Supplier not found");
				}
			})
		},

		getProductByCategoryID:function(req,res){
			Product.findOne({Product_Category_ID:req.body.Product_Category_ID})
			.populate({path: 'Category', select: 'Category_ID Category_Name'})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("Product not found");
				}
			})
		},

		getProductByProductCategoryID:function(req,res){
			Product.findOne({Product_ProductCategory_Code:req.body.Product_ProductCategory_Code})
			.populate({path: 'productcategory', select: 'ProductCategory_Code ProductCategory_Name'})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("Product not found");
				}
			})
		},
}