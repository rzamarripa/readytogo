	var existFloksUser = function (username) {
    	var user = flocksUsers.findOne({'username': username});
  		return user; 
  	};
Meteor.methods({

  	createFloksUser: function(user,device){
  	check(user.username, String);
      check(user.password, String);
      check(user.email, String);
      check(device, String);

      if(!existFloksUser(user.username))
      {
        var tokenid=CryptoJS.MD5(user.username+user.password+ device).toString();
        var token = {username:user.username,device:device,token:tokenid};
        user.password = CryptoJS.MD5(user.password).toString()
  			flocksUsers.insert(user);
        flocksTokens.insert(token);
        return {status:apiConstants.SUCCESS,data:{'tokenid':tokenid}};
  	   }
      return {status:apiConstants.ERROR,data:{error:apiConstants.USER_EXIST}};
  	},

    loginFloksUser: function(user,device){
      check(user.username, String);
      check(user.password, String);
      check(device, String);

      var _user = existFloksUser(user.username);
      var username = user.username;
      var password = CryptoJS.MD5(user.password).toString();

      if(_user && username == _user.username && password==_user.password)
      {
        var token = flocksTokens.findOne({username:user.username,device:device});
        if(!token){
          var tokenid=CryptoJS.MD5(user.username+user.password+ device).toString();
          token={username:user.username,device:device,token:tokenid};  
          flocksTokens.insert(token);
        }
        return {status:apiConstants.SUCCESS,data:{'tokenid':token.token}};
      }
      return {status:apiConstants.ERROR,data:{error:apiConstants.LOGIN_INVALID}};
    },
    
    picture : function(user, picture){
	    console.log(user);
	    
	    Meteor.users.update({_id: user}, {$set:{picture:picture}});
			
    }
});
