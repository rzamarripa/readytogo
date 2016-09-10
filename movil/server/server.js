Meteor.publish("token", function(){
	return Tokens.find();
});

Meteor.publish("users", function(id){
	return Meteor.users.find({_id:{$in:id}});
});

