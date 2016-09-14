angular
  .module('FLOKsports')
  .controller('MainCtrl', function MainCtrl($scope, $reactive, $state, $ionicHistory, $ionicSideMenuDelegate) {
  $reactive(this).attach($scope);
  
 
	//$state.go("tabs.solicitar")
	this.logout = function () {
	    Meteor.logout(function(err){
	        if (err) {
	            throw new Meteor.Error("Logout failed");
	        }else{

	          	$ionicHistory.clearCache();
	        	$ionicHistory.clearHistory();
	        	$ionicSideMenuDelegate.toggleLeft(false);
	        	
	        	$ionicHistory.nextViewOptions({
				 historyRoot: true,
				 disableAnimate: true,
				 
				});
	          	$state.go('anon.login');
	        }
	    })
	  }

  
  
});

