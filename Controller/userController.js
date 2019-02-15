var User = require('../Model/user');
// var crypto = require('crypto-js');
var passwordHash = require('password-hash');


module.exports = {


	// GetNextCode:function(request,res){
	// 	User.getLastCode(function(err,user){
	// 		if (user) 
	// 			res.send( Number(user.User_Code)+1);
	// 		else
	// 			res.send(1);
	// 	})
	// },

	getAllUsers:function(request,res){
			User.find({})
			.exec(function(err, user) {
				if (err){
		    		return res.send({
						message: err
					});
		    	} else if(user) {
					res.send(user);
					
				}else{
		    		res.send("not Users");
				}
			})
	},
	
	addUser:function(request,res){
		User.getLastCode(function(err,user){
			if (user) 
				InsertIntoUser(user.User_Code+1);
			else
				InsertIntoUser(1);
		});

		function InsertIntoUser(NextCode){
			var newUser = new User();
			newUser.User_Code     	 	 = NextCode;
			newUser.User_Name 	     	 = request.body.User_Name;
			newUser.User_Password   	 = passwordHash.generate(request.body.User_Password);
			newUser.User_DisplayName	 = request.body.User_DisplayName;
			newUser.User_Permissions	 = [];
			newUser.User_IsActive	 	 = 1;
			
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
		}
	},

	editUserPermissions:function(request,res){
			var newvalues = { $set: {
				User_Permissions   		: request.body.User_Permissions,
			} };
			var myquery = { User_Code: request.body.User_Code }; 
			User.findOneAndUpdate( myquery,newvalues, function(err, field) {
	    	    if (err){
	    	    	return res.send({
						message: 'Error'
					});
	    	    }
	            if (!field) {
	            	return res.send({
						message: 'User not exists'
					});
	            } else {

	                return res.send({
						message: true
					});
				}
			})
	},
}






