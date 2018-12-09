
var RequestPrice = require('../Model/request_price');

var Customer = require('../Model/customer');
var Supplier = require('../Model/supplier');
var Prodcut = require('../Model/product');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



module.exports = {
		
		addRequestPrice:function(request,res){
			var arrayOfSuppliers = [];

			if (request.body.Category_ID) {
				CheckData();		
			}else{
				arrayOfSuppliers = request.body.Supplier_ID;
				GetlastID();
			}

			function CheckData(){
				Supplier.find({Supplier_Category_IDs:request.body.Category_ID})
				.populate({path: 'Category', select: 'Category_ID Category_Name'})
				.lean()
				.exec(function(err, supplier) {
					if (err){
			    		return res.send({
							message: err
						});
			    	} else if(supplier) {
			    		for (var i = supplier.length - 1; i >= 0; i--) {
							var supplierTest = {};
							supplierTest.Supplier_ID = supplier[i]._id;
							supplierTest.Supplier_Email = supplier[i].Supplier_Email;
			    			arrayOfSuppliers.push(supplierTest);
			    			
			    		}
		    			GetlastID();
					}else{
			    		res.send("Supplier not found");
					}
				})
			}

			function GetlastID (){

				RequestPrice.getLastCode(function(err,requestprice){
					if (requestprice) 
						InsertIntoRequestPrice(requestprice.RequestPrice_Code+1);
					else
						InsertIntoRequestPrice(1);
				});
			}

			function InsertIntoRequestPrice(NextCode){

				var newRequestPrice = new RequestPrice();
				newRequestPrice.RequestPrice_Code        	        = NextCode;
		        newRequestPrice.RequestPrice_Customer_ID    	    = request.body.RequestPrice_Customer_ID;
		        newRequestPrice.RequestPrice_Product           		= request.body.RequestPrice_Product;
				newRequestPrice.RequestPrice_Supplier     	 	 	= arrayOfSuppliers;
				newRequestPrice.RequestPrice_Status 	     	 	= request.body.RequestPrice_Status;
				
				newRequestPrice.save(function(error, doneadd){
					if(error){
						console.log(error)
						return res.send({
							message: error
						});
					}
					else{

						SendEmail(doneadd);
						
					}
				});
			}

			function SendEmail(row){
				var row_id = row._id;
				for (var i = row.RequestPrice_Supplier.length - 1; i >= 0; i--) {
					 const msg = {
					  to: row.RequestPrice_Supplier[i].Supplier_Email,
					  from: 'dev@pharmedsolutions.com',
					  subject: 'Offer',
					  text: 'please fill from',
					  html: '<h1>Row ID'+row_id+'</h1><br><p>Supplier ID:'+row.RequestPrice_Supplier[i]._id+'</p>',
					};
					sgMail.send(msg); 
				}

				return res.send({
					message: true
				});
			}
		},


		updateRequestPrice:function(request,res){

			// var array = [
			// 	{
			// 		Product_ID			: 1 ,
			// 		Price       		: 500 ,
			// 		Quantity_Available  : 20,
			// 		Weight_ID			: 2
			// 	},

			// 	{
			// 		Product_ID			: 2 ,
			// 		Price       		: 300 ,
			// 		Quantity_Available  : 5,
			// 		Weight_ID			: 1
			// 	},

			// ]
			var myquery = { 
					_id	 						: request.body.ID,
					'RequestPrice_Supplier._id' : request.body.RequestPrice_Supplier_ID 
			}; 

			var newvalues = { 
					$set: {"RequestPrice_Supplier.$.Valid_Till" : request.body.Valid_Till,
							"RequestPrice_Supplier.$.Details" : array
					 },

			 },options = {upsert: true};


			RequestPrice.findOneAndUpdate( myquery,newvalues,options, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Request Price not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		}
}