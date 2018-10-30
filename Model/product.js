var mongoose = require('mongoose');

var Hcm_ProductSchema = mongoose.Schema({
   
		Product_Code        		    :Number,
        Product_Name        	       	:String,
        Product_Chemical_Name 		    :String,
        Product_Manufacturer            :String,
        Product_Exporter                :String,
        Product_Abbreviation    		:String,
        Product_IsActive                :Number,
        Product_Molecular_Formula 	    :String,
		Product_Molecular_Weight        :Number,
        Product_CAS_Number 		       	:String,
        Product_EC_Number 		    	:String,
        Product_Appearance 		       	:String,
        Product_Active_Content 	    	:String,
        Product_pH 				     	:String,
        Product_Sp_gravity 		       	:String,
        Product_Chloride 		     	:String,
        Product_Iron 			    	:String,
        Product_Phosphorous_Acid       	:String,
        Product_O_phosphate		       	:String,
        Product_Hazen_color		       	:String,
        Product_Category_ID			    :[Number],
        Product_Estba7s				    :Number,
        Product_Origin_Country_Code     :Number,
        Product_Packing_Code            :Number,
        Product_Supplier_Codes          :[Number],
        Product_MSDS                    :String,
        Product_Classes_Code            :Number,
        Product_Assay                   :[String],
        Product_Form_Code               :Number,
        Product_Certification           :String,
        Product_Release_Code            :Number,
        Product_StorageType_Code        :Number,
        Product_ProductCategory_Code    :[Number],

},{
    toJSON: { virtuals: true }
});

Hcm_ProductSchema.virtual('Category',{
    ref: 'hcm_categories',
    localField: 'Product_Category_ID',
    foreignField: 'Category_ID',
    justOne: false // for many-to-1 relationships
});

Hcm_ProductSchema.virtual('country',{
    ref: 'hcm_countries',
    localField: 'Product_Origin_Country_Code',
    foreignField: 'Country_Code',
    justOne: true // for many-to-1 relationships
});

Hcm_ProductSchema.virtual('productclass',{
    ref: 'hcm_lut_classes',
    localField: 'Product_Classes_Code',
    foreignField: 'Class_Code',
    justOne: true // for many-to-1 relationships
});


Hcm_ProductSchema.virtual('Supplier',{
    ref: 'hcm_supplier',
    localField: 'Product_Supplier_Codes',
    foreignField: 'Supplier_Code',
    justOne: false // for many-to-1 relationships
});


Hcm_ProductSchema.virtual('productform',{
    ref: 'hcm_lut_form',
    localField: 'Product_Form_Code',
    foreignField: 'Form_Code',
    justOne: true // for many-to-1 relationships
});

Hcm_ProductSchema.virtual('productpacking',{
    ref: 'hcm_lut_packing',
    localField: 'Product_Packing_Code',
    foreignField: 'Packing_Code',
    justOne: true // for many-to-1 relationships
});


Hcm_ProductSchema.virtual('productrelease',{
    ref: 'hcm_lut_release',
    localField: 'Product_Release_Code',
    foreignField: 'Release_Code',
    justOne: true // for many-to-1 relationships
});

Hcm_ProductSchema.virtual('productstrage',{
    ref: 'hcm_lut_storage_type',
    localField: 'Product_StorageType_Code',
    foreignField: 'StorageType_Code',
    justOne: true // for many-to-1 relationships
});

Hcm_ProductSchema.virtual('productcategory',{
    ref: 'hcm_lut_porduct_category',
    localField: 'Product_ProductCategory_Code',
    foreignField: 'ProductCategory_Code',
    justOne: true // for many-to-1 relationships
});

var Hcm_Product = module.exports = mongoose.model('hcm_product', Hcm_ProductSchema);

module.exports.getLastCode = function(callback){
    
    Hcm_Product.findOne({},callback).sort({Product_Code:-1});
}