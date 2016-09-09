
angular
  .module('FLOKsports')
  .controller('LeaguesCtrl', LeaguesCtrl);

function LeaguesCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
  $reactive(this).attach($scope);
  this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
  this.competition_id = "";
  this.leaguesUsers = [];
  this.owners = [];
  this.userId = Meteor.userId();
  this.tournaments = [];

	this.subscribe("leaguesUsers", () =>{
      return [ {user_id: this.getReactively('userId')} ];
  });
  
  this.subscribe("leagues", () =>{
      return [ {_id:{$in:this.getCollectionReactively('leaguesUsers')}, active:true} ];
  });

  this.subscribe("users", () =>{
      return [ this.getCollectionReactively('owners') ];
  });

  this.subscribe("tournaments",()=>{
      return [ {_id:{$in:this.getCollectionReactively('tournaments')}},{}];
  });

  this.helpers({
	  leaguesUsers: function (){
      this.userId = Meteor.userId();
      leaguesUsers = LeaguesUsers.find().fetch();
      lus = [];
      _.each(leaguesUsers, function (lu){
        lus.push(lu.league_id);
      });
      return lus;
    },
	  leagues: function(){
     var leagues = Leagues.find({_id:{$in:this.getCollectionReactively('leaguesUsers')}, active:true}).fetch();
    _.each(leagues, function(league){
      this.competition_id = league.competition_id;

      owner = Meteor.users.findOne(league.owner);
      league.ownerName = owner.profile.name;

      leagueUser = LeaguesUsers.findOne({league_id: league._id, user_id: $scope.currentUser._id});

      league.teamWinnerName = leagueUser.teamWinnerName;
    });
      leagues =_.groupBy(leagues,"tournament_id");
      var tournaments = [];
      _.each(leagues,function(league){
          tournamets_id = _.pluck(league, 'tournament_id');
          league.tournament_id = tournamets_id[0];
          tournaments.push(tournamets_id[0]);
      });
      this.tournaments = tournaments;
		  return leagues;
	  },

    owners: function (){
      leagues = Leagues.find().fetch();
      owns = [];
      _.each(leagues, function (league){
        owns.push(league.owner);
      });
      return owns;
    }
  });
  
  
  this.eliminarLiga = function(id){
  	var confirmPopup = $ionicPopup.confirm({
     	title: 'Warning',
     	template: 'Are you sure you want to delete this league?'
   	});

	 	confirmPopup.then(function(res) {
     if(res) {
       	Leagues.update(id,{$set:{active:false}});
     	} else {
       	console.log('You are not sure');
     	}
   	});
		var currentLeague = Leagues.findOne(id);
		console.log(currentLeague);
  }

  this.tournamentName = function(id){
    var tournament = Tournaments.findOne(id);
    if(tournament)
    return tournament.name;
  }
	this.linker = function(torneoId, tabIndex){
      if(tabIndex == 1){
          $state.go('tabs.leagues-ligaActual',{ id: torneoId});
      } 
  };

   this.chooseSports = function(){
    $state.go("tab.leagues.chooseSports");
  };
}
