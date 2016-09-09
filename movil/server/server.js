Meteor.publish("token", function(){
	return Tokens.find();
});

Meteor.publish("teams", function(params){
	return Teams.find(params, {sort: {name: -1}}); 
});

Meteor.publish("sports", function(){
	return Sports.find({active:true});
});

Meteor.publish("tournaments", function(params,options){
	return Tournaments.find(params,options);
});

Meteor.publish("competitions", function(sport_id){
	return Competitions.find({sport_id: sport_id});
});

Meteor.publish("leagues", function(params){
	return Leagues.find(params);
});

Meteor.publish("leaguesUsers", function(params){
	return LeaguesUsers.find(params);
});

Meteor.publish("users", function(id){
	return Meteor.users.find({_id:{$in:id}});
});

Meteor.publish("packs", function(){
	return Packs.find({},{sort: {price: -1}});
});

Meteor.publish("matches", function(params,options){
	return Matches.find(params,options);
});

Meteor.publish("groups", function(params){
	return Groups.find(params);
});
Meteor.publish("predictions", function(params){
	return Predictions.find(params);
});

Meteor.publish("predictionTypes", function(){
	return PredictionTypes.find();
});

Meteor.publish("upgradeTypes", function(){
	return UpgradeTypes.find();
});

Meteor.publish("upgrades", function(params){
	return Upgrades.find(params);
});

Meteor.publish("matchEvents", function(params){
	return MatchEvents.find(params);
});