Meteor.publish("alumnos",function(params){
	console.log(params);
  	return Alumnos.find(params);
});
