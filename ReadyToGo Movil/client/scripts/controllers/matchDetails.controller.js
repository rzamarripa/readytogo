
angular
  .module('FLOKsports')
  .controller('MatchDetailsCtrl', MatchDetailsCtrl);

function MatchDetailsCtrl($scope,$stateParams, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
  $reactive(this).attach($scope);
  this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
  this.user_id = Meteor.userId();
  this.league_id = $stateParams.league_id;
  this.match_id = $stateParams.match_id;
  this.teams_id = [];
  this.matchGoalsResult = undefined;

  //-------upgrades----------
  //-------------------------
  //-------upgradeTypes------
  this.halfResultType = {};
  this.halfScoreType = {};
  this.firstGoalType = {};
  this.matchGoalsType = {};
  this.penaltiesResultType = {};
  //---------------------

  this.subscribe("leagues", ()=>{
    return [ this.getReactively('league_id') ]
  });
  this.subscribe("predictions", ()=>{
    return [ {user_id:this.user_id, league_id: this.league_id, match_id:this.match_id} ]
  });
  this.subscribe("upgrades",()=>{
  	return [ {user_id:this.user_id, league_id: this.league_id, match_id:this.match_id} ]
  });
  this.subscribe("matches", ()=>{
    return [ this.getReactively('match_id') ]
  });
  this.subscribe("teams", ()=>{
  	return [ {_id:{$in:this.getCollectionReactively('teams_id')}}]
  });
  this.subscribe("matchEvents", ()=>{
    return [ {match_id:this.match_id} ]
  });

  this.helpers({
    matchEvents:function(){
      return MatchEvents.find({annotationType_id:{$in:["570c4c3d98137f2a0638d1ab","570c4c5098137f2a0638d1ac"]}}).fetch()
    },
  	halfTimeUpgrade:function(){
  		return Upgrades.findOne({upgradeType:"5711139b525df0a377093367"});
  	},
  	halfScoreUpgrade:function(){
  		return Upgrades.findOne({upgradeType:"571113b1525df0a377093368"});
  	},
  	firstGoalUpgrade:function(){
  		return Upgrades.findOne({upgradeType:"571113cd525df0a377093369"});
  	},
  	matchGoalsUpgrade:function(){
  		return Upgrades.findOne({upgradeType:"571113e1525df0a37709336a"});
  	},
  	penaltiesResultUpgrade:function(){
  		return Upgrades.findOne({upgradeType:"5711149ccec39614699e1fe6"});
  	},
  	league:function(){
  	  var league = Leagues.findOne(this.getReactively('league_id'));
  	  if(league){
  	    this.halfResultType = _.find(league.upgradeTypes, function(ut){ return ut._id == "5711139b525df0a377093367" });
  	    this.halfScoreType = _.find(league.upgradeTypes, function(ut){ return ut._id == "571113b1525df0a377093368" });
  	    this.firstGoalType = _.find(league.upgradeTypes, function(ut){ return ut._id == "571113cd525df0a377093369" });
  	    this.matchGoalsType = _.find(league.upgradeTypes, function(ut){ return ut._id == "571113e1525df0a37709336a" });
  	    this.penaltiesResultType = _.find(league.upgradeTypes, function(ut){ return ut._id == "5711149ccec39614699e1fe6" });
  	  }
  	  return league
  	},
    prediction:function(){
      return Predictions.findOne($stateParams.prediction_id);
    },
    match:function(){
      var _match = Matches.findOne(this.getReactively('match_id'));
      if(this.prediction){
	      if(this.prediction.homeResult != _match.homeGoals || this.prediction.awayResult != _match.awayGoals){
	      	this.matchGoalsResult = false;
	      }else{
	      	this.matchGoalsResult = true;
	      	this.matchResult = true;
	      }
	      if(this.matchGoalsResult === false){
	      	var predictionResult = '';
	      	if(this.prediction.homeResult == this.prediction.awayResult)
	      		predictionResult = 'tie';
	      	if(this.prediction.homeResult > this.prediction.awayResult)
	      		predictionResult = 'homeWin';
	      	if(this.prediction.homeResult < this.prediction.awayResult)
	      		predictionResult = 'awayWin';
	      	var matchResult = '';
	      	if(_match.homeGoals == _match.awayGoals)
	      		matchResult = 'tie';
	      	if(_match.homeGoals > _match.awayGoals)
	      		matchResult = 'homeWin';
	      	if(_match.homeGoals < _match.awayGoals)
	      		matchResult = 'awayWin';
	      	if(predictionResult == matchResult){
	      		this.matchResult = true;
	      	}else{
	      		this.matchResult = false;
	      	}
        }
      }
      if(_match){
	      this.teams_id.push(_match.homeTeam_id);
	      this.teams_id.push(_match.awayTeam_id);
  	  }
   	  return _match;
    }
  });
	
  this.predictionResult = function(){
  	if(this.matchGoalsResult != undefined){
  		if(this.matchGoalsResult && this.matchResult){
  			return 'ion-checkmark-round balanced-back'
  		}
  		if(!this.matchGoalsResult && this.matchResult){
  			return 'ion-checkmark-round energized-back'
  		}
  		if(!this.matchGoalsResult && !this.matchResult){
  			return 'ion-close assertive-back'
  		}
  	}
  }	
  this.upgrade1Save = function(upgrade){
  	if(!this.halfTimeUpgrade._id){
  	  halfTimeUpgrade = {};
  	  halfTimeUpgrade.result = upgrade;
  	  halfTimeUpgrade.league_id = this.league_id;
  	  halfTimeUpgrade.user_id = Meteor.userId();
  	  halfTimeUpgrade.match_id = this.match_id;
  	  halfTimeUpgrade.upgradeType = "5711139b525df0a377093367";
      console.log(halfTimeUpgrade);
  	  Upgrades.insert(halfTimeUpgrade);
   }else{
   	  Upgrades.update(this.halfTimeUpgrade._id,{$set:{result:upgrade.result}});
   }
  }

  this.upgrade2Save = function(upgrade){
    if(!this.halfScoreUpgrade._id){
      halfScoreUpgrade = {};
      halfScoreUpgrade.awayGoals = upgrade.awayGoals;
      halfScoreUpgrade.homeGoals = upgrade.homeGoals;
      halfScoreUpgrade.league_id = this.league_id;
      halfScoreUpgrade.user_id = Meteor.userId();
      halfScoreUpgrade.match_id = this.match_id;
      halfScoreUpgrade.upgradeType = "571113b1525df0a377093368";
      Upgrades.insert(halfScoreUpgrade);
    }else{
      Upgrades.update(this.halfScoreUpgrade._id,{$set:{homeGoals:upgrade.homeGoals,awayGoals:upgrade.awayGoals}});
    }
  }

   this.upgrade3Save = function(upgrade){
    if(!this.firstGoalUpgrade._id){
      firstGoalUpgrade = {};
      firstGoalUpgrade.time = upgrade.time;
      firstGoalUpgrade.league_id = this.league_id;
      firstGoalUpgrade.user_id = Meteor.userId();
      firstGoalUpgrade.match_id = this.match_id;
      firstGoalUpgrade.upgradeType = "571113cd525df0a377093369";
      Upgrades.insert(firstGoalUpgrade);
    }else{
      Upgrades.update(this.firstGoalUpgrade._id,{$set:{time:upgrade.time}});
    }
  }

  this.upgrade4Save = function(upgrade){
    if(!this.matchGoalsUpgrade._id){
      matchGoalsUpgrade = {};
      matchGoalsUpgrade.goals = upgrade.goals;
      matchGoalsUpgrade.league_id = this.league_id;
      matchGoalsUpgrade.user_id = Meteor.userId();
      matchGoalsUpgrade.match_id = this.match_id;
      matchGoalsUpgrade.upgradeType = "571113e1525df0a37709336a";
      Upgrades.insert(matchGoalsUpgrade);
    }else{
      Upgrades.update(this.matchGoalsUpgrade._id,{$set:{goals:upgrade.goals}});
    }
  }

  this.upgrade5Save = function(upgrade){
    if(!this.penaltiesResultUpgrade._id){
      penaltiesResultUpgrade = {};
      penaltiesResultUpgrade.teamWinner_id = upgrade.teamWinner_id;
      penaltiesResultUpgrade.league_id = this.league_id;
      penaltiesResultUpgrade.user_id = Meteor.userId();
      penaltiesResultUpgrade.match_id = this.match_id;
      penaltiesResultUpgrade.upgradeType = "5711149ccec39614699e1fe6";
      Upgrades.insert(penaltiesResultUpgrade);
    }else{
      Upgrades.update(this.penaltiesResultUpgrade._id,{$set:{teamWinner_id:upgrade.teamWinner_id}});
    }
  }
  
  this.upgrade3Result = function(){
    if(this.matchEvents != undefined && this.firstGoalUpgrade != undefined){
      var goalMinute =_.min(this.matchEvents,function(events){
        return events.minutes;
      });
      if(this.firstGoalUpgrade.time == goalMinute.minutes)
        return 'ion-checkmark-round balanced-back';
      else
        return 'ion-close assertive-back';
    }
  }

  this.upgrade4Result = function(){
    if(this.match != undefined){
      var totalGoals = this.match.homeGoals + this.match.awayGoals;
      if(this.matchGoalsUpgrade.goals == totalGoals){
        return 'ion-checkmark-round balanced-back'
      }else{
        return 'ion-close assertive-back'
      }
    }
  }

  this.teamFlag = function(team_id){
	var team = Teams.findOne(team_id);
	if(team){
	    return team.flagUrl;
	}
  }

  this.teamName = function(team_id){
	var team = Teams.findOne(team_id);
	if(team){
	    return team.shortName;
	}
  }
}
