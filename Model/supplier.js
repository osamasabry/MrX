var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var Hcm_SupplierSchema = mongoose.Schema({
   
		Supplier_Code        	:Number,
        Supplier_Name    	 	:String,
        Supplier_Email    		:String,
        Supplier_Password    	:String,
        Supplier_Country    	:String,
        Supplier_City    		:String,
        Supplier_Address    	:String,
        Supplier_Phone    		:Number,
        Supplier_Contact    	:Number,
        Supplier_Product_Ids    :[Number],


});

Hcm_SupplierSchema.methods.verifyPassword = function(password) {
    if(password.localeCompare(this.Supplier_Password) == 0)
        return 1;
    else
        return 0;
};


// Hcm_SupplierSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

module.exports = mongoose.model('hcm_supplier', Hcm_SupplierSchema);
