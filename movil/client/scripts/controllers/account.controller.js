
angular
  .module('FLOKsports')
  .controller('AccountCtrl', AccountCtrl);
 
function AccountCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicModal) {
  $reactive(this).attach($scope);
   
   console.log("hola");

 
}
