var User = require('../Model/user');
// var crypto = require('crypto-js');


module.exports = {


	GetNextCode:function(req,res){
		User.getLastCode(function(err,user){
			if (user) 
				res.send( Number(user.User_Code)+1);
			else
				res.send(1);
		})
	},

	addUser:function(req,res,NextCode){
			var newUser = new User();
			newUser.User_Code     	 	 = NextCode;
			newUser.User_Name 	     	 = request.body.User_Name;
			newUser.User_Password   	 = request.body.User_Password;
			newUser.User_DisplayName	 = request.body.User_DisplayName;
			newUser.User_Permissions	 = request.body.User_Permissions;
			newUser.User_IsActive	 	 = request.body.User_IsActive;
			
			newUser.save(function(error, doneadd){
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
	},
}






