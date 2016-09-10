angular.module("FLOKsports").run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.main');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	console.log("Acceso Denegado");
				console.log("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }

    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }

  });
});


angular.module('FLOKsports').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');
	
  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/templates/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.main', {
      url: '/main',
      templateUrl: 'client/templates/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .state('anon.signup', {
      url: '/signup',
      templateUrl: 'client/templates/signup.html',
      controller: 'SignupCtrl as sg'
    }) 
    

    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', function ($meteor, $state) {
          return $meteor.logout().then(
            function () {
              $state.go('anon.login');
            },
            function (error) {
              console.log(error.reason);
            }
          );
        }]
      }
    }
   );

  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      resolve: {
            "currentUser": ["$meteor", function($meteor){
              return $meteor.requireUser();
            }]
          }
    })  
    .state('tabs.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'client/templates/tab-dash.html',
          controller: 'DashCtrl as dash'
        }
      }
    })  
    .state('tabs.account', {
      url: '/account',
      views: {
        'tab-dash': {
          templateUrl: 'client/templates/tab-account.html',
          controller: 'AccountCtrl as ac'
        }
      }
    })     
    
     /////////////////////////// TAB PROFILE ///////////////////////////////////////

    
    /////////////////////////// TAB HOME ///////////////////////////////////////
    .state('tabs.misHijos', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'client/templates/home.html',
          controller: 'HomeCtrl as home',      
        }
      }      
    })
    
    
    $urlRouterProvider.otherwise('/main');
}]);