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
	
  	return Movimientos.find(params);
});
Meteor.publish("grupos",function(params){
	
  	return Grupos.find(params);
});