var mongoose = require('mongoose');

var Hcm_ProductCategorySchema = mongoose.Schema({
    
	ProductCategory_Code     	  :Number,
    ProductCategory_Name     	  : String,
    ProductCategory_Description    :String,
    ProductCategory_IsActive       :Number,
    
});


ProductCategory = module.exports = mongoose.model('hcm_lut_porduct_category', Hcm_ProductCategorySchema);
