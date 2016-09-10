angular
  .module('FLOKsports')
  .controller('LoginCtrl', function LoginCtrl($meteor, $scope, $reactive, $ionicPopup, $state) {
  $reactive(this).attach($scope);

  this.credentials = {
    username: '',
    password: ''
  };

    this.login = function () {
      console.log(this.credentials)

      $meteor.loginWithPassword(this.credentials.username,this.credentials.password).then(
        function () {
            $state.go('tabs.dash');        
        },
        function (error) {
	        console.log(error);
          $ionicPopup.alert({
			      title: error.reason,
			      template: error.message,
			      okType: 'button-positive button-clear'
			    });
        }
      );
    }    
  });