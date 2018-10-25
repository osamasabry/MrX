var mongoose = require('mongoose');

var Hcm_CategorySchema = mongoose.Schema({
    
	Category_ID     		: Number,
    Category_Name     		: String,
    Category_IsActive     	: Number,
    Category_FieldList      : [String],
   
});


module.exports = mongoose.model('hcm_categories', Hcm_CategorySchema);
