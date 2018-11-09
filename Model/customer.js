var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var Hcm_CustomerSchema = mongoose.Schema({
   
		Customer_Code        	        :Number,
        Customer_Name    	 	        :String,
        Customer_Email    		        :String,
        Customer_Password    	        :String,
        Customer_Country_Code           :Number,
        Customer_City    		        :String,
        Customer_Address    	        :String,
        Customer_StoreAddress           :String,
        Customer_AddressGPSLocation     :String,
        Customer_StoreGPSLocation       :String,
        Customer_Phone    		        :Number,
        // Customer_Product_Ids            :[Number],
        Customer_Contact        :[{
            Customer_ContactTitle           : String,
            Customer_ContactName            : String,
            Customer_ContactTelphone        : [String],
            Customer_ContactEmail           : [String],
            
        },{
            toJSON: { virtuals: true }
        }],

        Customer_FaceBook               :String,
        Customer_PaymentMethod_Codes    :[Number],
        Customer_WayOfDelivery_Codes    :[Number],
        Customer_Agencies               :[String],
        Customer_Certificates           :[String],
        Customer_Category_IDs           :[Number],
        Customer_SupplierType_Codes     :[Number],
        Customer_Class_Code             :Number,
        Customer_Rate                   :Number,
        Customer_IsActive               :Number,
        Customer_SellingAreaCodes       :[Number]
},{
    toJSON: { virtuals: true }
});



Hcm_CustomerSchema.methods.verifyPassword = function(password) {
    if(password.localeCompare(this.Customer_Password) == 0)
        return 1;
    else
        return 0;
};


Hcm_CustomerSchema.virtual('Category',{
    ref: 'hcm_categories',
    localField: 'Customer_Category_IDs',
    foreignField: 'Category_ID',
    justOne: false // for many-to-1 relationships
});

Hcm_CustomerSchema.virtual('CustomerType',{
    ref: 'hcm_lut_supplier_types',
    localField: 'Customer_SupplierType_Codes',
    foreignField: 'SupplierType_Code',
    justOne: false // for many-to-1 relationships
});

Hcm_CustomerSchema.virtual('CustomerClass',{
    ref: 'hcm_lut_classes',
    localField: 'Customer_Class_Code',
    foreignField: 'Class_Code',
    justOne: true // for many-to-1 relationships
});

Hcm_CustomerSchema.virtual('country',{
    ref: 'hcm_countries',
    localField: 'Customer_Country_Code',
    foreignField: 'Country_Code',
    justOne: true // for many-to-1 relationships
});

Hcm_CustomerSchema.virtual('PaymentMethod',{
    ref: 'hcm_lut_payment_method',
    localField: 'Customer_PaymentMethod_Codes',
    foreignField: 'PaymentMethod_Code',
    justOne: false // for many-to-1 relationships
});

Hcm_CustomerSchema.virtual('WayOfDelivery',{
    ref: 'hcm_lut_ways_of_deliver',
    localField: 'Customer_WayOfDelivery_Codes',
    foreignField: 'WayOfDelivary_Code',
    justOne: false // for many-to-1 relationships
});


Hcm_CustomerSchema.virtual('SellingArea',{
    ref: 'hcm_lut_sell_area',
    localField: 'Customer_SellingAreaCodes',
    foreignField: 'SellingArea_Code',
    justOne: false // for many-to-1 relationships
});

// Hcm_SupplierSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

var Customer = module.exports = mongoose.model('hcm_customer', Hcm_CustomerSchema);

module.exports.getLastCode = function(callback){
    
    Customer.findOne({},callback).sort({Customer_Code:-1});
}