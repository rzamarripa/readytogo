angular
  .module('FLOKsports')
  .controller('FeedbackCtrl', FeedbackCtrl);
 
function FeedbackCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
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
