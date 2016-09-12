Meteor.publish("token", function(){
	return Tokens.find();
});

Meteor.publish("users", function(id){
	return Meteor.users.find({_id:{$in:id}});
});

Meteor.publish("alumnos", function(options){
	return Alumnos.find(options);
});

Meteor.publish("movimientos",function(params){
	console.log(params);
  	return Movimientos.find(params);
});