var SupplierType 	= require('../Model/lut_supplier_types');
var SupplierClass 	= require('../Model/lut_classes');
var Country 		= require('../Model/countries');
var PaymentMethod 	= require('../Model/lut_payment_methods');
var WayOfDelivery 	= require('../Model/lut_ways_of_delivery');
var Form 			= require('../Model/lut_form');
var Packing 		= require('../Model/lut_packing');
var ProductCategory = require('../Model/lut_product_category');
var ReleaseType 	= require('../Model/lut_release_type');
var StorageType 	= require('../Model/lut_storage_type');
var SellingArea 	= require('../Model/lut_sell_area');





module.exports = {
	/******************country ***********/
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

		addCountry:function(req,res){
			Country.getLastCode(function(err,country){
				if (country) 
					InsertIntoCountry(country.Country_Code+1);
				else
					InsertIntoCountry(1);
			});

			function InsertIntoCountry(NextCode){
				var newCountry 	= new Country();

				newCountry.Country_Code    	 = NextCode;
				newCountry.Country_Name   	 = request.body.Country_Name;
				newCountry.Country_IsActive	 = 1;
				newCountry.Country_Tcode	 = request.body.Country_Tcode;
				
				newCountry.save(function(error, doneadd){
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

		editCountry:function(request,res){

			var myquery = { Country_Code: request.body.Country_Code }; 
			var newvalues = { 
				Country_Name	 		: request.body.Country_Name,
				Country_IsActive	 	: request.body.Country_IsActive,
				Country_Tcode	 		: request.body.Country_Tcode,

			 };
			Country.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Country not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},
	/****************** Supplier Types ***********/

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

		addSupplierType:function(req,res){
			SupplierType.getLastCode(function(err,suppliertype){
				if (suppliertype) 
					InsertIntoSupplierType(suppliertype.SupplierType_Code+1);
				else
					InsertIntoSupplierType(1);
			});

			function InsertIntoSupplierType(NextCode){

				var newSupplierType = new SupplierType();
				newSupplierType.SupplierType_Code    	 = NextCode;
				newSupplierType.SupplierType_Name   	 = request.body.SupplierType_Name;
				newSupplierType.SupplierType_Description = request.body.SupplierType_Description;
				newSupplierType.SupplierType_IsActive	 = 1;
				
				newSupplierType.save(function(error, doneadd){
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

		editSupplierType:function(request,res){

			var myquery = { SupplierType_Code: request.body.SupplierType_Code }; 
			var newvalues = { 
				SupplierType_Name	 		: request.body.SupplierType_Name,
				SupplierType_Description	: request.body.SupplierType_Description,
				SupplierType_IsActive	 	: request.body.SupplierType_IsActive,

			 };
			SupplierType.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Supplier Type not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

	/****************** Supplier Class ***********/

		getClasses:function(req,res){
			SupplierClass.find({})
			.select('Class_Code Class_Name Class_Description Class_IsActive')
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
<<<<<<< HEAD
		addSupplierClass:function(request,res){
=======

		addSupplierClass:function(req,res){
>>>>>>> 2b2b7c1a542906646953bb349ef96e41c97ab635
			SupplierClass.getLastCode(function(err,supplierclass){
				if (supplierclass) 
					InsertIntoSupplierClass(supplierclass.Class_Code+1);
				else
					InsertIntoSupplierClass(1);
			});

			function InsertIntoSupplierClass(NextCode){

				var newSupplierClass = new SupplierClass();
				newSupplierClass.Class_Code    		 = NextCode;
				newSupplierClass.Class_Name   	 	 = request.body.Class_Name;
				newSupplierClass.Class_Description   = request.body.Class_Description;
				newSupplierClass.Class_IsActive		 = 1;
				
				newSupplierClass.save(function(error, doneadd){
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

		editSupplierClass:function(request,res){

			var myquery = { Class_Code: request.body.Class_Code }; 
			var newvalues = { 
				Class_Name	 		: request.body.Class_Name,
				Class_Description	: request.body.Class_Description,
				Class_IsActive	 	: request.body.Class_IsActive,

			 };
			SupplierClass.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Supplier Class not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},
	
	/****************** Paymnet Methods ***********/
		
		getPaymentMethods:function(req,res){
			PaymentMethod.find({})
			.select('PaymentMethod_Code PaymentMethod_Name PaymentMethod_Description PaymentMethod_IsActive')
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

<<<<<<< HEAD
		// GetNextCodePaymentMethods:function(req,res){
		// 	PaymentMethod.getLastCode(function(err,paymentmethod){
		// 		if (paymentmethod) 
		// 			res.send( Number(paymentmethod.PaymentMethod_Code)+1);
		// 		else
		// 			res.send(1);
		// 	})
		// },

		addPaymentMethod:function(request,res){
=======
		addPaymentMethod:function(req,res){
>>>>>>> 2b2b7c1a542906646953bb349ef96e41c97ab635

			PaymentMethod.getLastCode(function(err,paymentmethod){
				if (paymentmethod) 
					InsertIntoPaymentMethod(paymentmethod.PaymentMethod_Code+1);
				else
					InsertIntoPaymentMethod(1);
			});	

			function InsertIntoPaymentMethod(NextCode){

				var newPaymentMethod = new PaymentMethods();
				newPaymentMethod.PaymentMethod_Code    		 = NextCode;
				newPaymentMethod.PaymentMethod_Name   	 	 = request.body.PaymentMethod_Name;
				newPaymentMethod.PaymentMethod_Description   = request.body.PaymentMethod_Description;
				newPaymentMethod.PaymentMethod_IsActive		 = 1;
				
				newPaymentMethod.save(function(error, doneadd){
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

		editPaymentMethod:function(request,res){

			var myquery = { PaymentMethod_Code: request.body.PaymentMethod_Code }; 
			var newvalues = { 
				PaymentMethod_Name	 		: request.body.PaymentMethod_Name,
				PaymentMethod_Description	: request.body.PaymentMethod_Description,
				PaymentMethod_IsActive	 	: request.body.PaymentMethod_IsActive,

			 };
			PaymentMethod.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Payment Method not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

	/****************** Ways Of Delivery ***********/

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

		addWaysOfDelivery:function(req,res){

			WayOfDelivery.getLastCode(function(err,wayofdelivery){
				if (wayofdelivery) 
					InsertIntoWayOfDelivery(wayofdelivery.WayOfDelivary_Code+1);
				else
					InsertIntoWayOfDelivery(1);
			});
			function InsertIntoWayOfDelivery(NextCode){

				var newWayOfDelivery = new WayOfDelivery();
				newWayOfDelivery.WayOfDelivary_Code    		 = NextCode;
				newWayOfDelivery.WayOfDelivary_Name   	 	 = request.body.WayOfDelivary_Name;
				newWayOfDelivery.WayOfDelivary_Description   = request.body.WayOfDelivary_Description;
				newWayOfDelivery.WayOfDelivary_IsActive		 = 1;
				
				newWayOfDelivery.save(function(error, doneadd){
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

		editWaysOfDelivery:function(request,res){

			var myquery = { WayOfDelivary_Code: request.body.WayOfDelivary_Code }; 
			var newvalues = { 
				WayOfDelivary_Name	 		: request.body.WayOfDelivary_Name,
				WayOfDelivary_Description	: request.body.WayOfDelivary_Description,
				WayOfDelivary_IsActive	 	: request.body.WayOfDelivary_IsActive,

			 };
			WayOfDelivery.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Way Of Delivery not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

	/****************** Form ***********/
		getForm:function(req,res){
			Form.find({})
			.select('Form_Code Form_Name Form_Description Form_IsActive')
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

<<<<<<< HEAD
		// GetNextCodeForm:function(req,res){
		// 	Form.getLastCode(function(err,form){
		// 		if (form) 
		// 			res.send( Number(form.Form_Code)+1);
		// 		else
		// 			res.send(1);
		// 	})
		// },

		addForm:function(request,res){
=======
		addForm:function(req,res){
>>>>>>> 2b2b7c1a542906646953bb349ef96e41c97ab635
			Form.getLastCode(function(err,form){
				if (form) 
					InsertIntoForm(form.Form_Code+1);
				else
					InsertIntoForm(1);
			});

			function InsertIntoForm(NextCode){
				var newForm = new Form();
				newForm.Form_Code    		 = NextCode;
				newForm.Form_Name   	 	 = request.body.Form_Name;
				newForm.Form_Description  	 = request.body.Form_Description;
				newForm.Form_IsActive		 = 1;
				
				newForm.save(function(error, doneadd){
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

		editForm:function(request,res){

			var myquery = { Form_Code: request.body.Form_Code }; 
			var newvalues = { 
				Form_Name	 		: request.body.Form_Name,
				Form_Description	: request.body.Form_Description,
				Form_IsActive	 	: request.body.Form_IsActive,

			 };
			Form.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Form not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

	/****************** Packing ***********/

		getPacking:function(req,res){
			Packing.find({})
			.select('Packing_Code Packing_Name Packing_Description Packing_IsActive')
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

<<<<<<< HEAD
		// GetNextCodePacking:function(req,res){
		// 	Packing.getLastCode(function(err,packing){
		// 		if (packing) 
		// 			res.send( Number(packing.Packing_Code)+1);
		// 		else
		// 			res.send(1);
		// 	})
		// },

		addPacking:function(request,res){
=======
		addPacking:function(req,res){
>>>>>>> 2b2b7c1a542906646953bb349ef96e41c97ab635
			Packing.getLastCode(function(err,packing){
				if (packing) 
					InsertIntoPacking(packing.Packing_Code+1);
				else
					InsertIntoPacking(1);
			});

			function InsertIntoPacking(NextCode){

				var newPacking = new Packing();
				newPacking.Packing_Code    		 = NextCode;
				newPacking.Packing_Name   	 	 = request.body.Packing_Name;
				newPacking.Packing_Description   = request.body.Packing_Description;
				newPacking.Packing_IsActive		 = 1;
				
				newPacking.save(function(error, doneadd){
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

		editPacking:function(request,res){

			var myquery = { Packing_Code: request.body.Packing_Code }; 
			var newvalues = { 
				Packing_Name	 		: request.body.Packing_Name,
				Packing_Description	 	: request.body.Packing_Description,
				Packing_IsActive	 	: request.body.Packing_IsActive,

			 };
			Packing.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Packing not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

	/****************** Product Category ***********/

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

		addProductCategory:function(req,res){

			ProductCategory.getLastCode(function(err,productcategory){
				if (productcategory) 
					InsertIntoProductCategory(productcategory.ProductCategory_Code+1);
				else
					InsertIntoProductCategory(1);
			});

			function InsertIntoProductCategory(NextCode){

				var newProductCategory = new ProductCategory();
				newProductCategory.ProductCategory_Code    		 = NextCode;
				newProductCategory.ProductCategory_Name   	 	 = request.body.ProductCategory_Name;
				newProductCategory.ProductCategory_Description   = request.body.ProductCategory_Description;
				newProductCategory.ProductCategory_IsActive		 = 1;
				
				newProductCategory.save(function(error, doneadd){
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

		editProductCategory:function(request,res){

			var myquery = { ProductCategory_Code: request.body.ProductCategory_Code }; 
			var newvalues = { 
				ProductCategory_Name	 		: request.body.ProductCategory_Name,
				ProductCategory_Description	 	: request.body.ProductCategory_Description,
				ProductCategory_IsActive	 	: request.body.ProductCategory_IsActive,

			 };
			ProductCategory.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Product Category not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},
	/****************** Release Type ***********/

		getReleaseType:function(req,res){
			ReleaseType.find({})
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
		
		addReleaseType:function(req,res){
			ReleaseType.getLastCode(function(err,releasetype){
				if (releasetype) 
					InsertIntoReleaseType(releasetype.ReleaseType_Code+1);
				else
					InsertIntoReleaseType(1);
			});

			function InsertIntoReleaseType(NextCode){

				var newReleaseType = new ReleaseType();
				newReleaseType.ReleaseType_Code    		 = NextCode;
				newReleaseType.ReleaseType_Name   	 	 = request.body.ReleaseType_Name;
				newReleaseType.ReleaseType_Description   = request.body.ReleaseType_Description;
				newReleaseType.ReleaseType_IsActive		 = 1;
				
				newReleaseType.save(function(error, doneadd){
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

		editReleaseType:function(request,res){

			var myquery = { ReleaseType_Code: request.body.ReleaseType_Code }; 
			var newvalues = { 
				ReleaseType_Name	 		: request.body.ReleaseType_Name,
				ReleaseType_Description	 	: request.body.ReleaseType_Description,
				ReleaseType_IsActive	 	: request.body.ReleaseType_IsActive,

			 };
			ReleaseType.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Release Type not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},
	/****************** Storage Type ***********/

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

		// GetNextCodeStorageType:function(req,res){
		// 	StorageType.getLastCode(function(err,storagetype){
		// 		if (storagetype) 
		// 			res.send( Number(storagetype.StorageType_Code)+1);
		// 		else
		// 			res.send(1);
		// 	})
		// },

		addStorageType:function(req,res){

			StorageType.getLastCode(function(err,storagetype){
				if (storagetype) 
					InsertIntoStorageType(storagetype.StorageType_Code+1);
				else
					InsertIntoStorageType(1);
			});

			function InsertIntoStorageType(NextCode){
				var newStorageType = new StorageType();
				newStorageType.StorageType_Code    		 = NextCode;
				newStorageType.StorageType_Name   	 	 = request.body.StorageType_Name;
				newStorageType.StorageType_Description   = request.body.StorageType_Description;
				newStorageType.StorageType_IsActive		 = 1;
				
				newStorageType.save(function(error, doneadd){
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

		editStorageType:function(request,res){

			var myquery = { StorageType_Code: request.body.StorageType_Code }; 
			var newvalues = { 
				StorageType_Name	 		: request.body.StorageType_Name,
				StorageType_Description	 	: request.body.StorageType_Description,
				StorageType_IsActive	 	: request.body.StorageType_IsActive,

			 };
			StorageType.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Storage Type not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

/****************** Selling Area ***********/

		getSellingArea:function(req,res){
			SellingArea.find({})
			.select('SellingArea_Code SellingArea_Name')
			.exec(function(err, sellingarea) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(sellingarea) {
		    		res.send(sellingarea);
				}else{
		    		res.send("no Selling Area");
				}
			})
		},

		addSellingArea:function(req,res){

			SellingArea.getLastCode(function(err,sellingarea){
				if (sellingarea) 
					InsertIntoSellingArea(sellingarea.SellingArea_Code+1);
				else
					InsertIntoSellingArea(1);
			});

			function InsertIntoSellingArea(NextCode){
				var newSellingArea = new SellingArea();
				newSellingArea.SellingArea_Code    		 = NextCode;
				newSellingArea.SellingArea_Name   	 	 = request.body.SellingArea_Name;
				newSellingArea.SellingArea_Description   = request.body.SellingArea_Description;
				newSellingArea.SellingArea_IsActive		 = 1;
				
				newSellingArea.save(function(error, doneadd){
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

		editSellingArea:function(request,res){

			var myquery = { SellingArea_Code: request.body.SellingArea_Code }; 
			var newvalues = { 
				SellingArea_Name	 		: request.body.SellingArea_Name,
				SellingArea_Description	 	: request.body.SellingArea_Description,
				SellingArea_IsActive	 	: request.body.SellingArea_IsActive,

			 };
			SellingArea.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Selling Area not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

}	