
angular
  .module('FLOKsports')
  .controller('AccountCtrl', AccountCtrl);
 
function AccountCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicModal) {
  $reactive(this).attach($scope);
   
  	
  function handleError(err) {
    $log.error('Login error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
  

 
}
