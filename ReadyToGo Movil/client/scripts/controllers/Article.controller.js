angular
  .module('FLOKsports')
  .controller('ArticleCtrl', ArticleCtrl);
 
function ArticleCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
  $reactive(this).attach($scope);
  this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
  console.log($ionicTabsDelegate.selectedIndex());

 
  function handleError(err) {
    $log.error('Login error ', err);
 
    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
