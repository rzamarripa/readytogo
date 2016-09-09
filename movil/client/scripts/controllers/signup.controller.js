
angular
  .module('FLOKsports')
  .controller('SignupCtrl', SignupCtrl);
 
function SignupCtrl($meteor,$scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);
  
  this.signup = {};
  
  this.sign = function(){
      var _user = { 
        email: this.signup.email,
        password: this.signup.password,
        profile: {
	        name: this.signup.name
        }
      }
      $meteor.createUser(_user).then(
        function () {
            $state.go('tabs.home');        
        },
        function (error) {
          $ionicPopup.alert({
            title: error.reason,
            template: error.message,
            okType: 'button-positive button-clear'
          });
        }
      );
  }
}