
angular
  .module('FLOKsports')
  .controller('MyPicksCtrl', MyPicksCtrl);
 
function MyPicksCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);
	this.competition_id = $stateParams.competition_id;
  
  this.subscribe("leagues", () =>{
      return [ {competition_id:  this.getReactively('competition_id')} ];
  });
}
