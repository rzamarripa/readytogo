
angular
  .module('FLOKsports')
  .controller('ChooseSportsCtrl', ChooseSportsCtrl);
 
function ChooseSportsCtrl($scope, $http, $reactive, $state, $q, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {

	$reactive(this).attach($scope);
	this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();

	this.subscribe("sports");
	this.helpers({
	  sports: () => {
	    return Sports.find({});
	  }
	});

	this.linker = function(sportId, tabIndex){
		if(tabIndex == 1){
		  $state.go('tabs.leagues-chooseTournaments',{ id: sportId});
		} else if(tabIndex == 3) {
		  $state.go('tabs.home-chooseTournaments',{ id: sportId});
		} else if(tabIndex == 2) {
		  $state.go('tabs.news-chooseTournaments',{ id: sportId});
		}
	};
}
