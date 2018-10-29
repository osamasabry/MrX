var mongoose = require('mongoose');

var Hcm_ReleaseSchema = mongoose.Schema({
    
	Release_Code     	  :Number,
    Release_Name     	  : String,
    Release_Description   :String,
    Release_IsActive      :Number,
    
});


Release = module.exports = mongoose.model('hcm_lut_release', Hcm_ReleaseSchema);
