Meteor.publish("campus",function(params){
  	return Campus.find(params);
});