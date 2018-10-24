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
        Supplier_Product_Ids    :[Number],
        Supplier_Contact        :[{
            Supplier_ContactTitle           : String,
            Supplier_ContactName            : String,
            Supplier_ContactTelphone        : [String],
            Supplier_ContactEmail           : [String],
            
        },{
            toObject: { virtuals: true }
        }],

        Supplier_FaceBook               :String,
        Supplier_PaymentMethod          :String,
        Supplier_TimeOfDelivery         :Number,
        Supplier_Agency                 :String,
        Supplier_Certificate            :String,
        Supplier_StoreAddress           :String,
        Supplier_WayOfDelivery          :String,
        Supplier_AddressGPSLocation     :String,
        Supplier_StoreGPSLocation       :String,
        Supplier_Category               :[Number],
        Supplier_Type                   :[String],
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
