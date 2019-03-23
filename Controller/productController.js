var Prodcut = require('../Model/product');



module.exports = {
		getProducts:function(req,res){
			Prodcut.aggregate(
			   [
			      { $project: { 
				      	concate: { $concat: [ "$Product_Name", " ", "$Product_Suffix" ] },
				      	Product_Name : "$Product_Name",
				      	Product_Suffix : "$Product_Suffix",
				      	Product_Code :"$Product_Code",
				      	Product_Category_ID : "$Product_Category_ID",
			      	} }
			   ]
			)
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("not Product");
				}
			})
		},

		getAllProduct:function(req,res){
			Prodcut.find({})
			.populate({ path: 'Category', select: 'Category_Name' })
			.populate({ path: 'Supplier', select: 'Supplier_Name' })
			.populate({ path: 'productclass', select: 'Class_Name' })
			.populate({ path: 'country', select: 'Country_Name Country_Tcode' })
			.populate({ path: 'productform', select: 'Form_Code Form_Name' })
			.populate({ path: 'productpacking', select: 'Packing_Code Packing_Name' })
			.populate({ path: 'productrelease', select: 'Release_Code Release_Name' })
			.populate({ path: 'productstrage', select: 'StorageType_Code StorageType_Name' })
			.populate({ path: 'productcategory', select: 'ProductCategory_Code ProductCategory_Name' })
			.populate({ path: 'customer', select: 'Customer_Code Customer_Name' })
			.populate({ path: 'weight', select: 'Weight_Code Weight_Name' })
			.populate({ path: 'concentration', select: 'Concentration_Code Concentration_Name' })
			.lean()
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("not Product");
				}
			})
		},

		searchProduct:function(req,res){
			var object  = {};
			if (req.body.type=='name') 
				object = {Product_Name:{$regex:req.body.Product_Name}};
			else
				object = {Product_Chemical_Name:{$regex:req.body.Product_Chemical_Name}};

			Prodcut.findOne({object})
				.populate({ path: 'Category', select: 'Category_Name' })
				.populate({ path: 'Supplier', select: 'Supplier_Name' })
				.populate({ path: 'customer', select: 'Customer_Name' })
				.populate({ path: 'productclass', select: 'Class_Name' })
				.populate({ path: 'country', select: 'Country_Name Country_Tcode' })
				.populate({ path: 'productform', select: 'Form_Code Form_Name' })
				.populate({ path: 'productpacking', select: 'Packing_Code Packing_Name' })
				.populate({ path: 'productrelease', select: 'Release_Code Release_Name' })
				.populate({ path: 'productstrage', select: 'StorageType_Code StorageType_Name' })
				.populate({ path: 'productcategory', select: 'ProductCategory_Code ProductCategory_Name' })
				.populate({ path: 'weight', select: 'Weight_Code Weight_Name' })
				.populate({ path: 'concentration', select: 'Concentration_Code Concentration_Name' })
				.lean()
				.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(product) {
		    		res.send(product);
				}else{
		    		res.send("not Product");
				}
			})
		},

		addProduct:function(request,res){
			Prodcut.getLastCode(function(err,product){
				if (product) 
					InsertIntoProduct(product.Product_Code+1);
				else
					InsertIntoProduct(1);
			});

			function InsertIntoProduct(NextCode){
				var newProduct = new Prodcut();
				newProduct.Product_Code     	 				 = NextCode;
				newProduct.Product_Name 	     				 = request.body.Product_Name;
				newProduct.Product_Manufacturer 	    		 = request.body.Product_Manufacturer;
				newProduct.Product_Exporter 	     			 = request.body.Product_Exporter;
				newProduct.Product_Abbreviation					 = request.body.Product_Abbreviation;
				newProduct.Product_Chemical_Name   				 = request.body.Product_Chemical_Name;
				newProduct.Product_Molecular_Formula			 = request.body.Product_Molecular_Formula;
				newProduct.Product_Molecular_Weight	 			 = request.body.Product_Molecular_Weight;
				newProduct.Product_CAS_Number	 				 = request.body.Product_CAS_Number;
				newProduct.Product_EC_Number	 				 = request.body.Product_EC_Number;
				newProduct.Product_Appearance	 				 = request.body.Product_Appearance;
				newProduct.Product_Active_Content	 			 = request.body.Product_Active_Content;
				newProduct.Product_pH	 						 = request.body.Product_pH;
				newProduct.Product_Sp_gravity	 				 = request.body.Product_Sp_gravity;
				newProduct.Product_Chloride	 					 = request.body.Product_Chloride;
				newProduct.Product_Iron	 						 = request.body.Product_Iron;
				newProduct.Product_Phosphorous_Acid	 			 = request.body.Product_Phosphorous_Acid;
				newProduct.Product_O_phosphate	 				 = request.body.Product_O_phosphate;
				newProduct.Product_Hazen_color	 				 = request.body.Product_Hazen_color;
				newProduct.Product_Category_ID	 				 = request.body.Product_Category_ID;
			 	newProduct.Product_Origin_Country_Code  		 = request.body.Product_Origin_Country_Code;
	        	newProduct.Product_Packing_Code         		 = request.body.Product_Packing_Code;
	        	newProduct.Product_Supplier_Codes       		 = request.body.Product_Supplier_Codes;
	        	newProduct.Product_Customer_Codes       		 = request.body.Product_Customer_Codes;
	        	newProduct.Product_MSDS         				 = request.body.Product_MSDS;
	        	newProduct.Product_Classes_Code         		 = request.body.Product_Classes_Code;
	        	newProduct.Product_Assay         				 = request.body.Product_Assay;
	        	newProduct.Product_Form_Code         			 = request.body.Product_Form_Code;
	        	newProduct.Product_Certification        		 = request.body.Product_Certification;
	        	newProduct.Melting_Unit_Tempreture_Unit_ID       = request.body.Melting_Unit_Tempreture_Unit_ID;
	        	newProduct.Boiling_Unit_Tempreture_Unit_ID       = request.body.Boiling_Unit_Tempreture_Unit_ID;
	        	newProduct.Product_Suffix        				 = request.body.Product_Suffix;
	        	newProduct.Product_Release_Code         		 = request.body.Product_Release_Code;
	        	newProduct.Product_StorageType_Code     		 = request.body.Product_StorageType_Code;
				newProduct.Product_ProductCategory_Code 		 = request.body.Product_ProductCategory_Code;
				newProduct.Product_IsActive						 = 1;
				newProduct.Product_Volatile_Matter               =request.body.Product_Volatile_Matter;
		        newProduct.Product_Sulphates                     =request.body.Product_Sulphates;
		        newProduct.Product_Water_Insoluble_Matter        =request.body.Product_Water_Insoluble_Matter;
		        newProduct.Product_Organic_Compounds             =request.body.Product_Organic_Compounds;
		        newProduct.Product_Arsenic                       =request.body.Product_Arsenic;
		        newProduct.Product_Lead                          =request.body.Product_Lead;
		        newProduct.Product_Mercury                       =request.body.Product_Mercury;
		        newProduct.Product_Cadmium                       =request.body.Product_Cadmium;
		        newProduct.Product_Heavy_Metals                  =request.body.Product_Heavy_Metals;
		        newProduct.Product_Ferrous_Fe2o3                 =request.body.Product_Ferrous_Fe2o3;
		        newProduct.Product_Alumumium_Al2O3   			 =request.body.Product_Alumumium_Al2O3;
		        newProduct.Product_Titanicum_Tio2                =request.body.Product_Titanicum_Tio2;
		        newProduct.Product_Free_Fatty_Acids              =request.body.Product_Free_Fatty_Acids;
		        newProduct.Product_Peroxide_Value                =request.body.Product_Peroxide_Value;
		        newProduct.Product_Iodine_Value                  =request.body.Product_Iodine_Value;
		        newProduct.Product_Acetone                       =request.body.Product_Acetone;
		        newProduct.Product_Methanol                      =request.body.Product_Methanol;
		        newProduct.Product_Hydroyl_Number                =request.body.Product_Hydroyl_Number;
		        newProduct.Product_Impurities_Related_Substance  =request.body.Product_Impurities_Related_Substance;
		        newProduct.Product_Aldehyles                     =request.body.Product_Aldehyles;
		        newProduct.Product_Esters                        =request.body.Product_Esters;
		        newProduct.Product_Chlorenated_Compound          =request.body.Product_Chlorenated_Compound;
		        newProduct.Product_Water_Content                 =request.body.Product_Water_Content;
		        newProduct.Product_Loss_On_Drying                =request.body.Product_Loss_On_Drying;
		        newProduct.Product_Starch_Test                   =request.body.Product_Starch_Test;
		        newProduct.Product_Sulfur_Dioxides_Residual      =request.body.Product_Sulfur_Dioxides_Residual;
		        newProduct.Product_Antimony                      =request.body.Product_Antimony;
		        newProduct.Product_Chrome                        =request.body.Product_Chrome;
		        newProduct.Product_Selenium                      =request.body.Product_Selenium;
		        newProduct.Product_Nickel                        =request.body.Product_Nickel;
		        newProduct.Product_Residual_On_Solvent           =request.body.Product_Residual_On_Solvent;
		        newProduct.Product_Copper                        =request.body.Product_Copper;
		       	newProduct.Product_Oxalic_Acid                   =request.body.Product_Oxalic_Acid;
		        newProduct.Product_Fumaric_Acid                  =request.body.Product_Fumaric_Acid;
		        newProduct.Product_Maliec_Acid                   =request.body.Product_Maliec_Acid;
		        newProduct.Product_Non_Volatyl_Reside            =request.body.Product_Non_Volatyl_Reside;
		        newProduct.Product_Ash                           =request.body.Product_Ash;
		       	newProduct.Product_Protien                       =request.body.Product_Protien;
		        newProduct.Product_Nitrates                      =request.body.Product_Nitrates;
		        newProduct.Product_Aflatoxine                    =request.body.Product_Aflatoxine;
		        newProduct.Product_Melamine                      =request.body.Product_Melamine;
		        newProduct.Product_Free_Halogens                 =request.body.Product_Free_Halogens;
		        newProduct.Product_Description                   =request.body.Product_Description;
		        newProduct.Product_Solubility                    =request.body.Product_Solubility;
		        newProduct.Product_Absorbance                    =request.body.Product_Absorbance;
		        newProduct.Product_InfraRed_Absorption           =request.body.Product_InfraRed_Absorption;
		        newProduct.Product_Think_Layer_Chromatography    =request.body.Product_Think_Layer_Chromatography;
		        newProduct.Product_Identifications_Relative_Dens =request.body.Product_Identifications_Relative_Density;
		        newProduct.Product_Viscosity                     =request.body.Product_Viscosity;
		        newProduct.Product_Foriein_Matter                =request.body.Product_Foriein_Matter;
		        newProduct.Product_Relative_Density_From         =request.body.Product_Relative_Density_From;
		        newProduct.Product_Relative_Density_To           =request.body.Product_Relative_Density_To;             
		        newProduct.Product_Bulk_Density_From             =request.body.Product_Bulk_Density_From;               
		        newProduct.Product_Bulk_Density_to               =request.body.Product_Bulk_Density_to;                 
		        newProduct.Product_Relative_Index                =request.body.Product_Relative_Index;                  
		        newProduct.Product_Spescific_Opticical_Rotation  =request.body.Product_Spescific_Opticical_Rotation;
		        newProduct.Product_Specific_Surface_Area         =request.body.Product_Specific_Surface_Area;
		        newProduct.Product_Residue_On_Sieve              =request.body.Product_Residue_On_Sieve;
		        newProduct.Product_Boiling_Point                 =request.body.Product_Boiling_Point;
		        newProduct.Product_Melting_Point                 =request.body.Product_Melting_Point;                   
		        newProduct.Product_Partical_Size                 =request.body.Product_Partical_Size;
		        newProduct.Product_Weight_Unit_Code              =request.body.Product_Weight_Unit_Code;
		        newProduct.Product_Weight_Value                  =request.body.Product_Weight_Value;
		        newProduct.Product_Concentration_Unit_Code       =request.body.Product_Concentration_Unit_Code;
		        newProduct.Product_Concentration_Value           =request.body.Product_Concentration_Value;
		        newProduct.Product_Remarkes                      =request.body.Product_Remarkes;
				newProduct.Product_Total_Plate_Count             =request.body.Product_Total_Plate_Count;      
			    newProduct.Product_EColi                         =request.body.Product_EColi;      
			    newProduct.Product_Yeast                         =request.body.Product_Yeast;      
			    newProduct.Product_Mould                         =request.body.Product_Mould;      
			    newProduct.Product_Pathogenic_Bacterium          =request.body.Product_Pathogenic_Bacterium;      
			    newProduct.Product_Escherichia_Cali              =request.body.Product_Escherichia_Cali;      
			    newProduct.Product_Salmonila                     =request.body.Product_Salmonila;      
			    newProduct.Product_Staphyloccuse_Aureus          =request.body.Product_Staphyloccuse_Aureus;      
			    newProduct.Product_Extra1                        =request.body.Product_Extra1;      
			    newProduct.Product_Extra2                        =request.body.Product_Extra2;      
			    newProduct.Product_Extra3                        =request.body.Product_Extra3;      
			    newProduct.Product_Extra4                        =request.body.Product_Extra4;      
			    newProduct.Product_Extra5                        =request.body.Product_Extra5;      
			    newProduct.Product_Extra6                        =request.body.Product_Extra6;      
			    newProduct.Product_Extra7                        =request.body.Product_Extra7;      
			    newProduct.Product_Extra8                        =request.body.Product_Extra8;      
			    newProduct.Product_Extra9                        =request.body.Product_Extra9;      
			    newProduct.Product_Extra10                       =request.body.Product_Extra10;      
			    newProduct.Product_Extra11                       =request.body.Product_Extra11;      
				newProduct.save(function(error, doneadd){
					if(error){
						return res.send({
							message: error
						});
					}
					else{
						return res.send({
							message: true
						});
					}
				});
			}
		},

		editProductSuppliers:function(request,res){
			var myquery = { Product_Code: request.body.Product_Code }; 
			var newvalues = { 
				Product_Supplier_Codes	 		: request.body.Product_Supplier_Codes,
			 };
			 Prodcut.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Product not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

		editProductCustomers:function(request,res){
			var myquery = { Product_Code: request.body.Product_Code }; 
			var newvalues = { 
				Product_Customer_Codes	 		: request.body.Product_Customer_Codes,
			 };
			 Prodcut.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Product not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

		editProduct:function(request,res){
			var newvalues = { $set: {
				Product_Name 	     			  	  : request.body.Product_Name,
				Product_Chemical_Name   		  	  : request.body.Product_Chemical_Name,
				Product_Manufacturer 	    	  	  : request.body.Product_Manufacturer,
				Product_Exporter 	     		  	  : request.body.Product_Exporter,
				Product_Abbreviation				  : request.body.Product_Abbreviation,
				Product_Molecular_Formula		  	  : request.body.Product_Molecular_Formula,
				Product_Molecular_Weight		  	  : request.body.Product_Molecular_Weight,
				Product_CAS_Number	 			  	  : request.body.Product_CAS_Number,
				Product_EC_Number	 			  	  : request.body.Product_EC_Number,
				Product_Appearance	 			  	  : request.body.Product_Appearance,
				Product_Active_Content	 		  	  : request.body.Product_Active_Content,
				Product_pH	 					  	  : request.body.Product_pH,
				Product_Sp_gravity	 			  	  : request.body.Product_Sp_gravity,
				Product_Chloride	 			  	  : request.body.Product_Chloride,
				Product_Iron	 				  	  : request.body.Product_Iron,
				Product_Phosphorous_Acid		  	  : request.body.Product_Phosphorous_Acid,
				Product_O_phosphate	 			  	  : request.body.Product_O_phosphate,
				Product_Hazen_color	 			  	  : request.body.Product_Hazen_color,
				Product_Category_ID	 			  	  : request.body.Product_Category_ID,
				Product_Origin_Country_Code 	  	  : request.body.Product_Origin_Country_Code,
        		Product_Packing_Code              	  : request.body.Product_Packing_Code,
        		Product_Supplier_Codes       	  	  : request.body.Product_Supplier_Codes,
        		Product_Customer_Codes       	  	  : request.body.Product_Customer_Codes,
	        	Product_MSDS         			  	  : request.body.Product_MSDS,
	        	Product_Classes_Code         	  	  : request.body.Product_Classes_Code,
	        	Product_Assay         			  	  : request.body.Product_Assay,
	        	Product_Form_Code         		  	  : request.body.Product_Form_Code,
	        	Product_Certification        	  	  : request.body.Product_Certification,
	        	Melting_Unit_Tempreture_Unit_ID       : request.body.Melting_Unit_Tempreture_Unit_ID,
	        	Boiling_Unit_Tempreture_Unit_ID       : request.body.Boiling_Unit_Tempreture_Unit_ID,
	        	Product_Suffix       				  : request.body.Product_Suffix,
	        	Product_Release_Code         	  	  : request.body.Product_Release_Code,
	        	Product_StorageType_Code     	  	  : request.body.Product_StorageType_Code,
	        	Product_ProductCategory_Code 	  	  : request.body.Product_ProductCategory_Code,
				Product_IsActive				  	  : request.body.Product_IsActive,
				Product_Volatile_Matter               : request.body.Product_Volatile_Matter,
		        Product_Sulphates                     : request.body.Product_Sulphates,
		        Product_Water_Insoluble_Matter        : request.body.Product_Water_Insoluble_Matter,
		        Product_Organic_Compounds             : request.body.Product_Organic_Compounds,
		        Product_Arsenic                       : request.body.Product_Arsenic,
		        Product_Lead                          : request.body.Product_Lead,
		        Product_Mercury                       : request.body.Product_Mercury,
		        Product_Cadmium                       : request.body.Product_Cadmium,
		        Product_Heavy_Metals                  : request.body.Product_Heavy_Metals,
		        Product_Ferrous_Fe2o3                 : request.body.Product_Ferrous_Fe2o3,
		        Product_Alumumium_Al2O3   			  : request.body.Product_Alumumium_Al2O3,
		        Product_Titanicum_Tio2                : request.body.Product_Titanicum_Tio2,
		        Product_Free_Fatty_Acids              : request.body.Product_Free_Fatty_Acids,
		        Product_Peroxide_Value                : request.body.Product_Peroxide_Value,
		        Product_Iodine_Value                  : request.body.Product_Iodine_Value,
		        Product_Acetone                       : request.body.Product_Acetone,
		        Product_Methanol                      : request.body.Product_Methanol,
		        Product_Hydroyl_Number                : request.body.Product_Hydroyl_Number,
		        Product_Impurities_Related_Substance  : request.body.Product_Impurities_Related_Substance,
		        Product_Aldehyles                     : request.body.Product_Aldehyles,
		        Product_Esters                        : request.body.Product_Esters,
		        Product_Chlorenated_Compound          : request.body.Product_Chlorenated_Compound,
		        Product_Water_Content                 : request.body.Product_Water_Content,
		        Product_Loss_On_Drying                : request.body.Product_Loss_On_Drying,
		        Product_Starch_Test                   : request.body.Product_Starch_Test,
		        Product_Sulfur_Dioxides_Residual      : request.body.Product_Sulfur_Dioxides_Residual,
		        Product_Antimony                      : request.body.Product_Antimony,
		        Product_Chrome                        : request.body.Product_Chrome,
		        Product_Selenium                      : request.body.Product_Selenium,
		        Product_Nickel                        : request.body.Product_Nickel,
		        Product_Residual_On_Solvent           : request.body.Product_Residual_On_Solvent,
		        Product_Copper                        : request.body.Product_Copper,
		       	Product_Oxalic_Acid                   : request.body.Product_Oxalic_Acid,
		        Product_Fumaric_Acid                  : request.body.Product_Fumaric_Acid,
		        Product_Maliec_Acid                   : request.body.Product_Maliec_Acid,
		        Product_Non_Volatyl_Reside            : request.body.Product_Non_Volatyl_Reside,
		        Product_Ash                           : request.body.Product_Ash,
		       	Product_Protien                       : request.body.Product_Protien,
		        Product_Nitrates                      : request.body.Product_Nitrates,
		        Product_Aflatoxine                    : request.body.Product_Aflatoxine,
		        Product_Melamine                      : request.body.Product_Melamine,
		        Product_Free_Halogens                 : request.body.Product_Free_Halogens,
		        Product_Description                   : request.body.Product_Description,
		        Product_Solubility                    : request.body.Product_Solubility,
		        Product_Absorbance                    : request.body.Product_Absorbance,
		        Product_InfraRed_Absorption           : request.body.Product_InfraRed_Absorption,
		        Product_Think_Layer_Chromatography    : request.body.Product_Think_Layer_Chromatography,
		        Product_Identifications_Relative_Dens : request.body.Product_Identifications_Relative_Density,
		        Product_Viscosity                     : request.body.Product_Viscosity,
		        Product_Foriein_Matter                : request.body.Product_Foriein_Matter,
		        Product_Relative_Density_From         : request.body.Product_Relative_Density_From,
		        Product_Relative_Density_To           : request.body.Product_Relative_Density_To,             
		        Product_Bulk_Density_From             : request.body.Product_Bulk_Density_From,               
		        Product_Bulk_Density_to               : request.body.Product_Bulk_Density_to,                 
		        Product_Relative_Index                : request.body.Product_Relative_Index,                  
		        Product_Spescific_Opticical_Rotation  : request.body.Product_Spescific_Opticical_Rotation,
		        Product_Specific_Surface_Area         : request.body.Product_Specific_Surface_Area,
		        Product_Residue_On_Sieve              : request.body.Product_Residue_On_Sieve,
		        Product_Boiling_Point                 : request.body.Product_Boiling_Point,
		        Product_Melting_Point                 : request.body.Product_Melting_Point,                   
		        Product_Partical_Size                 : request.body.Product_Partical_Size,
		       	Product_Weight_Unit_Code              : request.body.Product_Weight_Unit_Code,
		        Product_Weight_Value                  : request.body.Product_Weight_Value,
		        Product_Concentration_Unit_Code       : request.body.Product_Concentration_Unit_Code,
		        Product_Concentration_Value           : request.body.Product_Concentration_Value,
		        Product_Remarkes                      : request.body.Product_Remarkes,
				Product_Total_Plate_Count             : request.body.Product_Total_Plate_Count,      
			    Product_EColi                         : request.body.Product_EColi,      
			    Product_Yeast                         : request.body.Product_Yeast,      
			    Product_Mould                         : request.body.Product_Mould,      
			    Product_Pathogenic_Bacterium          : request.body.Product_Pathogenic_Bacterium,      
			    Product_Escherichia_Cali              : request.body.Product_Escherichia_Cali,      
			    Product_Salmonila                     : request.body.Product_Salmonila,      
			    Product_Staphyloccuse_Aureus          : request.body.Product_Staphyloccuse_Aureus,      
			    Product_Extra1                        : request.body.Product_Extra1,      
			    Product_Extra2                        : request.body.Product_Extra2,      
			    Product_Extra3                        : request.body.Product_Extra3,      
			    Product_Extra4                        : request.body.Product_Extra4,      
			    Product_Extra5                        : request.body.Product_Extra5,      
			    Product_Extra6                        : request.body.Product_Extra6,      
			    Product_Extra7                        : request.body.Product_Extra7,      
			    Product_Extra8                        : request.body.Product_Extra8,      
			    Product_Extra9                        : request.body.Product_Extra9,      
			    Product_Extra10                       : request.body.Product_Extra10,      
			    Product_Extra11                       : request.body.Product_Extra11,      
			} };

			var myquery = { Product_Code: request.body.Product_Code }; 
			Prodcut.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'Product not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
		},

		copyProduct:function(req,res){
			Prodcut.findOne({Product_Code:Number(req.body.Product_Code)})
			.exec(function(err, product) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(!product) {
		    		res.send("not Product");
				}else{
		    		Prodcut.getLastCode(function(err,productCode){
						if (productCode) 
							copyNewProduct(productCode.Product_Code+1,product);
						else
							copyNewProduct(1,product);
					});	
				}
			})

			function copyNewProduct(NextCode,product){
				var newProduct = new Prodcut();
				newProduct.Product_Code     	 				 = NextCode;
				newProduct.Product_Name 	     				 = req.body.Product_Name,
				newProduct.Product_Manufacturer 	    		 = product.Product_Manufacturer;
				newProduct.Product_Exporter 	     			 = product.Product_Exporter;
				newProduct.Product_Abbreviation					 = product.Product_Abbreviation;
				newProduct.Product_Chemical_Name   				 = product.Product_Chemical_Name;
				newProduct.Product_Molecular_Formula			 = product.Product_Molecular_Formula;
				newProduct.Product_Molecular_Weight	 			 = product.Product_Molecular_Weight;
				newProduct.Product_CAS_Number	 				 = product.Product_CAS_Number;
				newProduct.Product_EC_Number	 				 = product.Product_EC_Number;
				newProduct.Product_Appearance	 				 = product.Product_Appearance;
				newProduct.Product_Active_Content	 			 = product.Product_Active_Content;
				newProduct.Product_pH	 						 = product.Product_pH;
				newProduct.Product_Sp_gravity	 				 = product.Product_Sp_gravity;
				newProduct.Product_Chloride	 					 = product.Product_Chloride;
				newProduct.Product_Iron	 						 = product.Product_Iron;
				newProduct.Product_Phosphorous_Acid	 			 = product.Product_Phosphorous_Acid;
				newProduct.Product_O_phosphate	 				 = product.Product_O_phosphate;
				newProduct.Product_Hazen_color	 				 = product.Product_Hazen_color;
				newProduct.Product_Category_ID	 				 = product.Product_Category_ID;
			 	newProduct.Product_Origin_Country_Code  		 = product.Product_Origin_Country_Code;
	        	newProduct.Product_Packing_Code         		 = product.Product_Packing_Code;
	        	newProduct.Product_Supplier_Codes       		 = product.Product_Supplier_Codes;
	        	newProduct.Product_Customer_Codes       		 = product.Product_Customer_Codes;
	        	newProduct.Product_MSDS         				 = product.Product_MSDS;
	        	newProduct.Product_Classes_Code         		 = product.Product_Classes_Code;
	        	newProduct.Product_Assay         				 = product.Product_Assay;
	        	newProduct.Product_Form_Code         			 = product.Product_Form_Code;
	        	newProduct.Product_Certification        		 = product.Product_Certification;
	        	newProduct.Melting_Unit_Tempreture_Unit_ID       = product.Melting_Unit_Tempreture_Unit_ID;
	        	newProduct.Boiling_Unit_Tempreture_Unit_ID       = product.Boiling_Unit_Tempreture_Unit_ID;
	        	newProduct.Product_Suffix        				 = product.Product_Suffix;
	        	newProduct.Product_Release_Code         		 = product.Product_Release_Code;
	        	newProduct.Product_StorageType_Code     		 = product.Product_StorageType_Code;
				newProduct.Product_ProductCategory_Code 		 = product.Product_ProductCategory_Code;
				newProduct.Product_IsActive						 = product.Product_IsActive
				newProduct.Product_Volatile_Matter               = product.Product_Volatile_Matter;
		        newProduct.Product_Sulphates                     = product.Product_Sulphates;
		        newProduct.Product_Water_Insoluble_Matter        = product.Product_Water_Insoluble_Matter;
		        newProduct.Product_Organic_Compounds             = product.Product_Organic_Compounds;
		        newProduct.Product_Arsenic                       = product.Product_Arsenic;
		        newProduct.Product_Lead                          = product.Product_Lead;
		        newProduct.Product_Mercury                       = product.Product_Mercury;
		        newProduct.Product_Cadmium                       = product.Product_Cadmium;
		        newProduct.Product_Heavy_Metals                  = product.Product_Heavy_Metals;
		        newProduct.Product_Ferrous_Fe2o3                 = product.Product_Ferrous_Fe2o3;
		        newProduct.Product_Alumumium_Al2O3   			 = product.Product_Alumumium_Al2O3;
		        newProduct.Product_Titanicum_Tio2                = product.Product_Titanicum_Tio2;
		        newProduct.Product_Free_Fatty_Acids              = product.Product_Free_Fatty_Acids;
		        newProduct.Product_Peroxide_Value                = product.Product_Peroxide_Value;
		        newProduct.Product_Iodine_Value                  = product.Product_Iodine_Value;
		        newProduct.Product_Acetone                       = product.Product_Acetone;
		        newProduct.Product_Methanol                      = product.Product_Methanol;
		        newProduct.Product_Hydroyl_Number                = product.Product_Hydroyl_Number;
		        newProduct.Product_Impurities_Related_Substance  = product.Product_Impurities_Related_Substance;
		        newProduct.Product_Aldehyles                     = product.Product_Aldehyles;
		        newProduct.Product_Esters                        = product.Product_Esters;
		        newProduct.Product_Chlorenated_Compound          = product.Product_Chlorenated_Compound;
		        newProduct.Product_Water_Content                 = product.Product_Water_Content;
		        newProduct.Product_Loss_On_Drying                = product.Product_Loss_On_Drying;
		        newProduct.Product_Starch_Test                   = product.Product_Starch_Test;
		        newProduct.Product_Sulfur_Dioxides_Residual      = product.Product_Sulfur_Dioxides_Residual;
		        newProduct.Product_Antimony                      = product.Product_Antimony;
		        newProduct.Product_Chrome                        = product.Product_Chrome;
		        newProduct.Product_Selenium                      = product.Product_Selenium;
		        newProduct.Product_Nickel                        = product.Product_Nickel;
		        newProduct.Product_Residual_On_Solvent           = product.Product_Residual_On_Solvent;
		        newProduct.Product_Copper                        = product.Product_Copper;
		       	newProduct.Product_Oxalic_Acid                   = product.Product_Oxalic_Acid;
		        newProduct.Product_Fumaric_Acid                  = product.Product_Fumaric_Acid;
		        newProduct.Product_Maliec_Acid                   = product.Product_Maliec_Acid;
		        newProduct.Product_Non_Volatyl_Reside            = product.Product_Non_Volatyl_Reside;
		        newProduct.Product_Ash                           = product.Product_Ash;
		       	newProduct.Product_Protien                       = product.Product_Protien;
		        newProduct.Product_Nitrates                      = product.Product_Nitrates;
		        newProduct.Product_Aflatoxine                    = product.Product_Aflatoxine;
		        newProduct.Product_Melamine                      = product.Product_Melamine;
		        newProduct.Product_Free_Halogens                 = product.Product_Free_Halogens;
		        newProduct.Product_Description                   = product.Product_Description;
		        newProduct.Product_Solubility                    = product.Product_Solubility;
		        newProduct.Product_Absorbance                    = product.Product_Absorbance;
		        newProduct.Product_InfraRed_Absorption           = product.Product_InfraRed_Absorption;
		        newProduct.Product_Think_Layer_Chromatography    = product.Product_Think_Layer_Chromatography;
		        newProduct.Product_Identifications_Relative_Dens = product.Product_Identifications_Relative_Density;
		        newProduct.Product_Viscosity                     = product.Product_Viscosity;
		        newProduct.Product_Foriein_Matter                = product.Product_Foriein_Matter;
		        newProduct.Product_Relative_Density_From         = product.Product_Relative_Density_From;
		        newProduct.Product_Relative_Density_To           = product.Product_Relative_Density_To;             
		        newProduct.Product_Bulk_Density_From             = product.Product_Bulk_Density_From;               
		        newProduct.Product_Bulk_Density_to               = product.Product_Bulk_Density_to;                 
		        newProduct.Product_Relative_Index                = product.Product_Relative_Index;                  
		        newProduct.Product_Spescific_Opticical_Rotation  = product.Product_Spescific_Opticical_Rotation;
		        newProduct.Product_Specific_Surface_Area         = product.Product_Specific_Surface_Area;
		        newProduct.Product_Residue_On_Sieve              = product.Product_Residue_On_Sieve;
		        newProduct.Product_Boiling_Point                 = product.Product_Boiling_Point;
		        newProduct.Product_Melting_Point                 = product.Product_Melting_Point;                   
		        newProduct.Product_Partical_Size                 = product.Product_Partical_Size;
		        newProduct.Product_Weight_Unit_Code              = product.Product_Weight_Unit_Code;
		        newProduct.Product_Weight_Value                  = product.Product_Weight_Value;
		        newProduct.Product_Concentration_Unit_Code       = product.Product_Concentration_Unit_Code;
		        newProduct.Product_Concentration_Value           = product.Product_Concentration_Value;
		        newProduct.Product_Remarkes                      = product.Product_Remarkes;
				newProduct.Product_Total_Plate_Count             = product.Product_Total_Plate_Count;      
			    newProduct.Product_EColi                         = product.Product_EColi;      
			    newProduct.Product_Yeast                         = product.Product_Yeast;      
			    newProduct.Product_Mould                         = product.Product_Mould;      
			    newProduct.Product_Pathogenic_Bacterium          = product.Product_Pathogenic_Bacterium;      
			    newProduct.Product_Escherichia_Cali              = product.Product_Escherichia_Cali;      
			    newProduct.Product_Salmonila                     = product.Product_Salmonila;      
			    newProduct.Product_Staphyloccuse_Aureus          = product.Product_Staphyloccuse_Aureus;      
			    newProduct.Product_Extra1                        = product.Product_Extra1;      
			    newProduct.Product_Extra2                        = product.Product_Extra2;      
			    newProduct.Product_Extra3                        = product.Product_Extra3;      
			    newProduct.Product_Extra4                        = product.Product_Extra4;      
			    newProduct.Product_Extra5                        = product.Product_Extra5;      
			    newProduct.Product_Extra6                        = product.Product_Extra6;      
			    newProduct.Product_Extra7                        = product.Product_Extra7;      
			    newProduct.Product_Extra8                        = product.Product_Extra8;      
			    newProduct.Product_Extra9                        = product.Product_Extra9;      
			    newProduct.Product_Extra10                       = product.Product_Extra10;      
			    newProduct.Product_Extra11                       = product.Product_Extra11;      
				newProduct.save(function(error, doneadd){
					if(error){
						return res.send({
							message: error
						});
					}
					else{
						return res.send({
							message: true
						});
					}
				});
			}
		},


}