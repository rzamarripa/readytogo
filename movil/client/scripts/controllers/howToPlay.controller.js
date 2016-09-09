  angular
 .module('FLOKsports')
 .controller('HowToPlayCtrl', HowToPlayCtrl);



 function HowToPlayCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicTabsDelegate) {
 $reactive(this).attach($scope);
  this.selectedTabIndex = $ionicTabsDelegate.selectedIndex();
  console.log($ionicTabsDelegate.selectedIndex());


  };



