var Category = require('../Model/category');



module.exports = {
		getCategories:function(req,res){
			Category.find({}, function(err, category) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(category) {
		    		res.send(category);
				}else{
		    		res.send("not Categories");
				}
			})
		},

		getCategory:function(req,res){
			Category.findOne({Category_ID:Number(req.body.Category_ID)}, function(err, category) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(category) {
		    		res.send(category);
				}else{
		    		res.send("not Category");
				}
			})
		}
}