var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var Hcm_SupplierSchema = mongoose.Schema({
   
		Supplier_Code        	        :Number,
        Supplier_Name    	 	        :String,
        Supplier_Email    		        :String,
        Supplier_Password    	        :String,
        Supplier_Country_Code           :Number,
        Supplier_City    		        :String,
        Supplier_Address    	        :String,
        Supplier_StoreAddress           :String,
        Supplier_AddressGPSLocation     :String,
        Supplier_StoreGPSLocation       :String,
        Supplier_Phone    		        :Number,
        // Supplier_Product_Ids            :[Number],
        Supplier_Contact        :[{
            Supplier_ContactTitle           : String,
            Supplier_ContactName            : String,
            Supplier_ContactTelphone        : [String],
            Supplier_ContactEmail           : [String],
            
        },{
            toJSON: { virtuals: true }
        }],

        Supplier_FaceBook               :String,
        Supplier_PaymentMethod_Codes    :[Number],
        Supplier_WayOfDelivery_Codes    :[Number],
        Supplier_TimeOfDelivery         :Number,
        Supplier_Agencies               :[String],
        Supplier_Certificates           :[String],
        Supplier_Category_IDs           :[Number],
        Supplier_SupplierType_Codes     :[Number],
        Supplier_Class_Code             :Number,
        Supplier_Rate                   :Number,
        Supplier_IsActive               :Number
},{
    toJSON: { virtuals: true }
});



Hcm_SupplierSchema.methods.verifyPassword = function(password) {
    if(password.localeCompare(this.Supplier_Password) == 0)
        return 1;
    else
        return 0;
};
Hcm_SupplierSchema.virtual('Category',{
    ref: 'hcm_categories',
    localField: 'Supplier_Category_IDs',
    foreignField: 'Category_ID',
    justOne: false // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual('SupplierType',{
    ref: 'hcm_lut_supplier_types',
    localField: 'Supplier_SupplierType_Codes',
    foreignField: 'SupplierType_Code',
    justOne: false // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual('supplierclass',{
    ref: 'hcm_lut_classes',
    localField: 'Supplier_Class_Code',
    foreignField: 'Class_Code',
    justOne: true // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual('country',{
    ref: 'hcm_countries',
    localField: 'Supplier_Country_Code',
    foreignField: 'Country_Code',
    justOne: true // for many-to-1 relationships
});

Hcm_SupplierSchema.virtual('PaymentMethod',{
    ref: 'hcm_lut_payment_method',
    localField: 'Supplier_PaymentMethod_Codes',
    foreignField: 'PaymentMethod_Code',
    justOne: false // for many-to-1 relationships
});

Hcm_SupplierSchema.virtual('WayOfDelivery',{
    ref: 'hcm_lut_ways_of_deliver',
    localField: 'Supplier_WayOfDelivery_Codes',
    foreignField: 'WayOfDelivary_Code',
    justOne: false // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual('SupplierClass',{
    ref: 'hcm_lut_classes',
    localField: 'Supplier_Class_Code',
    foreignField: 'Class_Code',
    justOne: false // for many-to-1 relationships
});

// Hcm_SupplierSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

var Suppliers = module.exports = mongoose.model('hcm_supplier', Hcm_SupplierSchema);

module.exports.getLastCode = function(callback){
    
    Suppliers.findOne({},callback).sort({Supplier_Code:-1});
}