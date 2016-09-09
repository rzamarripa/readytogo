
angular
  .module('FLOKsports')
  .controller('LigasCtrl', LigasCtrl);
 
function LigasCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);
	this.ligas = [
    {id:1, title:"ZamaEuro"},
    {id:2, title:"Zama Cup"},
    {id:3, title:"Zama Oficina"},
    
  ];


   $scope.linker = function(amigoHistorialId, tabIndex){

      if(tabIndex == 0){
          $state.go('tabs.leagues-ligaActual',{ id: amigoHistorialId});
      } 
  };
  
  function handleError(err) {
    $log.error('Login error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
