angular
	.module('FLOKsports')
	.controller('CreateLeagueCtrl', CreateLeagueCtrl);
function CreateLeagueCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate, $stateParams){	
	
	$reactive(this).attach($scope);
	this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
	this.league = {};
	this.competition_id = $stateParams.competition_id;
	this.tournament_id = $stateParams.tournament_id;
	this.sport_id = $stateParams.sport_id;
  	this.predictionTypes = [{_id:"asdasdasd", name: "Winner", points:3},{_id:"adasdasd1", name:"Match Score",points:3}];
  	this.subscribe("teams",() =>{
  		return [ {tournament_id: this.getReactively('tournament_id')} ];
  	});
  	
  	this.subscribe("upgradeTypes");

	this.helpers({
  		teams: function() {
	    	return Teams.find();
	  	}
	});
	this.createLeague = function(){
		var league = {};
		/*
		var competitor = {};
		competitor._id = Meteor.userId();
		competitor.teamWinner_id = this.league.teamwinner;
		*/
		league.name = this.league.name;
		league.predictionTypes = this.predictionTypes;
		league.upgradeTypes = UpgradeTypes.find().fetch();
		league.password = this.league.password;
		league.maxCredits = 200;
		league.owner = Meteor.userId();
		league.tournament_id = this.tournament_id;
		league.competition_id = this.competition_id;
		league.sport_id = this.sport_id;
		league.active = true;
		var team = Teams.findOne(this.league.teamwinner);
		Leagues.insert(league, function (err, league_id) {
	        	if(err){
	        		vm.error = err.message;
	        	}else{
	        		leagueUser = {};
		        	leagueUser.league_id = league_id;
		        	leagueUser.user_id = Meteor.userId();
		        	leagueUser.teamWinnerId = team._id;
		        	leagueUser.teamWinnerName = team.name;
		        	leagueUser.teamWinnerFlagUrl = team.flagUrl;
		        	leagueUser.date = new Date();
		        	leagueUser.active = true;
		        	LeaguesUsers.insert(leagueUser, function (err){
		        		if(err){
		        			Leagues.remove(league_id);
		        			vm.error = err.message;
		        		}else{
		        			$state.go('tabs.leagues');
		        		}
		        	});
	        	}
        	}
      	);
	}
};