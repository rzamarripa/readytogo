angular
  .module('FLOKsports')
  .controller('ForgotPasswordCtrl', function ForgotPasswordCtrl($meteor, $scope, $reactive, $ionicPopup, $state) {
   $reactive(this).attach($scope);
   this.recuperar = function(email){
   	console.log('hola');
    email.toLowerCase();
      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
        }
      });
    return false;
	}
  });