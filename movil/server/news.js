Meteor.publish("new", function(){
	return News.find();
})