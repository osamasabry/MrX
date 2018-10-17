var mongoose = require('mongoose');

var Hcm_CategorySchema = mongoose.Schema({
    
	Category_ID     		: Number,
    Category_Name     		: String,
    Category_FieldList      : [String],
   
});


module.exports = mongoose.model('hcm_category', Hcm_CategorySchema);
