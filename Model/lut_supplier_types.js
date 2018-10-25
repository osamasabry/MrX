var mongoose = require('mongoose');

var Hcm_SupplierTypesSchema = mongoose.Schema({
    
	SupplierType_Code     	    :Number,
    SupplierType_Name     	    :String,
    SupplierType_Description    :String,
    SupplierType_IsActive       :Number,
    
});


SizeUnit = module.exports = mongoose.model('hcm_lut_supplier_types', Hcm_SupplierTypesSchema);
