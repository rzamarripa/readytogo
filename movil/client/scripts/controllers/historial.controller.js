
angular
  .module('FLOKsports')
  .controller('HistorialCtrl', HistorialCtrl);
 
function HistorialCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log, $ionicModal, $ionicHistory) {
  $reactive(this).attach($scope);
   
  
}
