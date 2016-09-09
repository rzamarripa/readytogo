
angular
  .module('FLOKsports')
  .controller('AmigoCtrl', AmigoCtrl);
 
function AmigoCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
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
