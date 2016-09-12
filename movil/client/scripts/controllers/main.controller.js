angular
  .module('FLOKsports')
  .controller('MainCtrl', function MainCtrl($scope, $reactive, $state) {
  $reactive(this).attach($scope);
  
 
	$state.go("tabs.solicitar")

  
  
});

