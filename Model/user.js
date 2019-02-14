var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var Hcm_UserSchema = mongoose.Schema({
   
		User_Code        			:Number,
        User_Name    	 			:String,
        User_Password    			:String,
        User_DisplayName            :String,
        User_Permissions            :[String],
        User_IsActive               :Number
});

Hcm_UserSchema.methods.verifyPassword = function(password) {
    if(password.localeCompare(this.User_Password) == 0)
        return 1;
    else
        return 0;
};


User = module.exports = mongoose.model('hcm_user', Hcm_UserSchema);

module.exports.getLastCode = function(callback){
    
    User.findOne({},callback).sort({User_Code:-1});
}