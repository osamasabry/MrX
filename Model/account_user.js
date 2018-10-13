var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

var AccountUserSchema = mongoose.Schema({
   
		Account_Code        :Number,
        Account_UserName    :String,
        Account_Password    :String,
});

AccountUserSchema.methods.verifyPassword = function(password) {
    if(password.localeCompare(this.Account_Password) == 0)
        return 1;
    else
        return 0;
};


module.exports = mongoose.model('account_user', AccountUserSchema);
