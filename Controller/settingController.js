var SystemSetting = require('../Model/system_setting');



module.exports = {
		getCategory:function(req,res){
			SystemSetting.findOne({System_Setting_ConfigName:"Category"}, function(err, category) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(category) {
		    		res.send(category.System_Setting_ConfigValue);
				}else{
		    		res.send("not Category");
				}
			})
		}
}