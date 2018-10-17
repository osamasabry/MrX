var mongoose = require('mongoose');

var Hcm_ProductSchema = mongoose.Schema({
   
		Product_Code        		:Number,
        Product_Name        		:String,
        Product_Chemical_Name 		:String,
        Product_Abbreviation   		:String,
        Product_Molecular_Formula 	:String,
		Product_Molecular_Weight    :Number,
        Product_CAS_Number 			:String,
        Product_EC_Number 			:String,
        Product_Appearance 			:String,
        Product_Active_Content 		:String,
        Product_pH 					:String,
        Product_Sp_gravity 			:String,
        Product_Chloride 			:String,
        Product_Iron 				:String,
        Product_Phosphorous_Acid 	:String,
        Product_O_phosphate			:String,
        Product_Hazen_color			:String,
        Product_Category_ID			:Number,
        Product_Estba7s				:Number,
});





var Hcm_Product = module.exports = mongoose.model('hcm_product', Hcm_ProductSchema);

module.exports.getLastCode = function(callback){
    
    Hcm_Product.findOne({},callback).sort({Product_Code:-1});
}