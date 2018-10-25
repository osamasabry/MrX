var mongoose = require('mongoose');

var Hcm_WaysOfDelivarySchema = mongoose.Schema({
    
	WayOfDelivary_Code     	  :Number,
    WayOfDelivary_Name     	  : String,
    WayOfDelivary_Description    :String,
    WayOfDelivary_IsActive       :Number,
    
});


SizeUnit = module.exports = mongoose.model('hcm_lut_ways_of_deliver', Hcm_WaysOfDelivarySchema);
