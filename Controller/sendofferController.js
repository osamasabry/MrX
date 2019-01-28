
var SendOffer = require('../Model/send_offer');

var Customer = require('../Model/customer');
var Supplier = require('../Model/supplier');
var Prodcut = require('../Model/product');

var crypto = require('crypto'),
 algorithm = 'aes-256-ctr',
  password = 'd6F3Efeq';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = {
		
		getAllSendOffer:function(request,res){
			SendOffer.find({})
			.populate({ path: 'Customer', select: 'Customer_Name' })
			.populate({ path: 'Product', select: 'Product_Name' })
			.populate({ path: 'Weight', select: 'Weight_Name' })
			.lean()
			.exec(function(err, offer) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(offer) {
					res.send(offer);
					
				}else{
		    		res.send("not Offers");
				}
			})
		},

		addSendOffer:function(request,res,URL){
			// console.log(URL);
			// var arrayOfCustomers = [];
			// var Products = reques;
			// arrayOfCustomers = [
			// 	{
			// 		Customer_ID : 1,
			// 		Customer_Email : 'osamasabry14@gmail.com',
			// 		Price_Status :0
			// 	}
				// ,
				// {
				// 	Customer_ID : 2,
				// 	Customer_Email : 'mahmoud@gmail.com',
				// 	Price_Status :0
				// },

			//];

			// arrayOfProducts = [
			// 	{
			// 		Product_ID : 1,
			// 		Quantity_Required : 300,
			// 		Weight_ID :1
			// 	},
			// 	{
			// 		Product_ID : 2,
			// 		Quantity_Required : 500,
			// 		Weight_ID :2
			// 	},

			// ];

			if (request.body.Category_ID) {
				CheckData();		
			}else{
				arrayOfCustomers = request.body.SendOffer_Customer;
				GetlastID();
			}

			function CheckData(){
				Customer.find({Customer_Category_IDs:request.body.Category_ID})
				.populate({path: 'Category', select: 'Category_ID Category_Name'})
				.lean()
				.exec(function(err, customer) {
					if (err){
			    		return res.send({
							message: err
						});
			    	} else if(customer) {
			    		for (var i = customer.length - 1; i >= 0; i--) {
							var customerobject = {};
							customerobject.Customer_ID = customer[i]._id;
							customerobject.Customer_Email = customer[i].Customer_Email;
							customerobject.Price_Status = 0;
			    			arrayOfCustomers.push(customerobject);
			    			
			    		}
		    			GetlastID();
					}else{
			    		res.send("Customer not found");
					}
				})
			}

			function GetlastID (){

				SendOffer.getLastCode(function(err,sendoffer){
					if (sendoffer) 
						InsertIntoSendOffer(sendoffer.SendOffer_Code+1);
					else
						InsertIntoSendOffer(1);
				});
			}

			function InsertIntoSendOffer(NextCode){

				var newSendOffer = new SendOffer();
				newSendOffer.SendOffer_Code        	        = NextCode;
		        newSendOffer.SendOffer_Create_Date          = request.body.SendOffer_Create_Date;
		        newSendOffer.SendOffer_Valid_Till    	    = request.body.SendOffer_Valid_Till;
		        newSendOffer.SendOffer_Product              = request.body.SendOffer_Product;
		        newSendOffer.SendOffer_Title                = request.body.SendOffer_Title;
		        
		        // newSendOffer.SendOffer_Product              = arrayOfProducts;
				newSendOffer.SendOffer_Customer     	 	= arrayOfCustomers;
				newSendOffer.SendOffer_Status 	     	 	= request.body.SendOffer_Status;
				
				newSendOffer.save(function(error, doneadd){
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

			function encrypt(text){
			    var cipher = crypto.createCipher(algorithm,password)
			    var crypted = cipher.update(text,'utf8','hex')
			    crypted += cipher.final('hex');
			    return crypted;
			}

			function drawtable(data){

				html = '<table><tr><th>Product Name</th><th>Quantity Required</th><th>Weight</th><th>Price</th><th>Details</th></tr>';
				for (var i = 0; i < data.length; i++) {
					var product_id = encrypt(String(data[i].Product_ID))
					html += '<tr><td>'+data[i].Product_Name+'</td>';
					html += '<td>'+data[i].Quantity_Required+'</td>';
					html += '<td>'+data[i].Weight_Name+'</td></tr>';
					html += '<td>'+data[i].Price+'</td></tr>';
					html += '<td><a href='+URL+'show-details/'+product_id+'>Click Here</a></td></tr>';
					
				}
  				html +='</table>';
  				html +='<br><h3>This Offer Vaild Till: '+request.body.SendOffer_Valid_Till+'</h3>'
  				return html;
			}
			
			function SendEmail(row){
				// url: http://highchem.winexme.com/#!/supplier-pricing?spid=asdfsadf&rqid=fgsdfg
				var row_id = row._id;
				row_id = encrypt(String(row_id));
				// console.log('row_id: '+row_id);
				for (var i = row.SendOffer_Customer.length - 1; i >= 0; i--) {
					var customer_id = encrypt(String(row.SendOffer_Customer[i]._id)); 
					// console.log('customer_id: '+customer_id);
					 const msg = {
					  to: row.SendOffer_Customer[i].Customer_Email,
					  from: 'info@winexme.com',
					  subject: 'Offer',
					  text: 'please fill from',
					  // html: '<h1><a href='+URL+'supplier-pricing/'+supplier_id+'/'+row_id+'></a></h1>',
					  // html:'Hello , Show Offer </br><h4><a href='+URL+'customer-show-offer/'+customer_id+'/'+row_id+'>Open Form To Show Offer (click here)</a></h4>',
					  html:drawtable(request.body.SendOffer_Product),
					};
					// console.log(msg);
					sgMail.send(msg); 
				}

				return res.send({
					message: true
				});
			}
		},

		// updateRequestPrice:function(request,res){
		
		// 	var myquery = { 
		// 		_id	 						: request.body.ID,
		// 		'RequestPrice_Supplier._id' : request.body.RequestPrice_Supplier_ID 
		// 	}; 

		// 	var newvalues = { 
		// 			$set: {
		// 					"RequestPrice_Supplier.$.Valid_Till"   : request.body.Valid_Till,
		// 					"RequestPrice_Supplier.$.Price_Status" : 1,
		// 					"RequestPrice_Supplier.$.Details"      : request.body.RequestPrice_Details,	
		// 					"RequestPrice_Status"  				   : 1,
		// 			 },

		// 	 },options = {upsert: true};

		// 	RequestPrice.findOneAndUpdate( myquery,newvalues,options, function(err, field) {
	 //    	    if (err){
	 //    	    	return res.send({
		// 				message: 'Error'
		// 			});
	 //    	    }
	 //            if (!field) {
	 //            	return res.send({
		// 				message: 'Request Price not exists'
		// 			});
	 //            } else {

	 //                return res.send({
		// 				message: true
		// 			});
		// 		}
		// 	})
		// },

		// getSendOfferByID:function(request,res){

		// 	function decrypt(text){
		// 	  	var decipher = crypto.createDecipher(algorithm,password)
		// 	  	var dec = decipher.update(text,'hex','utf8')
		// 	  	dec += decipher.final('utf8');
		// 	  	return dec;
		// 	}
			
		// 	var  id = decrypt(request.body.row_id);
		// 	var customer_id = decrypt(request.body.customer_id);
		// 	SendOffer.findOne({_id:id }).then((data) => {
		// 		var status = data.SendOffer_Customer.filter((object) => {
		// 			return object["_id"] == customer_id;
		// 	})
		// 		if (status[0].Price_Status==0) {
		// 			dataSendOffer();
		// 		}else{
		// 			res.send("Link Is Expired");
		// 		}
		// 	})

		// 	function dataSendOffer(){
		// 		SendOffer.findOne({_id:id})
		// 		// .select('SendOffer_Product SendOffer_Valid_Till')
		// 		.populate({ path: 'Product', select: 'Product_Name' })
		// 		.populate({ path: 'Weight', select: 'Weight_Name' })
		// 		.lean()
		// 		.exec(function(err, sendoffer) {
		// 			if (err){
		// 	    		return res.send({
		// 					message: err
		// 				});
		// 	    	} else if(sendoffer) {
		// 				res.send(sendoffer);
						
		// 			}else{
		// 	    		res.send("not Offer");
		// 			}
		// 		})
		// 	}
		// },

		getProductByID:function(request,res){
			function decrypt(text){
			  	var decipher = crypto.createDecipher(algorithm,password)
			  	var dec = decipher.update(text,'hex','utf8')
			  	dec += decipher.final('utf8');
			  	return dec;
			}
			var  product_id = decrypt(request.body.row_id);
			Prodcut.findOne({Product_Code:product_id})
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
			.populate({ path: 'weight', select: 'Weight_Code Weight_Name' })
			.populate({ path: 'concentration', select: 'Concentration_Code Concentration_Name' })
			.lean()
			.exec(function(err, sendoffer) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(sendoffer) {
					res.send(sendoffer);
					
				}else{
		    		res.send("not Offer");
				}
			})
		},
}