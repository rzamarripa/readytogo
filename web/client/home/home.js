

angular
  .module('verificaciones')
  .controller('HomeCtrl', HomeCtrl);
 
function HomeCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	let rc = $reactive(this).attach($scope);
	
}