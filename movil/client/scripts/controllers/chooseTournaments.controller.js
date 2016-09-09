angular
  .module('FLOKsports')
  .controller('ChooseTournamentsCtrl', ChooseTournamentsCtrl);
 
function ChooseTournamentsCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate, $stateParams) {
	$reactive(this).attach($scope);
	this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
	this.limit = 10;
	this.sport_id = $stateParams.id;
	this.subscribe("tournaments", () =>{
		return [ {sport_id:this.getReactively('sport_id')},{limit: this.getReactively('limit'), sort: {end: -1}} ];
	});
	this.subscribe("competitions", () =>{
		return [ this.getReactively('sport_id') ];
	});
	
	this.helpers({
	  tournaments: () => {
	  	return Tournaments.find().fetch();
	  }
	});

	this.linker = function(tabIndex, tournament_id, competition_id){
  	  if(tabIndex == 1){
      	  $state.go('tabs.leagues-createLeague',{sport_id: $stateParams.id, tournament_id: tournament_id, competition_id: competition_id});
	  } 
	  if(tabIndex == 2){
	      $state.go('tabs.news',{ id: tournament_id});
	  }
	  if(tabIndex == 3){
	      $state.go('tabs.home-createLeague',{sport_id: $stateParams.id, tournament_id: tournament_id, competition_id: competition_id});
	  }
	};
};