var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var passwordHash = require('password-hash');

var Hcm_UserSchema = mongoose.Schema({
   
		User_Code        			:Number,
        User_Name    	 			:String,
        User_Password    			:String,
        User_DisplayName            :String,
        User_Permissions            :[String],
        User_IsActive               :Number
});

Hcm_UserSchema.methods.verifyPassword = function(password) {
    if(passwordHash.verify(password,this.User_Password) == 1)
        return 1;
    else
        return 0;
};


// Hcm_UserSchema.methods.verifyPassword = function(password) {
//     if(password.localeCompare(this.User_Password) == 0)
//         return 1;
//     else
//         return 0;
// };


module.exports = mongoose.model('hcm_user', Hcm_UserSchema);
