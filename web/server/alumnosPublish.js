Meteor.publish("alumnos",function(params){
  	return Alumnos.find(params);
});
